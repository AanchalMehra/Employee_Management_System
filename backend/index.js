import dotenv from "dotenv";
dotenv.config();

import express from "express";
import dbConnection from "./config/db.js";
import multer from "multer";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./Inngest/index.js";

import employeeRouter from "./routes/EmployeeRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import profileRouter from "./routes/ProfileRoutes.js";
import attendanceRouter from "./routes/AttendanceRoutes.js";
import LeaveRouter from "./routes/LeaveRoutes.js";
import paySlipRouter from "./routes/PaySlipsRoutes.js";
import dashboardRouter from "./routes/DashboardRoutes.js";


const app = express();

dbConnection();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(multer().none());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", LeaveRouter);
app.use("/api/payslips", paySlipRouter);
app.use("/api/dashboard", dashboardRouter);

app.all("/api/inngest", serve({ client: inngest, functions }));

/* ✅ ONLY RUN SERVER LOCALLY (NOT ON VERCEL) */
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () =>
        console.log(`Server is running on port ${PORT}`)
    );
}

export default app;