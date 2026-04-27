import { PlusIcon, XIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

function GeneratePayslipForm({ employees, onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 
            text-white text-sm font-bold rounded-xl shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />Generate Payslip
        </button>
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            await api.post('/payslips', data)
            setIsOpen(false);
            onSuccess();
        }
        catch (err) {
            toast.error(err?.response?.data?.err || err.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="relative bg-white w-full max-w-[400px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors z-10"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">

                    <div className="pr-6">
                        <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] leading-tight">
                            Generate Monthly Payslip
                        </h2>
                    </div>

                    <div className="space-y-3">

                        {/* Employee Select */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                Employee
                            </label>
                            <select name="employeeId" required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                            >
                                {employees.map((e) => (
                                    <option key={e._id || e.id} value={e._id || e.id}>
                                        {e.firstName} {e.lastName} ({e.position})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Month and Year */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    Month
                                </label>
                                <select name="month"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none">
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    Year
                                </label>
                                <input type="number" name="year"
                                    defaultValue={new Date().getFullYear()}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                        </div>

                        {/* Basic Salary */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                Basic Salary (₹)
                            </label>
                            <input type="number" name="basicSalary" required placeholder='5000'
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>

                        {/* Allowances & Deductions */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    Allowances (₹)
                                </label>
                                <input type="number" name="allowances" defaultValue="0"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    Deductions (₹)
                                </label>
                                <input type="number" name="deductions" defaultValue="0"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button type="button" onClick={() => setIsOpen(false)}
                            className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs sm:text-[13px] rounded-2xl transition-all active:scale-95">
                            Cancel
                        </button>

                        <button type="submit" disabled={loading}
                            className="flex-[1.5] py-3 bg-[#5c51ef] hover:bg-[#4a41d4] text-white font-bold text-xs sm:text-[13px] rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Generate</span>}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default GeneratePayslipForm;