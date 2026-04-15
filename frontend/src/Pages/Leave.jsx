import { useCallback, useState,useEffect } from "react";
import { dummyLeaveData } from "../Alldata";
import Loading from "../Components/Loading"
import { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from "lucide-react";
import LeaveHistory from "../Components/leave/LeaveHistory";
import ApplyLeaveModal from "../Components/leave/ApplyLeaveModal";
function Leave(){
    const [leaves,setLeaves]=useState([])
    const [loading,setLoading]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [isDeleted,setIsDeleted]=useState(false);

    const isAdmin=false;

    const fetchLeaves=useCallback(()=>{
     setLeaves(dummyLeaveData);
     setTimeout(()=>{
        setLoading(false)
     }
     ,1000)
    },[])

    useEffect(()=>fetchLeaves(),[fetchLeaves])
    if(loading) return <Loading/>
    const approvedLeaves=leaves.filter((l)=>l.status==="APPROVED")
    const sickCount=approvedLeaves.filter((l)=>l.type==="SICK").length;
    const casualCount=approvedLeaves.filter((l)=>l.type==="CASUAL").length;
    const annualCount=approvedLeaves.filter((l)=>l.type==="ANNUAL").length;

    const leaveStats=[{
        label:"Sick Leave",
        value:sickCount,
        icon:<ThermometerIcon/>
    },

    {
        label:"Casual Leave",
        value:casualCount,
        icon:<UmbrellaIcon/>
    },

    {
        label:"Annual Leave",
        value:annualCount,
        icon:<PalmtreeIcon/>
    }
]

    return(
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-semibold text-2xl">Leave Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            {isAdmin?"Manage leave application":"Your leave history and requests"}
          </p>
        </div>
        {!isAdmin && !isDeleted &&(
            <button onClick={()=>setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
>
                <PlusIcon className="w-4 h-4"/> Apply for Leave
            </button>
        )}
        </div>
        {
            !isAdmin &&(
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2 bg-white">
    {leaveStats.map((stat, index) => {
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
         <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves}/>
         <ApplyLeaveModal open={showModal} 
          onClose={()=>setShowModal(false)} onSuccess={fetchLeaves}/>
    </div>
    )
}
export default Leave;