//Get profile
//  /api/profile

import Employee from "../models/EmployeeModel.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";


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
                    profileImage: ""

                }
            )
         }

         return res.json(employee);

    }
    catch(err){
        return res.status(500).json({err:"Failed to fetch profile"})

    }
}




export const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const employee = await Employee.findOne({ userId: user.userId });
        if (!employee) return res.status(404).json({ err: "Employee not found" });

        const updateData = {};
        if (req.body.bio !== undefined) updateData.bio = req.body.bio;

        // Configuration for overlapping names
        const folder = "employee_profiles";
        const publicId = `profile_${employee._id}`;

        if (req.file) {
            try {
                // Buffer to Base64 for a clean signature
                const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
                
                // SIGNED UPLOAD: Overwrites the old image with the same name
                const uploadRes = await cloudinary.uploader.upload(fileBase64, {
                    folder: folder,
                    public_id: publicId,
                    overwrite: true,
                    invalidate: true, // Clears the browser/CDN cache
                    resource_type: "auto"
                });

                updateData.profileImage = uploadRes.secure_url;
                console.log("✅ SIGNED UPLOAD SUCCESS: Image overlapped.");
            } catch (cErr) {
                console.error("❌ CLOUDINARY SIGNED ERROR:", cErr.message);
                return res.status(403).json({ err: "Cloudinary Signature Rejected (403)" });
            }
        } 
        
        else if (req.body.removeImage === "true") {
            try {
                await cloudinary.uploader.destroy(`${folder}/${publicId}`, { invalidate: true });
            } catch (e) { console.log("Delete skipped:", e.message); }
            updateData.profileImage = ""; 
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employee._id,
            { $set: updateData },
            { returnDocument: 'after' }
        );

        return res.json({ success: true, employee: updatedEmployee });
    } catch (err) {
        return res.status(500).json({ err: "Internal Server Error" });
    }
};