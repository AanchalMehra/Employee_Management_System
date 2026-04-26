import mongoose from "mongoose";
import Employee from "./EmployeeModel.js";

const paySlipSchema=new mongoose.Schema(
    {
        employeeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Employee",
            required:true,
        },

        month:{
            type:Number,
            required:true
        },
        year:{
            type:Number,
            required:true
        },
        basicSalary:{
            type:Number,
            required:true
        },
        allowances:{
            type:Number,
            default:0
        },
        deductions:{
            type:Number,
            default:0
        },
        netSalary:{
            type:Number,
            required:true
        },


    }, {timestamps:true})

const paySlip=mongoose.model("paySlip",paySlipSchema)
export default paySlip