// Departments
export const departments = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "IT Support",
  "Customer Success",
  "Product Management",
  "Design"
];

// Profile
export const profile = {
  _id: "EMP1003",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  image: null,
};

// Admin Dashboard
export const dummyAdminData = {
  name: "Admin User",
  role: "ADMIN",
  dept: "Operations",
  totalEmployees: 3,
  totalDepartments: 10,
  todayAttendance: 2,
  pendingLeaves: 1,
};

// Employees
export const employeeData = [
  {
    employeeId: "EMP1001",
    firstName: "David",
    lastName: "Michael",
    department: "IT Support",
    position: "Associate Business Support",
    attendance: { present: 20, leave: 2 },
    leaves: [],
    payslips: [],
  },
  {
    employeeId: "EMP1002",
    firstName: "Alex",
    lastName: "Matthew",
    department: "Engineering",
    position: "Software Developer",
    attendance: { present: 22, leave: 1 },
    leaves: [],
    payslips: [],
  },
  {
    employeeId: "EMP1003",
    firstName: "John",
    lastName: "Doe",
    department: "Engineering",
    position: "Senior Software Developer",
    attendance: { present: 21, leave: 1 },
    leaves: [],
    payslips: [],
  },
];

// Leaves
export const dummyLeaveData = [
  {
    _id: "L1",
    employeeId: "EMP1001",
    type: "ANNUAL",
    startDate: "2026-03-27",
    endDate: "2026-03-29",
    reason: "Out for a trip",
    status: "APPROVED",
    employee: employeeData[0],
  },
  {
    _id: "L2",
    employeeId: "EMP1002",
    type: "CASUAL",
    startDate: "2026-03-23",
    endDate: "2026-03-24",
    reason: "Going for vacations",
    status: "REJECTED",
    employee: employeeData[1],
  },
  {
    _id: "L3",
    employeeId: "EMP1003",
    type: "CASUAL",
    startDate: "2026-03-27",
    endDate: "2026-03-28",
    reason: "Temple visit",
    status: "PENDING",
    employee: employeeData[2],
  },
  {
    _id: "L4",
    employeeId: "EMP1001",
    type: "SICK",
    startDate: "2026-03-15",
    endDate: "2026-03-16",
    reason: "Leg fracture",
    status: "APPROVED",
    employee: employeeData[0],
  },
];

// Payslips
export const dummyPayslipData = [
    {
        _id: "69b41595f8a807df391d7baa",
        employeeId: "69b411e6f8a807df391d7b13",
        month: 2,
        year: 2026,
        basicSalary: 2000,
        allowances: 200,
        deductions: 20,
        netSalary: 2180,
        createdAt: "2026-03-13T13:48:05.653Z",
        updatedAt: "2026-03-13T13:48:05.653Z",
        id: "69b41595f8a807df391d7baa",
        employee: employeeData[0],
    },
    {
        _id: "69b41536f8a807df391d7b9c",
        employeeId: "69b41439f8a807df391d7b52",
        month: 2,
        year: 2026,
        basicSalary: 2000,
        allowances: 200,
        deductions: 20,
        netSalary: 2180,
        createdAt: "2026-03-13T13:46:30.804Z",
        updatedAt: "2026-03-13T13:46:30.804Z",
        id: "69b41536f8a807df391d7b9c",
        employee: employeeData[1],
    },
    {
        _id: "69b41526f8a807df391d7b98",
        employeeId: "69b414a7f8a807df391d7b58",
        month: 2,
        year: 2026,
        basicSalary: 1000,
        allowances: 100,
        deductions: 10,
        netSalary: 1090,
        createdAt: "2026-03-13T13:46:14.884Z",
        updatedAt: "2026-03-13T13:46:14.884Z",
        id: "69b41526f8a807df391d7b98",
        employee: employeeData[2],
    },
    {
        _id: "69b41515f8a807df391d7b94",
        employeeId: "69b411e6f8a807df391d7b13",
        month: 1,
        year: 2026,
        basicSalary: 1000,
        allowances: 200,
        deductions: 20,
        netSalary: 1180,
        createdAt: "2026-03-13T13:45:57.132Z",
        updatedAt: "2026-03-13T13:45:57.132Z",
        id: "69b41515f8a807df391d7b94",
        employee: employeeData[0],
    },
    {
        _id: "69b414fbf8a807df391d7b90",
        employeeId: "69b41439f8a807df391d7b52",
        month: 1,
        year: 2026,
        basicSalary: 2000,
        allowances: 100,
        deductions: 10,
        netSalary: 2090,
        createdAt: "2026-03-13T13:45:31.899Z",
        updatedAt: "2026-03-13T13:45:31.899Z",
        id: "69b414fbf8a807df391d7b90",
        employee: employeeData[1],
    },
    {
        _id: "69b414e5f8a807df391d7b8c",
        employeeId: "69b414a7f8a807df391d7b58",
        month: 1,
        year: 2026,
        basicSalary: 2000,
        allowances: 100,
        deductions: 10,
        netSalary: 2090,
        createdAt: "2026-03-13T13:45:09.169Z",
        updatedAt: "2026-03-13T13:45:09.169Z",
        id: "69b414e5f8a807df391d7b8c",
        employee: employeeData[2],
    },
];

// Attendance
export const dummyAttendanceData = [
    {
        _id: "69b68d19f4437fdd254d5a68",
        employeeId: "69b411e6f8a807df391d7b13",
        date: "2026-03-14T18:30:00.000Z",
        checkIn: "2026-03-15T10:42:33.966Z",
        checkOut: "2026-03-15T18:42:37.476Z",
        status: "Present",
        workingHours: 8,
        dayType: "Full Day",
        createdAt: "2026-03-15T10:42:33.973Z",
        updatedAt: "2026-03-15T10:42:37.479Z",
    },
    {
        _id: "69b415b9f8a807df391d7bcc",
        employeeId: "69b411e6f8a807df391d7b13",
        date: "2026-03-12T18:30:00.000Z",
        checkIn: "2026-03-13T13:48:41.416Z",
        checkOut: "2026-03-13T21:48:42.430Z",
        status: "Present",
        workingHours: 8,
        dayType: "Full Day",
        createdAt: "2026-03-13T13:48:41.418Z",
        updatedAt: "2026-03-13T13:48:42.433Z",
    },
    {
  _id: "69b50001f8a807df391d7c01",
  employeeId: "69b41439f8a807df391d7b52",
  date: "2026-03-13T18:30:00.000Z",
  checkIn: "2026-03-14T04:10:00.000Z",
  checkOut: "2026-03-14T12:30:00.000Z",
  status: "Present",
  workingHours: 8.3,
  dayType: "Full Day",
  createdAt: "2026-03-14T04:10:05.000Z",
  updatedAt: "2026-03-14T12:30:10.000Z",
},
{
  _id: "69b50002f8a807df391d7c02",
  employeeId: "69b414a7f8a807df391d7b58",
  date: "2026-03-13T18:30:00.000Z",
  checkIn: "2026-03-14T06:45:00.000Z",
  checkOut: "2026-03-14T13:30:00.000Z",
  status: "Late",
  workingHours: 6.75,
  dayType: "Half Day",
  createdAt: "2026-03-14T06:45:10.000Z",
  updatedAt: "2026-03-14T13:30:15.000Z",
},
{
  _id: "69b50003f8a807df391d7c03",
  employeeId: "69b411e6f8a807df391d7b13",
  date: "2026-03-13T18:30:00.000Z",
  checkIn: null,
  checkOut: null,
  status: "Absent",
  workingHours: 0,
  dayType: "Short Day",
  createdAt: "2026-03-14T00:00:00.000Z",
  updatedAt: "2026-03-14T00:00:00.000Z",
}
];



export function getWorkingHoursDisplay(record) {
    if (record.workingHours != null) {
        const hrs = Math.floor(record.workingHours);
        const mins = Math.round((record.workingHours - hrs) * 60);
        return `${hrs}h ${mins}m`;
    }
    // If still checked in (no checkout), compute live hours
    if (record.checkIn && !record.checkOut) {
        const diffMs = Date.now() - new Date(record.checkIn).getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const hrs = Math.floor(diffHours);
        const mins = Math.round((diffHours - hrs) * 60);
        return `${hrs}h ${mins}m (ongoing)`;
    }
    return "—";
}

export function getDayTypeDisplay(record) {
    if (record.dayType) {
        const map = {
            "Full Day": "badge-success",
            "Three Quarter Day": "bg-blue-100 text-blue-700",
            "Half Day": "badge-warning",
            "Short Day": "badge-danger",
        };
        return {
            label: record.dayType,
            className: map[record.dayType] || "bg-slate-100 text-slate-600",
        };
    }
    if (record.checkIn && !record.checkOut) {
        return { label: "In Progress", className: "bg-indigo-100 text-indigo-700" };
    }
    return { label: "—", className: "" };
}