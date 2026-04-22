//Create Leave
// POST /api/leaves

import Employee from "../models/EmployeeModel.js"
import LeaveApplication from "../models/LeaveApplication.js"

export const createLeave=async(req,res)=>{
    try{
        const session=req.session
        const employee= await Employee.findOne({userId:session.userId})
        if(!employee) return res.status(404).json({err:"Employee not found"})

        if(employee.isDeleted) return res.status(403).json({err:"Your account is deactived. You cannot apply for leave"})
        const {type,startDate,endDate,reason}=req.body;
        if(!type ||!startDate||!endDate|| !reason){
            return res.status(400).json({err:"Missing fields"})
        }
        const today=new Date();
        today.setHours(0,0,0,0);
        if(new Date(startDate)<=today || new Date(endDate)<=today){
            return res.status(400).json({err:"Leave dates must be in the future"})

        }

        if(new Date(endDate)<new Date(startDate)){
            return res.status(400).json({err:"End date cannot be before start date"})

        }

        const leave= await LeaveApplication.create({
            employeeId:employee._id,
            type,
            startDate:new Date(startDate),
            endDate:new Date(endDate),
            reason,
            status:"PENDING"
        })
        return res.json({success:true})


    }
    catch(err){
             return res.status(500).json({err:"Failed to create Leave Applicaton"})
    }
}

//GET Leave
// Get /api/leaves

export const getLeave=async(req,res)=>{
    try{
        const session=req.session;
        isAdmin= session.role==="ADMIN";
        if(isAdmin){
            const status=req.query.status;
            const where=status?{status} :{};
            const leaves= await LeaveApplication.find(where)
            .populate("employeeId")
            .sort ({createAt:-1});

            const data=leaves.map((l)=>{
                const obj =l.toObject();
                return{
                    ...obj,
                    id:obj._id.toString(),
                    employee:obj.employeeId,
                    employeeId:obj.employeeId?._id.toString(),
                }
            })
            return res.json({data})
        }
        else{
            const employee=await Employee.findOne({
                userId:session.userId,
            }).lean();

            if(!employee) return res.status(400).json({err:"Employee not found"})

             const leaves= await LeaveApplication.find({
                employeeId:employee._id
             })
            .sort ({createAt:-1});

            return res.json({
                data:leaves,
                employee:{...employee,id:employee._id.toString()}
            })
        }

    }
    catch(err){
            return res.status(500).json({err:"Failed to fetch Leave Applicatons"})

    }
}


//Update Leave status
// PATCH /api/leaves/:id

export const UpdateLeaveStatus=async(req,res)=>{
    try{
        const {status}=req.body;
        if(!["APPROVED","REJECTED","PENDING"].includes(status)){
            return res.status(400).json({err:"Invalid Status" })
        }

        const leave=await LeaveApplication.findByIdAndUpdate(req.params.id,{status},{returnDocument:"after"})

        return res.json({success:true});
    }    
    catch(err){
        return res.status(500).json({err:"Failed to Update Leave Applicatons"})

    }
}


