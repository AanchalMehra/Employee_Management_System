import Employee from "../models/EmployeeModel.js"
import Attendance from "../models/Attendance.js"
import LeaveApplication from "../models/LeaveApplication.js"
import PaySlip from "../models/PaySlips.js"
import { departments } from "../Department.js";
export const getDashboard=async(req,res)=>{
    try{
          const session=req.session;
          if(session.role==="ADMIN"){
            const [totalEmployees,totalAttendance,pendingLeaves]=await Promise.all(
                [
                    Employee.countDocuments({isDeleted:{$ne:true}}),
                    Attendance.countDocuments({
                        date:{$gte:new Date(new Date().setHours(0,0,0,0)),
                              $lt:new Date(new Date().setHours(24,0,0,0))
                        }
                    }),
                    LeaveApplication.countDocuments({
                          status:"PENDING"
                    })
                ]
            )

            return res.json({
            role:"ADMIN",
            totalEmployees,
            totalDepartments:departments.length,
            totalAttendance,
            pendingLeaves

          })

          }
          
          else{
              const employee=await Employee.findOne({
                userId:session.userId
              }).lean();

              if(!employee) return res.status(404).json({err:"Employee Not Found"});
              const today=new Date();
              const[currentMonthAttendance,pendingLeaves,latestPayslip]=await Promise.all([
                Attendance.countDocuments({
                        employeeId:employee._id,
                        date:{$gte:new Date(today.getFullYear(),today.getMonth(),1),
                              $lt:new Date(today.getFullYear(),today.getMonth()+1,1)
                        }
                    }),
                LeaveApplication.countDocuments({
                         employeeId:employee._id,
                          status:"PENDING"
                    }),
                PaySlip.findOne({
                        employeeId:employee._id})
                        .sort({createdAt:-1}).lean()

              ])

              return res.json({
                role:"EMPLOYEE",
                employee:{...employee,id:employee._id.toString()},
                currentMonthAttendance,
                pendingLeaves,
                latestPayslip:latestPayslip?
                {...latestPayslip,id:latestPayslip._id.toString()}
                :null
              })

          }
    }
    catch(err){
        return res.status(500).json({err:"Could not fetch Dashboard"})
    }
}