import { User, AlertCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

function ProfileForm({ initialData, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    const isDeleted = initialData?.isDeleted;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDeleted) return;
        setLoading(true);
        setError("");
        setMessage("");
        
        setTimeout(() => {
            setLoading(false);
            setMessage("Profile updated successfully");
        }, 1000);
    };

    // Standardized styles for full-width look
    const inputStyle = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-slate-100 outline-none transition-all";
    const disabledStyle = "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-100 shadow-none font-medium";

    return (
        /* Changed to w-full and removed max-w constraints */
        <div className="w-full bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header */}
                <div className="space-y-1">
                    <h2 className="flex items-center gap-2 text-xl font-black text-slate-900">
                        <User className='w-5 h-5 text-slate-400' /> Public Profile
                    </h2>
                    <p className="text-sm text-slate-400">
                        This information will be shown on your profile and is optional.
                    </p>
                </div>

                {/* Status Messages */}
                {isDeleted && (
                    <div className='w-full bg-slate-50 text-slate-500 p-4 rounded-2xl text-xs font-bold border border-slate-100 flex items-center gap-3'>
                        <AlertCircle className="w-4 h-4 shrink-0 text-slate-400" />
                        Account deactivated. You can no longer update your profile.
                    </div>
                )}

                {message && (
                    <div className='w-full bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-xs font-bold border border-emerald-100'>
                        {message}
                    </div>
                )}

                <div className='space-y-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>Name</label>
                            <input 
                                disabled 
                                value={`${initialData?.firstName || ''} ${initialData?.lastName || ''}`} 
                                className={`${inputStyle} ${disabledStyle}`} 
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>Email</label>
                            <input 
                                disabled 
                                value={initialData?.email || ''} 
                                className={`${inputStyle} ${disabledStyle}`} 
                            />
                        </div>
                    </div>

                    {/* Position */}
                    <div className="space-y-1.5">
                        <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>Position</label>
                        <input 
                            name="position"
                            disabled={isDeleted}
                            defaultValue={initialData?.position}
                            placeholder="e.g. Senior Developer"
                            className={`${inputStyle} ${isDeleted ? disabledStyle : ""}`} 
                        />
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5">
                        <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>Bio</label>
                        <textarea 
                            name="bio"
                            rows="4"
                            disabled={isDeleted}
                            defaultValue={initialData?.bio}
                            placeholder="Tell us a bit about yourself..."
                            className={`${inputStyle} resize-none ${isDeleted ? disabledStyle : ""}`} 
                        />
                    </div>

                    {/* Action */}
                    {!isDeleted && (
                        <div className="pt-2 flex justify-start">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-10 py-3 bg-slate-900 text-white text-xs font-black rounded-2xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;