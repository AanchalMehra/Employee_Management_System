import { LockIcon, XIcon, Loader2 } from 'lucide-react';
import React from 'react'
import { useState } from 'react'
import api from '../../api/axios';

function ChangePasswordModal({open,onClose}) {
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState({type:"",text:""});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        setMessage({type:"",text:""})
        const formData=new FormData(e.currentTarget)
        const currentPassword=formData.get("currentPassword")
        const newPassword=formData.get("newPassword")
        try{
            const {data}=await api.post("/auth/change-password",{currentPassword,newPassword});
            if(!data.success) throw new Error(data.error||"Failed")
              setMessage({type:"success",text:"Password updated successfully"})
              e.target.reset();
       
        }
        catch(err){
            setMessage({type:"error",text:err.message})

        }
        finally{
            setLoading(false);
        }
    }

    if(!open) return null;
    
  return (
     <div onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            {/* Modal Body */}
            <div onClick={(e) => e.stopPropagation()}
             className=" relative bg-white w-full max-w-[400px] sm:w-[400px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors z-10"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="pr-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] leading-tight flex items-center gap-2">
              <LockIcon className="w-5 h-5 text-slate-400"/> Change Password
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium italic">
              Update your account security credentials
            </p>
          </div>

          {message.text && (
            <div className={`flex items-start gap-3 rounded-xl text-sm p-3 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}>
              <span>{message.text}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Current Password
            </label>
            <input 
              type="password" 
              name="currentPassword" 
              placeholder="••••••••"
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-[#5c51ef] outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              New Password
            </label>
            <input 
              type="password" 
              name="newPassword" 
              placeholder="••••••••"
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-[#5c51ef] outline-none transition-all text-sm"
            />
          </div>

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
              className="flex-[1.5] py-3 bg-[#5c51ef] hover:bg-[#4a41d4] text-white font-bold text-xs sm:text-[13px] rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </div>
        </form>
            </div>
        </div>
  )
}

export default ChangePasswordModal