import Employee from "../models/EmployeeModel.js";
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

export const getEmployees=async(req,res)=>{
    try{
        const {departments}=req.query;
        const where={}
        if(departments) where.departments=departments;

        const employees=(await Employee.find(where))
        .sort({createdAt:-1})
        .populate("userId","email role")
        .lean()

        const result=employees.map(emp=>({
            ...emp,
            id:emp._id.toString(),
            user: emp.userId? {email: emp.userId.email, role:emp.userId.role}:null


        }))
        return res.status(200).json(result)

    }
    catch(err){
         return res.status(500).json({err:"Failed to fetch employees"})
    }

}

export const createEmployees=async(req,res)=>{

    try{
        const {firstName,lastName,bio,basicSalary,allowances,
            deductions,email,phone,position,password,joinDate,
            role,departments
        }= req.body;

        if(!email||!password||!firstName||!lastName){
            return res.status(400).json({err: "Missing Required fields"})
        }

        hashedPassword= await bcrypt.hash(password,10)
        const user=await User.create({
            email,
            password:hashedPassword,
            role:role||"EMPLOYEE",

        })

        const employee=await Employee.create({
            userId:user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            departments:departments||"Engineering",
            basicSalary: Number(basicSalary)||0,
            allowances:Number(allowances)||0,
            deductions:Number(deductions)||0,
            joinDate:new Date(joinDate),
            bio:bio||""
        })

        return res.status(201).json({success:true, employee})

    }
    catch(err){

        if(err.code===11000)
         return res.status(400).json({err:"Email already exists"})
        console.log("create employee error:",err)
        return res.status(500).json({err:"Failed to create employees"}) 

    }
}

export const updateEmployees=async(req,res)=>{

    try{
        const {id}=req.params
        const {firstName,lastName,bio,basicSalary,allowances,
            deductions,email,phone,position,password,
            role,departments,employmentStatus
        }= req.body;

        const employee=await Employee.findById(id)
        if(!employee) return res.status(404).json({err:"employee not found"})


        await Employee.findByIdAndUpdate(id,{
            firstName,
            lastName,
            email,
            phone,
            position,
            departments:departments||"Engineering",
            basicSalary: Number(basicSalary)||0,
            allowances:Number(allowances)||0,
            deductions:Number(deductions)||0,
            employmentStatus:employmentStatus||"ACTIVE",
            bio:bio||""
        })

        const userUpdate={email}
        if(role) userUpdate.role=role;
        if(password) userUpdate.password=await bcrypt(password,10);

        await User.findByIdAndUpdate(employee.userId,userUpdate)

        return res.status(200).json({success:true})

    }
    catch(err){

        if(err.code===11000)
         return res.status(400).json({err:"Email already exists"})
        return res.status(500).json({err:"Failed to Update employees"}) 

    }

}

export const deleteEmployees=async(req,res)=>{
    try{
        const {id}=req.params;
        const employee=await Employee.findById(id)
        if(!employee) return res.status(404).json({err:"employee not found"})
        employee.isDeleted=true;
        employee.employmentStatus="INACTIVE";
        await employee.save();
        return res.status(200).json({success:true})

    }
    catch(err){
            return res.status(500).json({err:"Failed to delete employees"}) 

    }

}