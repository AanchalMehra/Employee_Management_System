import { PencilIcon, Trash2Icon } from "lucide-react";

function EmployeeCard({ employee, onEdit, onDelete }) {
  const isLocked = employee.isDeleted === true || employee.employmentStatus === "INACTIVE";

  return (
    <div 
      className={`group relative rounded-xl border transition-all duration-300 overflow-hidden 
      ${isLocked 
        ? "border-slate-300 bg-slate-50/50 pointer-events-none select-none shadow-none" 
        : "border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1"}`}
    >
      {/* Header Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded shadow-sm border
          ${isLocked 
            ? "bg-white text-slate-500 border-slate-300" 
            : "bg-white text-slate-600 border-slate-100"}`}>
          {employee.departments || "Engineering"}
        </span>
        
        {isLocked && (
          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm border border-rose-200">
            Deleted
          </span>
        )}
      </div>

      {/* Action Buttons - Hidden if locked */}
      {!isLocked && (
        <div className="absolute top-3 right-3 flex gap-2 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(employee); }} 
            className="p-1.5 bg-white rounded-lg shadow-sm text-slate-500 hover:text-indigo-600 border border-slate-200"
          >
            <PencilIcon size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(employee); }} 
            className="p-1.5 bg-white rounded-lg shadow-sm text-slate-500 hover:text-red-600 border border-slate-200"
          >
            <Trash2Icon size={14} />
          </button>
        </div>
      )}

      {/* Avatar Section */}
      <div className={`flex items-center justify-center py-12 transition-colors
        ${isLocked ? "bg-slate-100" : "bg-indigo-50/40"}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 
          ${isLocked 
            ? "bg-white border-slate-300 text-slate-400 opacity-60" 
            : "bg-white border-indigo-400 text-indigo-700 shadow-sm"}`}>
          <span className="font-bold text-lg uppercase">
            {employee.firstName?.[0]}{employee.lastName?.[0]}
          </span>
        </div>
      </div>

      {/* Info Section - ✅ Sharpened Borders & Contrast */}
      <div className={`p-4 border-t-2 ${isLocked ? "bg-white border-slate-200" : "bg-white border-indigo-50"}`}>
        <h3 className={`font-bold text-base truncate mb-0.5 ${isLocked ? "text-slate-600" : "text-slate-900"}`}>
          {employee.firstName} {employee.lastName}
        </h3>
        <p className={`text-[11px] font-bold uppercase tracking-wider ${isLocked ? "text-slate-400" : "text-indigo-600"}`}>
          {employee.position}
        </p>
      </div>
    </div>
  );
}

export default EmployeeCard;