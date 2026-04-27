import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { format } from "date-fns";
import api from "../api/axios";

function PrintPaySlips() {
    const { id } = useParams();
    const [payslip, setPaySlip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/payslips/${id}`)
            .then((res) => setPaySlip(res.data.result))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading />;
    if (!payslip)
        return (
            <p className="py-12 text-slate-400 text-center font-medium">
                Payslip not found
            </p>
        );

    return (
        <div className="min-h-screen bg-slate-50 p-6 sm:p-20 font-sans text-slate-900 print:bg-white print:p-0">

            <div className="max-w-2xl mx-auto bg-white border border-slate-100 p-10 sm:p-16 rounded-xl shadow-md print:shadow-none print:border-none print:rounded-none print:p-8">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold tracking-[0.35em] uppercase text-slate-900 print:text-black">
                        Payslip
                    </h1>

                    <p className="text-slate-500 text-sm font-medium mt-3">
                        {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                    </p>
                </div>

                <div className="mb-10 border border-slate-100 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-2">

                        <div className="border-b border-r border-slate-100 p-4">
                            <p className="text-[11px] uppercase tracking-wide text-slate-500 font-medium">
                                Employee Name
                            </p>
                            <p className="text-sm font-medium text-slate-900 mt-1">
                                {payslip.employee?.firstName} {payslip.employee?.lastName}
                            </p>
                        </div>

                        <div className="border-b border-slate-100 p-4">
                            <p className="text-[11px] uppercase tracking-wide text-slate-500 font-medium">
                                Position
                            </p>
                            <p className="text-sm font-medium text-slate-900 mt-1 break-words">
                                {payslip.employee?.position}
                            </p>
                        </div>

                        <div className="border-r border-slate-100 p-4">
                            <p className="text-[11px] uppercase tracking-wide text-slate-500 font-medium">
                                Email
                            </p>
                            <p className="text-sm font-medium text-slate-700 mt-1 break-all">
                                {payslip.employee?.email}
                            </p>
                        </div>

                        <div className="p-4">
                            <p className="text-[11px] uppercase tracking-wide text-slate-500 font-medium">
                                Period
                            </p>
                            <p className="text-sm font-medium text-slate-900 mt-1">
                                {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="border-t border-slate-200 my-8"></div>

                <table className="w-full text-left border-collapse print:text-black">
                    <thead>
                        <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500 font-medium">
                            <th className="pb-3 px-6">Description</th>
                            <th className="pb-3 px-6 text-right">Amount</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr className="border-b border-slate-100">
                            <td className="py-4 px-6 text-sm font-medium text-slate-700">
                                Basic Salary
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-right tabular-nums text-slate-900">
                                {(payslip.basicSalary ?? 0).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </td>
                        </tr>

                        <tr className="border-b border-slate-100">
                            <td className="py-4 px-6 text-sm font-medium text-slate-700">
                                Allowances
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-right tabular-nums text-slate-900">
                                {(payslip.allowances ?? 0).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </td>
                        </tr>

                        <tr className="border-b border-slate-100">
                            <td className="py-4 px-6 text-sm font-medium text-slate-700">
                                Deductions
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-right tabular-nums text-rose-500">
                                {(payslip.deductions ?? 0).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </td>
                        </tr>

                        <tr className="border-t-2 border-slate-300 bg-slate-50">
                            <td className="py-4 px-6 text-sm font-bold text-slate-900">
                                Net Salary
                            </td>
                            <td className="py-4 px-6 text-lg font-bold text-right tabular-nums text-slate-900">
                                {(payslip.netSalary ?? 0).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div className="mt-12 flex justify-center print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-bold text-sm shadow-lg"
                    >
                        Print Payslip
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PrintPaySlips;