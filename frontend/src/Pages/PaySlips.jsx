import {useCallback, useState, useEffect} from 'react'
import { dummyPayslipData,employeeData } from '../Alldata';
import Loading from '../Components/Loading';
import PaySlipList from '../Components/payslips/PaySlipList';
import GeneratePayslipForm from '../Components/payslips/GeneratePayslipForm';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
function PaySlips(){
    const [payslips,setPayslips]=useState([])
    const [employees,setEmployees]=useState([])
    const [loading,setLoading]=useState(true)
    const {user}=useAuth();
    const isAdmin=user?.role==="ADMIN";

    const fetchPayslips=useCallback( async ()=>{
        try{
            const res= await api.get('/payslips')
            setPayslips(res.data.data||[])
        }
        catch(err){
            toast.error(err?.response?.data?.err ||err.message)

        }
        finally{
            setLoading(false)
        }
    },[])

    useEffect(()=>{
        fetchPayslips()
    },[fetchPayslips])

      useEffect(()=>{
        if(isAdmin){
            api.get('/employees')
            .then((res)=>setEmployees(res.data.filter((e)=>
                !e.isDeleted)))
            .catch(()=>{})
        }
    },[isAdmin])

    if(loading) return <Loading/>

    return(
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-semibold text-2xl">Payslips</h1>
          <p className="text-slate-400 text-sm mt-1">
            {isAdmin?"Generate and manage employee payslips":"Your payslips history"}
          </p>
        </div>
            {isAdmin && <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips}/>}
        </div>
            <PaySlipList payslips={payslips} isAdmin={isAdmin}/>
        </div>
    )
}
export default PaySlips;