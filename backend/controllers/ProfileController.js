//Get profile
//  /api/profile

import Employee from "../models/EmployeeModel.js";

export const getProfile= async(req,res)=>{
    try{
         const user=req.user;
         const employee= await Employee.findOne({userId:user.userId})
         if(!employee){
            return res.json(
                {
                    firstName:"Admin",
                    lastName:"",
                    email:user.email,

                }
            )
         }

         return res.json(employee)

    }
    catch(err){
        return res.status(500).json({err:"Failed to fetch profile"})

    }
}

export const updateProfile= async(req,res)=>{
    try{

        const user=req.user;
         const employee= await Employee.findOne({userId:user.userId})
         if(!employee){
                return res.status(500).json({err:"Employee not found"})

         }
         if (employee.isDeleted){
                return res.status(403).json({err:"Your account is deactivated.You cannot update your profile"})

         }

         await Employee.findByIdAndUpdate(employee._id,{bio:req.body.bio})
        return res.json({success:true})


    }
    catch(err){

         return res.status(500).json({err:"Failed to update profile"})

    }
}