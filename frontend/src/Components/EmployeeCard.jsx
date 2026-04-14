import { PencilIcon, Trash2Icon } from "lucide-react";

function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="group relative rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">

      {/* avatar */}
      <div className="flex items-center justify-center py-10 bg-gray-100">
        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center border border-2 border-indigo-400">
          <span className="text-indigo-700 font-bold text-sm">
            {employee.firstName?.[0]}
            {employee.lastName?.[0]}
          </span>
        </div>
      </div>

      {/* department */}
      <div className="absolute top-3 left-3">
        <span className="bg-white px-2 py-1 text-xs rounded shadow">
          {employee.department || "Remote"}
        </span>
      </div>

      {/* actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-2">
        <button onClick={() => onEdit(employee)}>
          <PencilIcon size={14} />
        </button>

        <button onClick={() => onDelete(employee)}>
          <Trash2Icon size={14} />
        </button>
      </div>

      {/* info */}
      <div className="p-3">
        <h3 className="font-semibold">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-sm text-gray-500">{employee.position}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;