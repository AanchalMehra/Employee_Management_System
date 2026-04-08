export const profile = {
  _id: "u12345",
  firstName: "Aanchal",
  lastName: "Mehra",
  email: "aanchal.mehra@example.com",
  image: "https://i.pravatar.cc/150?img=5"
};

export const employeeData = {
  name: "Aanchal Mehra",
  role: "EMPLOYEE",
  employeeId: "EMP1024",
  dept:"Engineering",
  status:"Software Engineer",

  attendance: {
    present: 22,
    leave: 1
  },

  leaves: [
    { date: "2026-04-01", reason: "Sick Leave", status: "Approved" },
    { date: "2026-03-15", reason: "Personal Work", status: "Pending" }
  ],

  payslips: [
    { month: "March", amount: "₹25,000", status: "Paid" },
    { month: "February", amount: "₹25,000", status: "Paid" }
  ],

 
};


export const dummyAdminData = {
  name: "Kira seti",
  totalEmployees: 124,
  totalDepartments: 8,
  todayAttendance: 112,
  pendingLeaves: 5,
  role: "ADMIN",
  dept: "Operations"
};