import { Calendar1Icon, DollarSignIcon, FileTextIcon, LayoutGridIcon,
     MenuIcon, Settings, UserIcon, XIcon, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { profile } from "../data";
import { NavLink } from "react-router-dom";

function SideBar(){
    const {pathName}=useLocation();
    const[userName,setUserName]=useState("")
     const [mobileOpen,setMobileOpen]=useState(true);

     useEffect(()=>{
        setUserName(profile.firstName + ""+ profile.lastName)
     },[])
    //close the mobile menu when route changes
      useEffect(()=>{
        setMobileOpen(false)
     },[pathName])

     const role=""||"ADMIN"
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
        window.location.href="/login"
    }

  const sidebarContent=(
    <>
    <div className="flex flex-col w-full h-full"> 
        
        {/* Top Header Section with the white line you wanted */}
        <div className="w-full px-5 pt-6 pb-5 border-b border-white/10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 p-2">
                    <UserIcon className="text-white size-7"/>
                    <div className="flex flex-col w-full">
                        <p className="font-semibold text-white text-[13px]">Employee MS</p>
                        <p className="text-[11px] font-medium text-slate-300">Management System</p>
                    </div>
                </div>
                {/* Close button on mobile */}
                <button onClick={()=>setMobileOpen(false)}
                    className="lg:hidden text-slate-400 hover:text-white p-1">
                    <XIcon size={20}/>
                </button>
            </div>
        </div>

        {/* Profile Section - Now lives below the white line */}
        <div className="px-5 py-4"> 
            { userName && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 ring-1 ring-white/10 flex items-center justify-center">
                           <span className="text-white text-xs font-semibold">
                            {userName.charAt(0).toUpperCase()}
                           </span>
                       </div>
                       <div className="text-[13px] font-medium text-slate-200">
                        {userName}
                        <p className="text-slate-500 text-[11px]">{role==="ADMIN"?"Administrator":"Employee"}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="pt-6 px-2 pb-2">
                <p className="uppercase text-slate-500 font-semibold text-[10px]">Navigation</p>
            </div>
            <div className="overflow-y-auto flex-1 px-3 space-y-0.5"> 
                     <nav>
  {navItems.map((item, index) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={index}
        to={item.href}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition 
          ${isActive 
            ? "bg-blue-600/30 text-white border border-blue-500/30"
            : "text-slate-300 hover:bg-white/5 hover:text-white"}`
        }
      >
        <Icon size={18} />
        <span>{item.name}</span>
      </NavLink>
    );
  })}
</nav>
            </div>

           
        </div>
        
    </div>

     <div className="p-3 border-t border-white/6 mt-auto">
        <button onClick={handleLogOut}
        className="flex px-3 py-2 w-full items-center gap-3 text-[13px]
         font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-600/8 transition-all duration-300">
        <LogOutIcon className="w-[17px] h-[17px]"/>
        Log Out
        </button>
     </div>

    </>
    
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
       <aside className={`lg:hidden fixed inset-y-0 left-0  h-full w-36
       text-white  bg-blue-500 border border-white/4 flex flex-col transform
        transition-transform duration-300
       ${mobileOpen?"translate-x-0": "-translate-x-full"

       }`}>
        {sidebarContent}
       </aside>
    </>

)
}
export default SideBar;