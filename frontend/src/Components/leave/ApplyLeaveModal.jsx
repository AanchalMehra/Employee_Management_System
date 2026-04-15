import React, { useState } from 'react';
import { XIcon, Loader2, FileText, Calendar, AlignLeft, Send } from 'lucide-react';

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
        try {
            if (onSuccess) {
                await onSuccess(formData);
            }
            onClose(); // Triggers modal closure
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop - Exact Match */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container - Exact rounded-[2rem] and shadow match */}
            <div className="relative bg-white w-full max-lg max-w-lg rounded-[2rem] shadow-2xl border overflow-hidden z-[1000]">
                
                {/* Header Section */}
                <div className="px-8 pt-8 pb-2">
                    <h2 className="text-2xl font-bold text-slate-800">Apply for Leave</h2>
                    <p className="text-slate-400 text-sm mt-1">Submit your leave request for approval</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    
                    {/* Leave Type Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Leave Type</label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="ANNUAL">Annual Leave</option>
                                <option value="SICK">Sick Leave</option>
                                <option value="CASUAL">Casual Leave</option>
                            </select>
                        </div>
                    </div>

                    {/* Duration (From/To) Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Duration</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    required
                                    min={minDate}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    required
                                    min={formData.startDate || minDate}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Reason Section */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Reason for Leave</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                            <textarea
                                required
                                rows="3"
                                placeholder="Briefly explain your reason..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Footer Actions - Exact Button Alignment */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Submit Request
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Top-right X Button - Exact Positioning */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors"
                >
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}

export default ApplyLeaveModal;