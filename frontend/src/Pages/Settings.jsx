import { dummyProfileData } from "../Alldata";
import Loading from "../Components/Loading";
import { useState,useEffect } from "react";
import { LockIcon } from "lucide-react";
import ProfileForm from "../Components/ProfileForm";
import ChangePasswordModal from "../Components/payslips/ChangePasswordModal";

function Settings(){
    const [profile,setProfile]=useState(null);
    const [loading,setLoading]=useState(true);
    const [showPasswordModal,setShowPasswordModal]=useState(false)

    const fetchProfile=async()=>{
        setProfile(dummyProfileData)
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }

    useEffect(()=>{
        fetchProfile()
    },[])

    if(loading) return <Loading/>
    return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-1">
            <h1 className="font-bold text-2xl text-slate-900 tracking-tight">Settings</h1>
            <p className="text-slate-400 text-sm">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        {profile &&  <ProfileForm initialData={profile} onSucess={fetchProfile}/>}

        {/* Security Section */}
        <div className="space-y-3">
        
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <LockIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Password</p>
                        <p className="text-xs text-slate-500">Update your account password</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-1.5 text-xs font-bold
                     text-slate-700 bg-white border border-slate-200 rounded-md
                      hover:bg-slate-50 transition-all active:scale-95">
                    Change
                </button>
            </div>
            <ChangePasswordModal open={showPasswordModal}  onClose={()=>setShowPasswordModal(false)}/>
        </div>
    </div>
)
}
export default Settings;