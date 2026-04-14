import { useState,useEffect } from "react";
import { employeeData,dummyAdminData } from "../Alldata";
import Loading from "../Components/Loading"
import EmployeeDashboard from "../Components/EmployeeDashboard";
import AdminDashboard from "../Components/AdminDashboard";
function Dashboard(){
    const [data,setData]=useState(null);
     const [loading,setLoading]=useState(true);

     useEffect(()=>{
        setData(dummyAdminData)
        setTimeout(()=>
        setLoading(false),1000)
     },[])

     if(loading) return <Loading/>
     if(!data) return <p className="text-center text-slate-500 py-2">Failed to Load Dashboard</p>
    

    if(data.role==="ADMIN")return <AdminDashboard  data={data}/>
    else return <EmployeeDashboard data={data}/>
}
export default Dashboard;