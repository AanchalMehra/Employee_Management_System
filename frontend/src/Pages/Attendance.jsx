import { useState,useCallback,useEffect} from "react";
import {dummyAttendanceData} from "../Alldata"
import Loading from "../Components/Loading";
import { CheckInButton } from "../Components/CheckInButton";
import AttendanceStats from "../Components/AttendanceStats";
import { AttendanceHistory } from "../Components/AttendanceHistory";
function Attendance(){
    const [history,setHistory]=useState([])
    const [loading,setLoading]=useState(true)
    const [isDeleted,setIsDeleted]=useState(true)

    const fetchData=useCallback(async()=>{
        setHistory(dummyAttendanceData)
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[])

    useEffect(()=>{
        fetchData()
    },[fetchData])

    if(loading) return <Loading/>

    const today=new Date()
    today.setHours(0,0,0,0)
    const todayRecord=history.find((r)=>new Date(r.date).toDateString()===today.toDateString())
    return(
        <div className="space-y-6 mb-8">

  {/* Header */}
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-semibold text-2xl">Attendance</h1>
      <p className="text-slate-400 text-sm mt-1">
        Track your work hours and daily check-ins
      </p>
    </div>

    <CheckInButton 
      todayRecord={todayRecord} 
      onAction={fetchData}
    />
  </div>

  {/* Stats BELOW */}
  <AttendanceStats history={history} />

  <AttendanceHistory history={history}/>

</div>
    )
}
export default Attendance;