//Clock in/out for employee
// /api/attendance

import { inngest } from "../Inngest/index.js";
import Attendance from "../models/Attendance.js";
import Employee from "../models/EmployeeModel.js";

export const clockInOut=async(req,res)=>{

    try{
        const session=req.session;
        const employee= await Employee.findOne({userId:session.userId})

        if(!employee) return res.status(404).json({err:"Employee not found"})

        if(employee.isDeleted)  return res.status(403).json({err:"Your acount is deactivated. You cannot clock in/out"})

        const today=new Date();
        today.setHours(0,0,0,0)
        const existing=await Attendance.findOne({
            employeeId:employee._id,
            date:today
        })

        const now=new Date();

        if(!existing){
            const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 0);
            const attendance=await Attendance.create({
                  employeeId:employee._id,
                  date:today,
                  checkIn:now,
                  status:isLate?"LATE":"PRESENT",
            })

            await inngest.send({
                name:"employee/check-out",
                data:{employeeId:employee._id,
                    attendanceId:attendance._id

                }

            })
           return res.json({success:true,type:"CHECK_IN",data:attendance})

        }
        else if(!existing.checkOut){
            const checkInTime= new Date(existing.checkIn).getTime()
            const diffMin=now.getTime()-checkInTime;
            const diffHours= diffMin/(1000*60*60);
            existing.checkOut=now;

            const workingHours=parseFloat(diffHours.toFixed(2));
            let dayType="Half Day";

            if(workingHours>=8) dayType="Full Day";
            else if(workingHours>=6) dayType="Three Quarter Day";
            else if(workingHours>=4) dayType="Half Day";
            else dayType="Short Day";


            existing.workingHours=workingHours;
            existing.dayType=dayType;

            await existing.save();
            return res.json({success:true,type:"CHECK_OUT",data:existing})
        }

        else{
            return res.json({success:true,type:"CHECK_OUT",data:existing})

        }

        
        
    }
    catch(err){
        console.error("Attendance error:", err);
        return res.status(500).json({err:"Operation failed"})



    }

}


export const getAttendance=async(req,res)=>{
    try{
        const session=req.session;
        const employee= await Employee.findOne({userId:session.userId})

        if(!employee) return res.status(404).json({err:"Employee not found"})

        const limit=parseInt(req.query.limit|| 30);
        const history=await Attendance.find({employeeId:employee._id})
        .sort({date:-1}).limit(limit)
        return res.json({
            data:history,
            employee:{isDeleted:employee.isDeleted}
        })


    }
    catch(err){
        return res.status(500).json({err:"Failed to fetch employee"})
        
    }
    
}