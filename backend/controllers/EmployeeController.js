import Employee from "../models/EmployeeModel.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

/* ================= GET ================= */
export const getEmployees = async (req, res) => {
  try {
    const dept = req.query.departments;

    const where = {};
    // Fixed: Using 'dept' consistently to prevent ReferenceError
    if (dept && dept !== "" && dept !== "undefined") {
      where.departments = dept;
    }

    const employees = await Employee.find(where)
      .sort({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    console.log("Total employees sent to frontend:", employees.length);

    return res.status(200).json(
      employees.map(emp => ({
        ...emp,
        id: emp._id?.toString() || "",
        // This ensures the card stays visible but "Locked" on the frontend
        isDeleted: emp.isDeleted === true || emp.employmentStatus === "INACTIVE",
        user: emp.userId
          ? {
              email: emp.userId.email,
              role: emp.userId.role,
            }
          : {
              email: "No Email",
              role: "EMPLOYEE",
            },
      }))
    );
  } catch (err) {
    console.error("GET EMPLOYEES ERROR:", err);
    return res.status(500).json({
      err: "Failed to fetch employees",
      details: err.message,
    });
  }
};

/* ================= CREATE ================= */
export const createEmployees = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      firstName,
      lastName,
      bio,
      basicSalary,
      allowances,
      deductions,
      email,
      phone,
      position,
      joinDate,
      role,
      departments,
    } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ err: "Missing required fields" });
    }

    // Fixed: Added default password to prevent User Validation Error
    const generatedPassword = `${firstName}@${Math.floor(1000 + Math.random() * 9000)}`;
  const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    /* CREATE USER */
    const user = await User.create(
      [
        {
          email,
          password: hashedPassword,
          role: role || "EMPLOYEE",
        },
      ],
      { session }
    );

    /* CREATE EMPLOYEE */
    const employee = await Employee.create(
      [
        {
          userId: user[0]._id,
          firstName,
          lastName,
          email,
          phone,
          position,
          departments: departments || "Engineering",
          basicSalary: Number(basicSalary) || 0,
          allowances: Number(allowances) || 0,
          deductions: Number(deductions) || 0,
          joinDate: joinDate ? new Date(joinDate) : new Date(),
          bio: bio || "",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      employee: employee[0],
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error("CREATE EMPLOYEE ERROR:", err);

    if (err.code === 11000) {
      return res.status(400).json({ err: "Email already exists" });
    }

    return res.status(500).json({
      err: "Failed to create employee",
      details: err.message,
    });
  }
};

/* ================= UPDATE ================= */
export const updateEmployees = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      bio,
      basicSalary,
      allowances,
      deductions,
      email,
      phone,
      position,
      password,
      role,
      departments,
      employmentStatus,
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ err: "Employee not found" });

    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      position,
      departments: departments || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      employmentStatus: employmentStatus || "ACTIVE",
      bio: bio || "",
    });

    const userUpdate = { email };

    if (role) userUpdate.role = role;
    if (password && password.trim() !== "") {
      userUpdate.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(employee.userId, userUpdate);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ err: "Email already exists" });
    }
    return res.status(500).json({ err: "Failed to update employee" });
  }
};

/* ================= DELETE ================= */
export const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ err: "Employee not found" });

    // Mark as deleted and inactive to lock the card on the UI
    employee.isDeleted = true;
    employee.employmentStatus = "INACTIVE";

    await employee.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Failed to delete employee" });
  }
};