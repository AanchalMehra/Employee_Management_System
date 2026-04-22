//Login for employee and admin
//POST -> api/auth/login

import User from "../models/UserModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/UserModel";

export const login=async(req,res)=>{
    try{
        const {email,password,role_type}=req.body;
        if(!email || !password){
           return res.status(400).res.json({err:"Email or password is required"})
          }

        const user=await User.findOne(email);
        if(!user){
           return res.status(401).res.json({err:"Invalid credentials"})
          }
        if(role_type==="admin" && user.role!="ADMIN"){
            return res.status(401).res.json({err:"Not authorized as admin"})
        }
        if(role_type==="employee" && user.role!="EMPLOYEE"){
            return res.status(401).res.json({err:"Not authorized as employee"})
        }

        const isValid= await bcrypt.compare(password,user.password);

        if(!isValid){
            return res.status(401).res.json({err:"Invalid credentials"})
        }

        const payload={
            userId:user._id.toString(),
            role:user.role,
            email:user.email
        }
        
        const token= jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"7d"});
        return res.json({user:payload,token})
    }

    catch(err){
        console.error("Login error",err);
        return res.status(500).json({err:"Login failed"})

    }
   
}


//Get session for employee and admin
//GET api/auth/session

export const session=(req,res)=>{
    const session=req.session
    return res.json({user:session})

}

//change password for employee and admin
//POST /api/auth/changePassword
export const changePassword=async(req,res)=>{

    try{
        const session=req.session
        const {currentPassword,newPassword} =req.body;
        if(!currentPassword || !newPassword){
            return res.status(400).json({err:"Both password are required"})
        }
        const user=await User.findById(session.userId)
        if(!user) return res.status(400).json({err:"User not found"})

        const isValid= await bcrypt.compare(currentPassword,user.password);

        if(!isValid){
            return res.status(400).res.json({err:"current Password is incorrect"})
        }
        
        const hashed=await bcrypt.hash(newPassword,10);
        await User.findByIdAndUpdate(session.userId,{password:hashed})
        return res.json({success:true})

    }
    catch(err){
        return res.status(500).json({err:"Failed to change password"})

    }
    

}
