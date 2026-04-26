import { Calendar1Icon, DollarSignIcon, FileTextIcon, LayoutGridIcon,
     MenuIcon, Settings, UserIcon, XIcon, LogOutIcon, 
     Loader2Icon} from "lucide-react";
import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { dummyProfileData } from "../Alldata";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function SideBar(){
    const {pathname}=useLocation();
    const[userName,setUserName]=useState("")
     const [mobileOpen,setMobileOpen]=useState(true);

     const{user,loading,logout}=useAuth();

     useEffect(()=>{
      api.get('/profile').then(({data})=>{
        if(data.firstName) setUserName(`${data.firstName}  ${data.lastName || " "} `.trim())
      })
     },[])
    //close the mobile menu when route changes
      useEffect(()=>{
        setMobileOpen(false)
     },[pathname])

     const role=user?.role;
     const navItems=[
        {name:"Dashboard",href:"/dashboard",icon:LayoutGridIcon},
        role==="ADMIN"?
        {name:"Employees",href:"/employees",icon:UserIcon}:
        {name:"Attendance",href:"/attendance",icon:Calendar1Icon},
        {name:"Leave",href:"/leave",icon:FileTextIcon},
        {name:"PaySlips",href:"/payslips",icon:DollarSignIcon},
        {name:"Settings",href:"/settings",icon:Settings}

    ]
    
    const handleLogOut=()=>{
        logout();
        window.location.href="/login"
    }

  const sidebarContent = (
  <div className="flex flex-col h-full bg-[#0f172a]">
    {/* Top Header Section */}
    <div className="w-full px-5 pt-6 pb-5 border-b border-white/10 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 p-2">
          <UserIcon className="text-white size-7" />
          <div className="flex flex-col">
            <p className="font-semibold text-white text-[13px]">Employee MS</p>
            <p className="text-[11px] font-medium text-slate-300">Management System</p>
          </div>
        </div>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1">
          <XIcon size={20} />
        </button>
      </div>
    </div>

    {/* Scrollable Area (Profile + Nav) */}
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {/* Profile Section */}
      <div className="px-5 py-4">
        {userName && (
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 ring-1 ring-white/10 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-semibold">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="text-[13px] font-medium text-slate-200 truncate">
                {userName}
                <p className="text-slate-500 text-[11px]">{role === "ADMIN" ? "Administrator" : "Employee"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="px-5">
        {loading?(
          <div className="text-slate-500 px-3 py-3 flex items-center gap-2">
            <Loader2Icon className="animate-spin w-4 h-4"/>
            <span className="text-sm">Loading....</span>
          </div>

        ): ( <>
         <p className="uppercase text-slate-500 font-semibold text-[10px] px-2 pb-2">Navigation</p>
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition text-[13px] font-medium
                  ${isActive ? "bg-blue-600/30 text-white border border-blue-500/30" : "text-slate-300 hover:bg-white/5 hover:text-white"}`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
        </>)
        
      
        
        }
        </div>
       
    </div>

    {/* Bottom Section: Log Out */}
    <div className="p-4 border-t border-white/10 mt-auto bg-slate-900/50">
      <button onClick={handleLogOut} className="flex px-4 py-2.5 w-full items-center gap-3 text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
        <LogOutIcon size={18} />
        Log Out
      </button>
    </div>
  </div>
)
return(
   
    <>
     {/*Button to open mobile menu */}
      <button onClick={()=>setMobileOpen(true)} 
      className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-slate-900 text-white rounded-lg
      shadow-lg border border-white/10">
        <MenuIcon size={20}/>
      </button>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/60
      backdrop-blur-sm z-40"  onClick={()=>setMobileOpen(false)}></div>} 
       {/*Sidebar for the Laptop screen*/}
       <aside className="hidden lg:flex flex-col h-full w-[280px] bg-[#0f172a] 
       border-r border-slate-900 shadow-xl transition-all duration-300">
        {sidebarContent}
       </aside>
        {/*Sidebar for the mobile screen */}
       <aside className={`lg:hidden fixed inset-y-0 left-0 h-full w-[280px] 
  z-50 bg-[#0f172a] border-r border-white/10 flex flex-col transform 
  transition-transform duration-300 ease-in-out
  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
  {sidebarContent}
</aside>
    
    </>

)
}
export default SideBar;