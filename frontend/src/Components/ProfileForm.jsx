import { User, AlertCircle, Loader2, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';

function ProfileForm({ initialData, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    
    const fileInputRef = useRef(null);
    const isDeleted = initialData?.isDeleted;

    useEffect(() => {
        if (initialData?.profileImage) {
            // Add a timestamp even on initial load to ensure we bypass old caches
            setImagePreview(`${initialData.profileImage}?t=${new Date().getTime()}`);
        }
    }, [initialData]);

    const handleInstantUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageLoading(true);
        setError("");
        setMessage("");

        // OPTIONAL: Show local preview immediately for instant feedback
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await api.post("/profile", formData);
            if (response.data.success) {
                // ADD TIMESTAMP HERE: This is the secret to making the "Change" button work
                const newUrl = `${response.data.employee.profileImage}?t=${new Date().getTime()}`;
                setImagePreview(newUrl);
                
                window.dispatchEvent(new Event("profileUpdated"));
                setMessage("Photo updated successfully!");
            }
        } catch (err) {
            setError("Upload failed. Check your connection or file size.");
            // Revert preview on failure
            setImagePreview(initialData?.profileImage || "");
        } finally {
            setImageLoading(false);
            // RESET INPUT: This allows you to pick the same file again if you delete it
            if (e.target) e.target.value = null; 
        }
    };

    const handleInstantRemove = async () => {
        if (!window.confirm("Remove profile photo?")) return;

        setImageLoading(true);
        setError("");
        setMessage("");

        const formData = new FormData();
        formData.append("removeImage", "true");

        try {
            const response = await api.post("/profile", formData);
            if (response.data.success) {
                setImagePreview("");
                window.dispatchEvent(new Event("profileUpdated"));
                setMessage("Photo removed.");
            }
        } catch (err) {
            setError("Failed to remove photo.");
        } finally {
            setImageLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        
        const formData = new FormData(e.currentTarget);
        formData.delete("profileImage"); 

        try {
            const response = await api.post("/profile", formData);
            if (response.data.success) {
                setMessage("Profile details saved!");
                onSuccess?.(); 
            }
        } catch (err) {
            setError(err.response?.data?.err || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-slate-900/5 outline-none transition-all";
    const disabledStyle = "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-100 shadow-none font-medium";

    return (
        <div className="w-full bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-slate-50 mb-10">
                <div className="relative group w-32 h-32">
                   <div className="w-full h-full rounded-[2rem] bg-slate-900 flex items-center justify-center overflow-hidden border-2 border-slate-200">
    {imageLoading ? (
        <Loader2 className="w-10 h-10 text-slate-400 animate-spin" />
    ) : (imagePreview && !imagePreview.includes('undefined')) ? (
        <img 
            src={imagePreview} 
            className="w-full h-full object-cover" 
            alt="Profile" 
            onError={(e) => e.target.style.display = 'none'} // Hides broken icon
        />
    ) : (
        <span className="text-3xl font-black text-white uppercase">
            {initialData?.firstName ? initialData.firstName.charAt(0) : 'P'}
        </span>
    )}
</div>
                </div>

                <div className="flex flex-col items-center sm:items-start flex-1">
                    <h4 className="text-base font-black text-slate-900 mb-1">Profile Picture</h4>
                    <p className="text-xs text-slate-400 mb-5">Click below to manage your photo. Changes save instantly.</p>
                    
                    <div className="flex flex-wrap gap-3">
                        <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={imageLoading || isDeleted}
                            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 shadow-lg shadow-slate-200"
                        >
                            <Upload size={14} /> {imagePreview ? "Change Photo" : "Upload Photo"}
                        </button>

                        {imagePreview && (
                            <button 
                                type="button" 
                                onClick={handleInstantRemove}
                                disabled={imageLoading || isDeleted}
                                className="flex items-center gap-2 px-6 py-2.5 bg-rose-50 text-rose-500 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all disabled:opacity-50"
                            >
                                <Trash2 size={14} /> Remove
                            </button>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleInstantUpload} 
                        className="hidden" 
                        accept="image/*" 
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                    <div className='w-full bg-rose-50 text-rose-700 p-4 rounded-2xl text-xs font-bold border border-rose-100 flex items-center gap-3 animate-in fade-in zoom-in'>
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}
                {message && (
                    <div className='w-full bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-xs font-bold border border-emerald-100 flex items-center gap-3 animate-in fade-in zoom-in'>
                        <CheckCircle2 className="w-4 h-4" /> {message}
                    </div>
                )}

                <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className="space-y-2">
                            <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>Name (ReadOnly)</label>
                            <input disabled value={`${initialData?.firstName || ''} ${initialData?.lastName || ''}`} className={`${inputStyle} ${disabledStyle}`} />
                        </div>
                        <div className="space-y-2">
                            <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>Email (ReadOnly)</label>
                            <input disabled value={initialData?.email || ''} className={`${inputStyle} ${disabledStyle}`} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1'>Personal Bio</label>
                        <textarea 
                            name="bio"
                            rows="4"
                            disabled={isDeleted}
                            defaultValue={initialData?.bio}
                            placeholder="Tell your story..."
                            className={`${inputStyle} resize-none ${isDeleted ? disabledStyle : ""}`} 
                        />
                    </div>

                    {!isDeleted && (
                        <div className="pt-4 flex justify-start">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-12 py-4 bg-slate-900 text-white text-xs font-black rounded-2xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 shadow-xl shadow-slate-200"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile Details"}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;