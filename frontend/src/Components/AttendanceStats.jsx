import { AlertCircleIcon, CalendarSearchIcon, ClockIcon } from 'lucide-react'
import React from 'react'

function AttendanceStats({history}) {
  const totalPresent=history.filter((h)=>
     h.status==="Present" || h.status==="Late"
  ).length

  const totalLate=history.filter((h)=>
   h.status==="Late"
  ).length

  const stats=[
    {
      label:"Days Present",
      value:totalPresent,
      icon: <CalendarSearchIcon/>
    },
     {
      label:"Late Arrivals",
      value:totalLate,
      icon:< AlertCircleIcon/>
    },
     {
      label:"Avg work hrs",
      value:"8.5hrs",
      icon: <ClockIcon/>
    }
  ]
  return (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2 bg-white">
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
     
  )
}

export default AttendanceStats