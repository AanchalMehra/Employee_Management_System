import { useState,useEffect } from "react";
import { departments } from "../Alldata";

function EmployeeForm({initialData, onCancel,onSave}){

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  phone: "",
  joinDate: "",
  bio: "",

  
  department: "",
  position: "",
  basicSalary: "",
  allowances: "",
  deductions: "",
  status: "Active",

  email: "",
  password: "",
  role: "Employee"
});


const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  joinDate: "",
  bio: "",

  department: "",
  position: "",
  basicSalary: "",
  allowances: "",
  deductions: "",
  status: "Active",

  email: "",
  password: "",
  role: "Employee"
};

useEffect(() => {
  if (initialData) {
    setFormData({ ...emptyForm, ...initialData }); // 🔥 merge
  } else {
    setFormData(emptyForm);
  }
}, [initialData]);
    return(
        <> 
     <form
  onSubmit={(e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.joinDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    onSave(formData);
  }}
  className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto text-sm"
>

  {/* First Name */}

   <p className="text-xs font-semibold text-gray-400 uppercase mt-4">
  Personal Details
</p>
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-slate-600">
      First Name *
    </label>
    <input
      type="text"
      autoFocus 
      value={formData.firstName}
      onChange={(e) =>
        setFormData(prev => ({ ...prev, firstName: e.target.value }))
      }
      className="border border-slate-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter first name"
    />
  </div>

  {/* Last Name */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-slate-600">
      Last Name *
    </label>
    <input
      type="text"
      value={formData.lastName}
      onChange={(e) =>
        setFormData(prev => ({ ...prev, lastName: e.target.value }))
      }
      className="border border-slate-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter last name"
    />
  </div>

  {/* Phone */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-slate-600">
      Phone Number *
    </label>
    <input
      type="text"
      value={formData.phone}
      onChange={(e) =>
        setFormData(prev => ({ ...prev, phone: e.target.value }))
      }
      className="border border-slate-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter phone number"
    />
  </div>

  {/* Join Date */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-slate-600">
      Join Date *
    </label>
    <input
      type="date"
      value={formData.joinDate}
      onChange={(e) =>
        setFormData(prev => ({ ...prev, joinDate: e.target.value }))
      }
      className="border border-slate-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Bio */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-slate-600">
      Bio (Optional)
    </label>
    <textarea
      value={formData.bio}
      onChange={(e) =>
        setFormData(prev => ({ ...prev, bio: e.target.value }))
      }
      rows={3}
      className="border border-slate-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      placeholder="Write something about the employee..."
    />
  </div>

  <p className="text-xs font-semibold text-gray-400 uppercase mt-4">
  Employment Details
</p>

<div className="grid grid-cols-2 gap-3">
  {/* Department */}
  <select
    value={formData.department}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, department: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  >
    <option value="">Select Department</option>
    {departments.map(dep => (
      <option key={dep}>{dep}</option>
    ))}
  </select>

  {/* Position */}
  <input
    type="text"
    placeholder="Position"
    value={formData.position}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, position: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  />

  {/* Salary */}
  <input
    type="number"
    placeholder="Basic Salary"
    value={formData.basicSalary}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, basicSalary: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  />

  <input
    type="number"
    placeholder="Allowances"
    value={formData.allowances}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, allowances: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  />

  <input
    type="number"
    placeholder="Deductions"
    value={formData.deductions}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, deductions: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  />

  {/* Status */}
  <select
    value={formData.status}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, status: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  >
    <option>Active</option>
    <option>Inactive</option>
  </select>
</div>

<p className="text-xs font-semibold text-gray-400 uppercase mt-4">
  Account Setup
</p>

<div className="grid grid-cols-2 gap-3">
  {/* Email */}
  <input
    type="email"
    placeholder="Work Email"
    value={formData.email}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, email: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  />

  {/* Password */}
  {!initialData ? (
    <input
      type="password"
      placeholder="Temporary Password"
      onChange={(e) =>
        setFormData(prev => ({ ...prev, password: e.target.value }))
      }
      className="border border-slate-200 rounded-lg p-2 text-sm"
    />
  ) : (
    <input
      type="password"
      placeholder="Change Password (optional)"
      onChange={(e) =>
        setFormData(prev => ({ ...prev, password: e.target.value }))
      }
      className="border border-slate-200 rounded-lg p-2 text-sm"
    />
  )}

  {/* Role */}
  <select
    value={formData.role}
    onChange={(e) =>
      setFormData(prev => ({ ...prev, role: e.target.value }))
    }
    className="border border-slate-200 rounded-lg p-2 text-sm"
  >
    <option>Employee</option>
    <option>Admin</option>
  </select>
</div>

  {/* Buttons */}
  <div className="flex justify-end gap-2 mt-2">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
    >
     {initialData ? "Update Employee" : "Create Employee"}
    </button>
  </div>

</form>




        </>
    )
}
export default EmployeeForm;