import mongoose from "mongoose";
import User from "./UserModel.js";
import { departments } from "../Department.js";

const EmployeeSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            unique:true
        },
        
        firstName:{
                type:String,
                required:true
        },

        lastName:{
                type:String,
                required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone :{
            type:String,
            required:true
        },
        position:{
             type:String,
            required:true
        },
        basicSalary:{
            type:Number,
            default:0
        },
        allowances:{
            type:Number,
            default:0
        },
        deductions:{
            type:Number,
            default:0
        },
        departments:{
            type:String,
            enum:departments

        },

        employmentStatus:{
            type:String,
            enum:["ACTIVE","INACTIVE"],
            default:"ACTIVE"
        },

        isDeleted:{
            type:Boolean,
            default:false
        },
        joinDate:{
            type:Date,
            required:true,
        },
        bio:{
            type:String,
            default:""
        }


    }, {timestamps:true})

const Employee=mongoose.model("Employee",EmployeeSchema)
export default Employee