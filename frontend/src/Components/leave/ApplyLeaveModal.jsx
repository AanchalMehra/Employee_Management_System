import React, { useState } from 'react';
import { XIcon, Loader2, FileText, Calendar, AlignLeft, Send } from 'lucide-react';
import api from '../../api/axios';
import toast from "react-hot-toast"


function ApplyLeaveModal({ open, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'ANNUAL',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData=new FormData(e.currentTarget)
        const data=Object.fromEntries(formData.entries())
        try{
             await api.post("/leave",data);
             onSuccess();
             onClose(); 
             setFormData({
            type: 'ANNUAL',
            startDate: '',
            endDate: '',
            reason: ''
         });
       
            }
        catch(err){
            console.log("ERROR:", err.response?.data);
            toast.error(err?.response?.data?.err|| err.message)

        }
        finally {
        setLoading(false); 
    }
    };

    if (!open) return null;

 return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            {/* Modal Body */}
            <div className="relative bg-white w-full max-w-[400px] sm:w-[400px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors z-10"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                    {/* Header */}
                    <div className="pr-6">
                        <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] leading-tight">Apply for Leave</h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium italic">Submit leave request for approval</p>
                    </div>

                    <div className="space-y-4">
                        {/* Leave Type */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Leave Type</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <select 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                                    value={formData.type}
                                    name="type"
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                >
                                    <option value="ANNUAL">Annual Leave</option>
                                    <option value="SICK">Sick Leave</option>
                                    <option value="CASUAL">Casual Leave</option>
                                </select>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Duration</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="relative">
                                    <Calendar className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <input 
                                        type="date" 
                                        name="startDate"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-9 sm:pl-10 pr-1 py-3 text-[10px] sm:text-[11px] text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                    />
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <input 
                                        type="date" 
                                        name="endDate"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-9 sm:pl-10 pr-1 py-3 text-[10px] sm:text-[11px] text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Reason for Leave</label>
                            <div className="relative">
                                <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
                                <textarea 
                                    placeholder="Reason..."
                                     name="reason"
                                    rows="2"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 pt-2">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs sm:text-[13px] rounded-2xl transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="flex-[1.5] py-3 bg-[#5c51ef] hover:bg-[#4a41d4] text-white font-bold text-xs sm:text-[13px] rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-3.5 h-3.5 rotate-[-10deg]" />
                                    <span>Submit Request</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplyLeaveModal;
