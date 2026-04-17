import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../Alldata";
import Loading from "../Components/Loading";
import { format } from "date-fns";

function PrintPaySlips() {
    const { id } = useParams();
    const [payslip, setPaySlip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(true);


    useEffect(() => {
        const foundSlip = dummyPayslipData.find((slip) => slip._id === id);
        setPaySlip(foundSlip);
        
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) return <Loading />;
    if (!payslip) return <p className="py-12 text-slate-400 text-center font-medium">Payslip not found</p>;

    return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-20 font-sans text-slate-900">

        <div className="max-w-2xl mx-auto bg-white border border-slate-100 p-10 sm:p-16 rounded-xl shadow-md">
            
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-black tracking-[0.35em] uppercase text-slate-900">
                    Payslip
                </h1>
                <p className="text-slate-500 text-sm font-medium mt-3">
                    {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                </p>
            </div>

            {/* Employee Info */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 mb-10">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Employee Name</label>
                    <p className="text-sm font-semibold text-slate-900">
                        {payslip.employee?.firstName} {payslip.employee?.lastName}
                    </p>
                </div>

                <div className="space-y-1 text-right">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Position</label>
                    <p className="text-sm font-semibold text-slate-900">
                        {payslip.employee?.position}
                    </p>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Email</label>
                    <p className="text-sm text-slate-500 break-all">
                        {payslip.employee?.email}
                    </p>
                </div>

                <div className="space-y-1 text-right">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Period</label>
                    <p className="text-sm text-slate-500">
                        {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 my-10"></div>

            {/* Table */}
            <div className="overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                            <th className="pb-3">Description</th>
                            <th className="pb-3 text-right">Amount</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        <tr>
                            <td className="py-5 text-sm text-slate-600">Basic Salary</td>
                            <td className="py-5 text-sm text-right font-semibold text-slate-900">
                                {(payslip.basicSalary ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-5 text-sm text-slate-600">Allowances</td>
                            <td className="py-5 text-sm text-right font-semibold text-slate-900">
                                +{(payslip.allowances ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-5 text-sm text-slate-600">Deductions</td>
                            <td className="py-5 text-sm text-right font-semibold text-rose-500">
                                -{(payslip.deductions ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </td>
                        </tr>

                        <tr className="bg-slate-100">
                            <td className="py-6 px-4 text-base font-bold text-slate-900">
                                Net Salary
                            </td>
                            <td className="py-6 px-4 text-right text-2xl font-black text-slate-900">
                                {(payslip.netSalary ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Print Button */}
            <div className="mt-14 flex justify-center no-print">
                <button 
                    onClick={() =>{
                        setShow(false)
                        setTimeout(() => {
                            window.print();
                        }, 100);
                    }}
                    className={`${show ? "block" : "hidden"} bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-100`}
                >
                    Print Payslip
                </button>
            </div>
        </div>
    </div>
);
}

export default PrintPaySlips;