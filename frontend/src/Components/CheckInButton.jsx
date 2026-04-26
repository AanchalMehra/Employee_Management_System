import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

export const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false)

  const handleAttendance = async () => {
    if (loading) return
    setLoading(true)
    try {
      await api.post("/attendance")
      await onAction()   
    } catch (err) {
      toast.error(err?.response?.data?.err || err.message)
    } finally {
      setLoading(false)
    }
  }

  if (todayRecord?.checkOut) {
    return (
      <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-xl shadow-sm">
        <h3 className="font-semibold text-green-700 text-sm">Work day completed</h3>
        <p className="text-xs text-green-600">See you tomorrow!</p>
      </div>
    )
  }

  const isCheckedIn = !!todayRecord?.checkIn

  return (
    <button
      disabled={loading}
      onClick={handleAttendance}
      className={`
        flex items-center gap-4 min-w-[180px] rounded-xl transition-all duration-300 border px-3 py-2
        ${loading ? "bg-slate-50 border-slate-200 cursor-not-allowed" :
          isCheckedIn 
            ? "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-700" 
            : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-700"}
        active:scale-95
      `}
    >
      <div className={`p-2 rounded-lg ${isCheckedIn ? "bg-rose-200" : "bg-indigo-200"}`}>
        {loading ? <Loader2Icon className="size-4 animate-spin" /> : 
         isCheckedIn ? <LogOutIcon className="size-4" /> : <LogInIcon className="size-4" />}
      </div>

      <div className="text-left">
        <h2 className="text-sm font-bold leading-tight">
          {loading ? "Wait..." : isCheckedIn ? "Clock Out" : "Clock In"}
        </h2>
        <p className="text-[10px] opacity-70">
          {isCheckedIn ? "End shift" : "Start day"}
        </p>
      </div>
    </button>
  )
}