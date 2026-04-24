import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/EmployeeModel.js";
import LeaveApplication from "../models/LeaveApplication.js";
import { departments } from "../Department.js";
import sendEmail from "../config/Nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ems" });

//Auto check-out employee
const autoCheckOut = inngest.createFunction(
  { id: "auto-check-out",
    triggers:[{event:"employee/check-out"}]},
  async ({ event, step }) => {
    const {employeeId,attendanceId}=event.data;

    //wait for 9 hours
    await step.sleepUntil("wait-for-9-hours",new Date(new Date().getTime()+9*60*60*1000))

    //get Attendance data
    let attendance= await Attendance.findById(attendanceId);
    if(!attendance.checkOut){
        const employee=await Employee.findById(employeeId);

        //send reminder email

        await sendEmail({to:employee.email,
          subject:"Attendance check-out Reminder",
          body:`<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

            <h2>Hi ${employee.firstName},</h2>

            <p>
            You have a check-in in <b>${employee.department}</b>.
           </p>

           <p>
            Please make sure to check in within <b>1 hour</b>.
            </p>

            <p>
            If you have any questions, please contact your admin.
            </p>

          <hr />

           <p style="font-size: 12px; color: gray;">
            Attendance reminder: Check-in time is 
           <b>${new Date().toLocaleString()}</b>
          </p>

       </div>`
        })

        await step.sleepUntil("wait-for-1-hours",new Date(new Date().getTime()+1*60*60*1000))
        attendance=await Attendance.findById(attendanceId);
        if(!attendance.checkOut){
            attendance.checkOut=new Date(attendance.checkIn).getTime+4*60*60*1000;
            attendance.workingHours=4;
            attendance.dayType="Half Day";
            attendance.status="LATE";

            await attendance.save();
        }




    }
  },
);

//send email to Admin if no action taken by admin within 24 hours
const LeaveApplicationReminder = inngest.createFunction(
  { id: "leave-application-reminder",
     triggers:[{event:"leave/pending"}]},
  async ({ event, step }) => {
    const {leaveApplicationId}=event.data;

    //wait for 24 hours
    await step.sleepUntil("wait-for-24-hours",new Date(new Date().getTime()+24*60*60*1000))

    //check the leave status
    let LeaveApplication= await LeaveApplication.findById(leaveApplicationId);
    if(LeaveApplication?.status==="PENDING"){
        const employee=await Employee.findById(LeaveApplication.employeeId);

        //send reminder email to admin to take action
    await sendEmail({
      to:process.env.ADMIN_EMAIL,
      subject:"Leave Application Reminder",
      body:`
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

  <h2>Hi Admin,</h2>
  <p>
    You have a leave application from <b>${employee.department}</b>.
  </p>
  <p>
    <b>Leave Start Date:</b> ${leaveApplication?.startDate?.toLocaleString()}
  </p>

  <p>
    Please make sure to take action on this leave application.
  </p>

  <br/>

  <p>Best regards,</p>
  <p><b>EMS</b></p>

</div>`
    })

    }
  },
);

//check attendance at 11:30 AM (6:00 UTC) and email absent employee
const attendanceReminderCron = inngest.createFunction(
  { id: "attendance-reminder-cron",
    triggers:[{cron:"0 0 6 * * *"}]},
  
  async ({ step }) => {
    const today=await step.run("get-today-date",()=>{
      const startUTC=new Date(new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"})
       + "T00:00:00+05:30");
       const endUTC=new Date(startUTC.getTime() +24 *60 *60*1000);

       return {
        startUTC:startUTC.toISOString(),
        endUTC:endUTC.toISOString()
       }
    })

  const activeEmployees= await step.run("get-active-employees",async()=>{
    const employees= await Employee.find({
      isDeleted:false,
      employmentStatus:"ACTIVE"
    }).lean();

    return employees.map((e)=>({
          _id:e._id.toString(),
          firstName:e.firstName,
          lastName:e.lastName,
          email:e.email,
          departments:e.departments
    }))

    const onLeaveIds= await step.run("get-all-leave-id",async()=>{
      const leaves= await LeaveApplication.find({status:"APPROVED",
        startDate:{$lte:new Date(today.endUTC)}
        , endDate:{$gte:new Date(today.startUTC)}
      }).lean();
      return leaves.map((l)=>l.employeeId.toString())
    })

    //get employee id who already checked in

    const checkedInIds=await step.run("get-checked-in-ids",async()=>{
           const attendance=await Attendance.find({
            date: {$gte:new Date(today.startUTC),$lt:new Date(today.endUTC)}
           }).lean();

           return attendance.map((a)=> a.employeeId.toString());

    })

    const absentEmployees=activeEmployees.filter((emp)=>{
      !onLeaveIds.includes(emp._id) && checkedInIds.includes(emp._id)
    })

    if(absentEmployees.length>0){
      await step.run("send-reminder-emails",async()=>{
        const emailPromises=absentEmployees.map(async(emp)=>{
          //send email
          await sendEmail({
            to:emp.email,
            subject:"Attendance Reminder-Please mark your attendance",
             body :`
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

  <h2>Hi ${emp.firstName},</h2>

  <p>
    We noticed you haven't marked your attendance yet today.
  </p>

  <p>
    The deadline was <b>11:30 AM</b>, and your attendance is still missing.
  </p>

  <p>
    Please check in as soon as possible or contact your admin if you're facing any issues.
  </p>

  <br/>

  <p>Best regards,</p>
  <p><b>EMS</b></p>

</div>`
          })


        })
      })
    }

    return {totalActive:activeEmployees.length,onLeave:onLeaveIds.length,
      checkIn:checkedInIds.length,absent:absentEmployees.length
    }


  })

   
  }


);




// Create an empty array where we'll export future Inngest functions
export const functions = [
  autoCheckOut,
  LeaveApplicationReminder,
  attendanceReminderCron
];