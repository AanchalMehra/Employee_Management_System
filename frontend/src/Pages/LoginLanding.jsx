
import LoginLeftSide from "../Components/LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function LoginLanding(){
    return(
        <div className="flex h-screen">
            <LoginLeftSide />

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100 gap-6 p-10 rounded-2xl shadow-md">
  
  <h2 className="text-2xl font-semibold text-gray-800">
    Select your portal to safely login
  </h2>

  <div className="flex flex-col w-full gap-5">
  {/* Admin Button */}
  <Link to="admin" className="group">
    <button className="relative flex justify-between items-center w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/30 overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl group-active:scale-95">
      {/* Glossy Overlay Effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <span className="text-lg font-medium tracking-tight">Admin Portal</span>
      <div className="bg-white/20 p-2 rounded-full transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight size={20} />
      </div>
    </button>
  </Link>

  {/* Employee Button */}
  <Link to="/employee" className="group">
    <button className="relative flex justify-between items-center w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl shadow-lg shadow-purple-500/30 overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl group-active:scale-95">
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <span className="text-lg font-medium tracking-tight">Employee Portal</span>
      <div className="bg-white/20 p-2 rounded-full transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight size={20} />
      </div>
    </button>
  </Link>
</div>

</div>
    </div>

    )
}
export default LoginLanding;