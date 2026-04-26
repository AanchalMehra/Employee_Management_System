import { Plus, Search, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { departments } from "../Alldata";
import Loading from "../Components/Loading";
import EmployeeCard from "../Components/EmployeeCard";
import EmployeeForm from "../Components/EmployeeForm";
import api from "../api/axios";
import toast from "react-hot-toast";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setselectDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const url = selectDept ? `/employees?departments=${selectDept}` : "/employees";
      const res = await api.get(url);
      setEmployees(res.data);
    } catch (err) {
      console.error("failed to fetch data", err.message);
    } finally {
      setLoading(false);
    }
  }, [selectDept]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (employee) => {
    if (employee.isDeleted || employee.employmentStatus === "INACTIVE") return;
    if (!confirm("Are you sure you want to mark this employee as deleted?")) return;
    
    try {
      const empId = employee._id ;
      await api.delete(`/employees/${empId}`);
      setTimeout(() => {
        fetchEmployees(); 
      }, 300);
      toast.success("Employee marked as deleted");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error(err?.response?.data?.err || "Failed to delete");
    }
  };

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditEmployee(null);
    setIsModalOpen(true);
  };


  console.log("Current List Count:", filtered.length);
console.log("Deleted items in list:", filtered.filter(e => e.isDeleted).length);
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
              onSave={() => {
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
          <p className="text-slate-400 text-sm mt-1">Manage your team members</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* SEARCH/FILTER */}
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
          {filtered.map((emp) => (
            <EmployeeCard
              key={emp._id || emp.id}
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