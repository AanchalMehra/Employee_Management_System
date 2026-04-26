import { useState, useEffect } from "react";
import { departments } from "../Alldata";
import toast from "react-hot-toast";
import api from "../api/axios.js";

function EmployeeForm({ initialData, onCancel, onSave }) {
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;

  const emptyForm = {
    firstName: "",
    lastName: "",
    phone: "",
    joinDate: "",
    bio: "",
    departments: "",
    position: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    employmentStatus: "ACTIVE",
    email: "",
    password: "",
    role: "EMPLOYEE",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        phone: initialData.phone || "",
        joinDate: initialData.joinDate ? initialData.joinDate.split("T")[0] : "",
        bio: initialData.bio || "",
        departments: initialData.departments || "",
        position: initialData.position || "",
        basicSalary: initialData.basicSalary || 0,
        allowances: initialData.allowances || 0,
        deductions: initialData.deductions || 0,
        employmentStatus: initialData.employmentStatus || "ACTIVE",
        email: initialData.email || initialData.user?.email || "",
        role: initialData.user?.role || "EMPLOYEE",
        password: "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        basicSalary: Number(formData.basicSalary) || 0,
        allowances: Number(formData.allowances) || 0,
        deductions: Number(formData.deductions) || 0,
      };

      if (!payload.password) delete payload.password;

      const targetId = initialData?._id || initialData?.id;
      const url = isEditMode ? `/employees/${targetId}` : "/employees";

      await api[isEditMode ? "put" : "post"](url, payload);

      toast.success(isEditMode ? "Employee updated" : "Employee created");
      onSave?.();
    } catch (err) {
      toast.error(err?.response?.data?.err || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto text-sm"
    >
      <p className="text-xs font-semibold text-gray-400 uppercase mt-2 sm:mt-4">
        Personal Details
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600">First Name *</label>
        <input
          name="firstName"
          placeholder="John"
          value={formData.firstName}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600">Last Name *</label>
        <input
          name="lastName"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600">Phone *</label>
        <input
          name="phone"
          placeholder="+1 234 567 890"
          value={formData.phone}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600">Join Date *</label>
        <input
          name="joinDate"
          type="date"
          value={formData.joinDate}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600">Bio</label>
        <textarea
          name="bio"
          placeholder="Brief professional summary..."
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      <p className="text-xs font-semibold text-gray-400 uppercase mt-3 sm:mt-4">
        Employment Details
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          name="departments"
          value={formData.departments}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5"
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <input
          name="position"
          placeholder="e.g. Software Engineer"
          value={formData.position}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5"
        />

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Basic Salary</label>
          <input
            name="basicSalary"
            type="number"
            min="0"
            placeholder="e.g. 50000"
            value={formData.basicSalary}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg p-2.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Allowances</label>
          <input
            name="allowances"
            type="number"
            min="0"
            placeholder="e.g. 2000"
            value={formData.allowances}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg p-2.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Deductions</label>
          <input
            name="deductions"
            type="number"
            min="0"
            placeholder="e.g. 500"
            value={formData.deductions}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg p-2.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg p-2.5"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <p className="text-xs font-semibold text-gray-400 uppercase mt-3 sm:mt-4">
        Account Setup
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="email"
          placeholder="work@company.com"
          value={formData.email}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5"
        />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder={isEditMode ? "Change Password" : "Password"}
          className="border border-slate-300 rounded-lg p-2.5"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2.5"
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          {loading ? "Saving..." : isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;