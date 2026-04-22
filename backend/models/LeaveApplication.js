import mongoose from "mongoose";
import Employee from "./EmployeeModel.js";

const LeaveApplicationSchema=new mongoose.Schema(
    {
        employeeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Employee,
            required:true,
        },
        type:{
            type:String,
            enum:["SICK","CASUAL","ANNUAL"],
            required:true
        },
        
        startDate:{
                type:Date,
                required:true
        },
        endDate:{
                type:Date,
                required:true
        },
        
        reason:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["PENDING","APRROVED","REJECTED"],
            default:"PENDING"
        },


    }, {timestamps:true})

const LeaveApplication=mongoose.model("LeaveApplication",LeaveApplicationSchema)
export default LeaveApplication