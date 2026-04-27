import { Router } from "express";
import multer from "multer"; // Import here
import { protect } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controllers/ProfileController.js";

const profileRouter = Router();

// Configure local multer for this router
const upload = multer(); 

profileRouter.get('/', protect, getProfile);

// IMPORTANT: upload.single('profileImage') must be the SECOND argument
profileRouter.post('/', protect, upload.single('profileImage'), updateProfile);

export default profileRouter;