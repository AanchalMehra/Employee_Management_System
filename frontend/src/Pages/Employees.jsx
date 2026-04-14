import { Plus, Search, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { employeeData, departments } from "../Alldata";
import Loading from "../Components/Loading";
import EmployeeCard from "../Components/EmployeeCard";
import EmployeeForm from "../Components/EmployeeForm";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setselectDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleDelete = (empToDelete) => {
    setEmployees((prev) => prev.filter((emp) => emp !== empToDelete));
  };

  
  const fetchEmployees = useCallback(async () => {
    setLoading(true);

    const stored = JSON.parse(localStorage.getItem("employees"));

    const data =
      stored && stored.length > 0 ? stored : employeeData;

    setEmployees(
      data.filter((emp) =>
        selectDept ? emp.department === selectDept : true
      )
    );

    setTimeout(() => setLoading(false), 500);
  }, [selectDept]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditEmployee(null);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in">

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl border overflow-hidden z-[1000]">

            <EmployeeForm
              initialData={editEmployee}
              onCancel={() => setIsModalOpen(false)}
              onSave={(data) => {
                const stored =
                  JSON.parse(localStorage.getItem("employees")) ||
                  employeeData;

                let updated;

                if (editEmployee) {
                  updated = stored.map((emp) =>
                    emp.employeeId === editEmployee.employeeId
                      ? { ...emp, ...data }
                      : emp
                  );
                } else {
                  updated = [
                    ...stored,
                    {
                      ...data,
                      employeeId: "EMP" + Date.now(),
                      attendance: { present: 0, leave: 0 },
                      leaves: [],
                      payslips: [],
                    },
                  ];
                }

                localStorage.setItem(
                  "employees",
                  JSON.stringify(updated)
                );

                setEditEmployee(null);
                setIsModalOpen(false);
                fetchEmployees();
              }}
            />

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <XIcon />
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-semibold text-2xl">Employees</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your team members
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-11 pr-4 py-2 border rounded-xl text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={selectDept}
          onChange={(e) => setselectDept(e.target.value)}
          className="border rounded-xl px-3 py-2 text-sm"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* LIST */}
      {loading ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">No employees found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((emp, index) => (
            <EmployeeCard
              key={index}
              employee={emp}
              onDelete={handleDelete}
              onEdit={(e) => {
                setEditEmployee(e);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Employees;