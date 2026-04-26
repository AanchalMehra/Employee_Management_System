import dotenv from "dotenv";
dotenv.config();

import express from "express";
import dbConnection from "./config/db.js";
import multer from "multer";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./Inngest/index.js";
console.log("DEBUG: Inngest Client ID ->", inngest?.id);
console.log("DEBUG: Functions Array ->", functions);

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

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));


app.get("/", (req, res) => {
    res.send("Server is running");
});


app.use(express.json());
app.use(multer().none());


const inngestHandler = serve({ 
  client: inngest, 
  functions,
  signingKey: process.env.INNGEST_SIGNING_KEY 
});

app.all("/api/inngest", inngestHandler);

app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", LeaveRouter);
app.use("/api/payslips", paySlipRouter);
app.use("/api/dashboard", dashboardRouter);


/* ✅ ONLY RUN SERVER LOCALLY (NOT ON VERCEL) */
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () =>
        console.log(`Server is running on port ${PORT}`)
    );
}

export default app;