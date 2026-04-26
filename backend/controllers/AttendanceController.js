// Clock in/out for employee
// /api/attendance

import { inngest } from "../Inngest/index.js";
import Attendance from "../models/Attendance.js";
import Employee from "../models/EmployeeModel.js";

export const clockInOut = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({ err: "Employee not found" });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        err: "Your account is deactivated. You cannot clock in/out",
      });
    }

    // ✅ Get today's range (IMPORTANT FIX)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // ✅ Find today's attendance correctly
    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const now = new Date();


    // ✅ CHECK-IN
    
    if (!existing) {
      // ✅ Better late logic
      const nineAM = new Date();
      nineAM.setHours(9, 0, 0, 0);

      const isLate = now > nineAM;

      const attendance = await Attendance.create({
        employeeId: employee._id,
        date: startOfDay,
        checkIn: now,
        status: isLate ? "LATE" : "PRESENT",
      });

      // background event (optional)
      await inngest.send({
        name: "employee/check-out",
        data: {
          employeeId: employee._id,
          attendanceId: attendance._id,
        },
      });

      return res.json({
        success: true,
        type: "CHECK_IN",
        data: attendance,
      });
    }

    // ✅ CHECK-OUT
   
    if (!existing.checkOut) {
      const checkInTime = new Date(existing.checkIn).getTime();
      const nowTime = now.getTime();

      const diffHours = (nowTime - checkInTime) / (1000 * 60 * 60);

      const workingHours = parseFloat(diffHours.toFixed(2));

      let dayType = "Short Day";

      if (workingHours >= 8) dayType = "Full Day";
      else if (workingHours >= 6) dayType = "Three Quarter Day";
      else if (workingHours >= 4) dayType = "Half Day";

      existing.checkOut = now;
      existing.workingHours = workingHours;
      existing.dayType = dayType;

      await existing.save();

      return res.json({
        success: true,
        type: "CHECK_OUT",
        data: existing,
      });
    }

    
    //  ALREADY COMPLETED
    
    return res.status(400).json({
      err: "You have already checked in and out for today",
    });

  } catch (err) {
    console.error("Attendance error:", err);
    return res.status(500).json({ err: "Operation failed" });
  }
};




// GET ATTENDANCE


export const getAttendance = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({ err: "Employee not found" });
    }

    const limit = parseInt(req.query.limit || 30);

    const history = await Attendance.find({
      employeeId: employee._id,
    })
      .sort({ date: -1 })
      .limit(limit);

    return res.json({
      data: history,
      employee: { isDeleted: employee.isDeleted },
    });

  } catch (err) {
    return res.status(500).json({ err: "Failed to fetch attendance" });
  }
};