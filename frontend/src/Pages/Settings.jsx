import { dummyProfileData } from "../Alldata";
import Loading from "../Components/Loading";
import { useState, useEffect } from "react";
import { LockIcon } from "lucide-react";
import ProfileForm from "../Components/ProfileForm";
import ChangePasswordModal from "../Components/payslips/ChangePasswordModal";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

function Settings() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const {user}=useAuth();

  const fetchProfile = async () => {
    try{
      const res= await api.get("/profile")
      const profile=res.data;
      if(profile) setProfile(profile)


    }
    catch(err){
      toast.error(err?.response?.data?.err ||err.message)

    }
    finally{
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchProfile()
  }, [user])

  if (loading) return <Loading />
  
  return (
    <div className="w-full max-w-5xl mx-auto pt-1 pb-4 md:pt-2 md:p-4 space-y-6 overflow-x-hidden">      
      {/* Header Section */}
      <div className="space-y-1 px-1">
        <h1 className="font-semibold text-2xl text-slate-900 ">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Section - Ensure ProfileForm uses w-full internally */}
      <div className="w-full">
        {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}
      </div>

      {/* Security Section */}
      <div className="space-y-3">
        {/* Changed justify-between to flex-wrap for responsiveness */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
          
          <div className="flex items-center gap-3 min-w-[200px]">
            <div className="flex-shrink-0 p-2 bg-slate-100 rounded-lg">
              <LockIcon className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Password</p>
              <p className="text-xs text-slate-500">Update your account password</p>
            </div>
          </div>
          
          {/* Button is now w-full on tiny screens, auto on larger */}
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="w-full sm:w-auto px-6 py-2 text-xs font-bold
                       text-slate-700 bg-white border border-slate-200 rounded-xl
                       hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
          >
            Change Password
          </button>
        </div>
        
        <ChangePasswordModal 
          open={showPasswordModal} 
          onClose={() => setShowPasswordModal(false)} 
        />
      </div>
    </div>
  )
}

export default Settings;