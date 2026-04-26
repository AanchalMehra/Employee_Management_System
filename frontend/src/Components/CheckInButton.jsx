
import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

export const CheckInButton = ({todayRecord,onAction}) => {
    const [loading,setLoading]=useState(false)
    const handleAttendance=async()=>{
        setLoading(true)
        try{
          await api.post("/attendance")
          onAction();
        }
        catch(err){
          toast.error(err?.response?.data?.err ||err.message)

        }
        finally{
          setLoading(false)
        }
        
    }

  if(todayRecord?.checkOutTime){
            return(
                <div>
                    <h3>Work day completed</h3>
                    <p>Great job! See you tomorrow</p>
                </div>
            )
        }

    const isCheckedIn=!!todayRecord?.checkIn
  return (
    
        <div className=" absolute bottom-4 right-4 flex flex-col z-1">
           <button
  disabled={loading}
  onClick={handleAttendance}
  className={`
    flex items-center gap-5  w-50 text-sm rounded-xl transition-all duration-300 border px-1 py-1.5
    ${loading ? "bg-slate-50 border-slate-200 cursor-not-allowed" : 
      isCheckedIn 
      ? "bg-rose-50/50 border-rose-100 hover:border-rose-200 hover:bg-rose-50 text-rose-700 shadow-sm" 
      : "bg-indigo-200 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 text-indigo-700 shadow-sm"}
    active:scale-[0.98] group w-full max-w-md
  `}
>
  {/* Icon Container */}
  <div className={`
    flex items-center justify-center p-4 rounded-lg transition-colors
    ${isCheckedIn ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"}
    ${loading ? "bg-slate-200 text-slate-400" : ""}
  `}>
    {loading ? (
      <Loader2Icon className="size-3 animate-spin" />
    ) : isCheckedIn ? (
      <LogOutIcon className="size-3" />
    ) : (
      <LogInIcon className="size-3" />
    )}
  </div>

  {/* Text Content */}
  <div className="text-left">
    <h2 className="text-xl font-semibold tracking-tight leading-tight">
      {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
    </h2>
    <p className={`text-sm font-medium mt-1 ${isCheckedIn ? "text-rose-500/80" : "text-indigo-500/80"}`}>
      {isCheckedIn ? "end your shift?" : "start your work day!"}
    </p>
  </div>
</button>
        </div>
  )
}
