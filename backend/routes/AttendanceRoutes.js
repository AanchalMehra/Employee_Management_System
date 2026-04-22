import { Router } from "express";
import { protect } from "../middleware/auth";
import { getAttendance } from "../controllers/AttendanceController";
const attendanceRouter=Router();

attendanceRouter.post("/",protect,clockInOut);
attendanceRouter.get("/",protect,getAttendance);
export default attendanceRouter;