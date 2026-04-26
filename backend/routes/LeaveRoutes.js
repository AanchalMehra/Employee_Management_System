import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { clockInOut, getAttendance } from "../controllers/AttendanceController.js";
import { createLeave, getLeave, UpdateLeaveStatus } from "../controllers/LeaveController.js";
const LeaveRouter=Router();

LeaveRouter.post("/",protect,createLeave);
LeaveRouter.get("/",protect,getLeave);
LeaveRouter.patch("/:id",protect,protectAdmin,UpdateLeaveStatus);
export default LeaveRouter;