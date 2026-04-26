//create payslip
//POST /api/payslips

import Employee from "../models/EmployeeModel.js";
import paySlip from "../models/PaySlips.js";

export const createPayslip=async(req,res)=>{
  try{
    const {employeeId,month,year,basicSalary,
        allowances,deductions}= req.body;
    if(!employeeId || !month || !year|| !basicSalary){
       return res.status(400).json({err:"Missing fields"})
    }
    const netSalary= Number(basicSalary) + Number (allowances||0) - Number(deductions|| 0);
    const payslip=await paySlip.create({
        employeeId,
        month:Number(month),
        year:Number(year),
        basicSalary:Number(basicSalary),
        allowances:Number(allowances||0),
        deductions: Number(deductions||0),
        netSalary
    })

    return res.json({success:true,data:payslip})
  }
  catch(err){
         return res.status(500).json({err:"Failed to create Payslip"})
  }
}

//get payslip
// GET /api/payslips

export const getPayslip=async(req,res)=>{

    try{
        const user=req.user;
        if (!user || !user.role) {
  return res.status(401).json({ err: "Unauthorized" });
}
        const isAdmin=user.role==="ADMIN";
        if(isAdmin){
            const payslip= await paySlip.find()
            .populate("employeeId")
            .sort({createdAt:-1});
            const data=payslip.map((p)=>{
                const obj=p.toObject();
                return {
                    ...obj,
                    id:obj._id.toString(),
                    employee:obj.employeeId,
                    employeeId:obj.employeeId?._id?.toString()|| "",



                }
            })
            return res.json({data});

        }
        else{
            const employee=await Employee.findOne({userId :user.userId})
            if(!employee){
                return res.status(404).json({err:"Employee not found"});
            }
            const payslips=await paySlip.find({employeeId:employee._id})
            .sort({createdAt:-1});
            return res.json({data:payslips})
        }

    }
    catch(err){
         return res.status(500).json({err:"Failed to fetch Payslip"})
  }

}


export const getPayslipId=async(req,res)=>{
    try{
         const payslips=await paySlip.findById(req.params.id)
            .populate("employeeId").lean();
         if(!payslips){
                return res.status(404).json({err:"Payslip not found"});
            }

        const result={
            ...payslips,
            id:payslips._id.toString(),
            employee:payslips.employeeId

        }

        return res.json({result});
        
    }
    catch(err){
        return res.status(500).json({err:"Failed to fetch User Payslip"})

    }

}