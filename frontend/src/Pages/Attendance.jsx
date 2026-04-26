import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'

export const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false)

  const handleAttendance = async () => {
    

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

  // If already checked out ,show completed
  if (todayRecord?.checkOut) {
    return (
      <div className="absolute bottom-4 right-4 bg-green-50 border border-green-200 px-4 py-3 rounded-xl shadow-sm">
        <h3 className="font-semibold text-green-700">Work day completed</h3>
        <p className="text-sm text-green-600 mt-1">Great job! See you tomorrow</p>
      </div>
    )
  }

  const isCheckedIn = !!todayRecord?.checkIn

  return (
    <div className="absolute bottom-4 right-4 flex flex-col z-10">
      <button
        disabled={loading}
        onClick={handleAttendance}
        className={`
          flex items-center gap-5 w-50 text-sm rounded-xl transition-all duration-300 border px-3 py-2
          ${loading ? "bg-slate-50 border-slate-200 cursor-not-allowed" :
            isCheckedIn
              ? "bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-700"
              : "bg-indigo-100 border-indigo-200 hover:bg-indigo-200 text-indigo-700"}
          active:scale-[0.98]
        `}
      >
        {/* Icon */}
        <div className={`
          flex items-center justify-center p-2 rounded-lg
          ${isCheckedIn ? "bg-rose-200 text-rose-700" : "bg-indigo-200 text-indigo-700"}
        `}>
          {loading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : isCheckedIn ? (
            <LogOutIcon className="size-4" />
          ) : (
            <LogInIcon className="size-4" />
          )}
        </div>

        {/* Text */}
        <div className="text-left">
          <h2 className="text-lg font-semibold">
            {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>
          <p className="text-xs opacity-80">
            {isCheckedIn ? "End your shift?" : "Start your work day!"}
          </p>
        </div>
      </button>
    </div>
  )
}