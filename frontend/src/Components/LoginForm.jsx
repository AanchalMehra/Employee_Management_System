import { ArrowLeft, Loader2Icon } from "lucide-react";
import { EyeIcon ,EyeOffIcon} from "lucide-react";

import LoginLeftSide from "./LoginLeftSide";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function LoginForm({ role, title, subtitle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const {login}=useAuth()
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      await login(email,password,role)
      navigate("/dashboard")
    }
    catch(err){
      toast.error(err.response?.data?.err || err.message ||"Login Failed");

    }
    finally{
      setLoading(false);
    }

  };

  return (
    <div className="flex min-h-screen bg-white">
      
      <LoginLeftSide />

      {/* RIGHT SIDE */}
<div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 min-h-screen md:min-h-0">        <div className="w-full max-w-md">
          
          <Link to="/login">
            <button className="flex items-center gap-2 text-slate-400 hover:text-[#0f172a] transition-all mb-10 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to portal</span>
            </button>
          </Link>

          <h1 className="text-3xl font-black text-[#0f172a] capitalize tracking-tight">{title}</h1>
          <p className="text-slate-500 mt-2 mb-10 text-lg">{subtitle}</p>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error&&(
              <div className="text-xs font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 animate-shake">
                  {error}
              </div>
            )} 

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f172a] focus:ring-4 focus:ring-slate-100 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
className="w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0f172a] focus:ring-4 focus:ring-slate-100 outline-none transition-all [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-password-toggle-button]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"                />
                
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0f172a] transition"
                >
                  {showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/>}
                </button>
              </div>
            </div>

            <button type="submit"
              disabled={loading} 
              className="mt-4 w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              {loading &&(
                <Loader2Icon className="animate-spin h-5 w-5"/>
              )}
              Sign In
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default LoginForm;