import { IndianRupeeIcon,CalendarCheck,ArrowRightIcon, FileTextIcon} from "lucide-react";
import { Link } from "react-router-dom";
function EmployeeDashboard({data}){
   if (!data) return null;
    const firstName = data?.firstName || data?.employee?.firstName || "User";

const cards=[{
    title: "Latest Payslip",
    icon: <IndianRupeeIcon size={20} />,
   value: data.payslips?.[0]?.amount || 0
},
{
    title: "Attendance",
    icon: <CalendarCheck size={20} />,
    value: data.attendance?.present|| 0
},
{
    title: "Pending Leaves",
    icon: <FileTextIcon size={20} />,
    value: data.attendance?.leave|| 0
}
]

   return(
    <>
      <div  className="mb-6">
         <h1 className="font-semibold text-2xl ">Welcome, {firstName}!</h1>
         <p className="text-slate-400 text-sm mt-1">{data.position} - {data.dept}</p>
      </div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-white">
  {cards.map((card, index) => {
    return (
      <div 
        key={index} 
        className="bg-[#f4f4f5] border border-gray-200 p-6 rounded-2xl 
                   transition-all duration-300 ease-in-out cursor-pointer
                   hover:bg-white hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 group"
      >
        {/* Title: card.title */}
        <h1 className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-4 group-hover:text-blue-600 transition-colors">
          {card.title}
        </h1>

        {/* Inner Div: Icon and Value */}
        <div className="flex items-center gap-4">
          {/* Icon: card.icon */}
          <div className="p-3 bg-white rounded-xl text-gray-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            {card.icon}
          </div>
          
          {/* Value: card.value */}
          <h2 className=" text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {card.value}
          </h2>
        </div>
      </div>
    )
  })}
</div>

<div className='mt-8 flex flex-col sm:flex-row gap-4 px-6'>
  <Link 
    to="/attendance" 
className='flex flex-0.5 items-center justify-center gap-2 px-5 py-2.5 bg-[#2563eb] text-white text-[15px] font-semibold rounded-xl shadow-md shadow-blue-100 hover:bg-[#1d4ed8] hover:shadow-lg transition-all active:scale-95'>  
    <span>Mark Attendance</span>
    <ArrowRightIcon className="w-5 h-5 text-white" />
  </Link>

  <Link 
    to="/leave" 
className=' flex-0.5 text-center px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-[15px] font-semibold rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95'>    
Apply for Leave

  </Link>
</div>
       
    </>
   )
}
export default EmployeeDashboard