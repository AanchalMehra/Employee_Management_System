import {useCallback, useState, useEffect} from 'react'
import { dummyPayslipData,employeeData } from '../Alldata';
import Loading from '../Components/Loading';
import PaySlipList from '../Components/payslips/PaySlipList';
import GeneratePayslipForm from '../Components/payslips/GeneratePayslipForm';
function PaySlips(){
    const [payslips,setPayslips]=useState([])
    const [employees,setEmployees]=useState([])
    const [loading,setLoading]=useState(true)
    const isAdmin=true;

    const fetchPayslips=useCallback( async ()=>{
        setPayslips(dummyPayslipData);
        setTimeout(()=>{
            setLoading(false);
        },
    1000)
    },[])

    useEffect(()=>{
        fetchPayslips()
    },[fetchPayslips])

      useEffect(()=>{
        if(isAdmin){
            setEmployees(employeeData)
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