import { Building2Icon, Calendar1Icon, FileTextIcon, UserIcon } from "lucide-react"

function AdminDashboard({data}){

    const stats=[
        {
            icon: <UserIcon size={20} />,
            value: data.totalEmployees,
            label: "Total Employees",
            description:"Active workforce"
        },
        {
            icon: <Building2Icon size={20} />,
            value: data.totalDepartments,
            label: "Total Departments",
            description:"Organization Units"
        },
        {
            icon: <Calendar1Icon size={20} />,
            value: data.totalAttendance,
            label: "Total Attendance",
            description:"Checked In Today"
        },
        {
            icon: <FileTextIcon size={20} />,
            value: data.pendingLeaves,
            label: "Pending Leaves",
            description:"Awaiting approval"
        }
    ]

  return(
      <>
      <div className="mb-6 px-4 md:px-0">
            <h1 className="font-semibold text-2xl text-slate-800">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Welcome Admin - here's your overview</p>
      </div>

    {/* Updated Grid: 1 column on tiny screens, 2 on small/med, 4 on large */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-0 mb-8 w-full max-w-full overflow-hidden">
      {stats.map((stat, index) => {
        return (
          <div 
            key={index} 
            className="bg-[#f4f4f5] border border-gray-200 p-5 md:p-6 rounded-2xl 
                       transition-all duration-300 ease-in-out cursor-pointer
                       hover:bg-white hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 group
                       min-w-0" // Prevents the card from expanding past its flex/grid parent
          >
            {/* Title */}
            <h1 className="text-gray-500 text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-4 group-hover:text-blue-600 transition-colors truncate">
              {stat.label}
            </h1>

            <div className="flex items-center gap-3 md:gap-4">
              {/* Icon Wrapper */}
              <div className="flex-shrink-0 p-3 bg-white rounded-xl text-gray-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              
              {/* Value */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight truncate">
                {stat.value}
              </h2>
            </div>
          </div>
        )
      })}
    </div>
    </>
  )
}
export default AdminDashboard;