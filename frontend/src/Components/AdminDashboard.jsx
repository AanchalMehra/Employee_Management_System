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
    label: "Total Deparments",
    description:"Oranization Units"
},
{
    icon: <Calendar1Icon size={20} />,
    value: data.todayAttendance,
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
      <div  className="mb-6">
            <h1 className="font-semibold text-2xl ">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Welcome Admin - here's your overview</p>
      </div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white sm:gap-5 mb-8">
  {stats.map((stat, index) => {
    return (
      <div 
        key={index} 
        className="bg-[#f4f4f5] border border-gray-200 p-6 rounded-2xl 
                   transition-all duration-300 ease-in-out cursor-pointer
                   hover:bg-white hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 group"
      >
        {/* Title: card.title */}
        <h1 className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-4 group-hover:text-blue-600 transition-colors">
          {stat.label}
        </h1>

        
        <div className="flex items-center gap-4">
          
          <div className="p-3 bg-white rounded-xl text-gray-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            {stat.icon}
          </div>
          
          {/* Value: card.value */}
          <h2 className=" text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
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
export default AdminDashboard