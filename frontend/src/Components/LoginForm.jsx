import { ArrowLeft, Loader2Icon } from "lucide-react";
import { EyeIcon ,EyeOffIcon} from "lucide-react";

import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginForm({ role, title, subtitle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Add your login logic here
  };

  return (
    <div className="flex h-screen bg-white">

      {error&&(
        <div className="text-xs font-medium text-red-500 mt-1 animate-shake">
            {error}
        </div>
      )} 

      <LoginLeftSide />

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-50 p-12">
        <div className="w-full max-w-md">
          
          <Link to="/login">
            <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to portal</span>
            </button>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 capitalize">{title}</h1>
          <p className="text-gray-500 mt-2 mb-8">{subtitle}</p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
  <label htmlFor="password" underline className="text-sm font-semibold text-gray-700">
    Password
  </label>
  
  {/* Container must be relative */}
  <div className="relative">
    <input 
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••••••••••"
      required
      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
    />
    
    <button 
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
    >
      {showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/>}
    </button>
  </div>
</div>
            <button type="button"
            disabled={loading} 
            className="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-[0.98] transition">
              Sign In
              {loading &&(
                <Loader2Icon className="animate-spin h-4 w-4 mr-2"/>
              )}
            </button>
          </form>
          
        </div>
      </div>

      
    </div>
  );
}

export default LoginForm;