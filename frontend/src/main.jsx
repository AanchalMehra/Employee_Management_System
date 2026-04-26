import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navigate } from "react-router-dom";

import LoginLanding from './Pages/LoginLanding.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Attendance from './Pages/Attendance.jsx'
import Employees from './Pages/Employees.jsx'
import Settings from './Pages/Settings.jsx'
import Leave from './Pages/Leave.jsx'
import PaySlips from './Pages/PaySlips.jsx'
import Layout from './Pages/Layout.jsx'
import LoginForm from './Components/LoginForm.jsx'
import PrintPaySlips from './Pages/PrintPaySlips.jsx'
import { AuthProvider } from "./context/AuthContext.jsx"

const router = createBrowserRouter([
  {
        path: "login",
        element: <LoginLanding />},
        {
          path: "login/admin",
        element: <LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organization"/>
        },
        {
          path: "login/employee",
        element: <LoginForm  role="employee" title="Employee Portal" subtitle="Sign in to manage your account" />
        },

      
      {
  index: true,
  element: <Navigate to="/dashboard" replace />
},

  {
    path: "/",
    element: <Layout />,
    children: [
      
      

      { path: "dashboard", element: <Dashboard /> },
      { path: "leave", element: <Leave /> },
      { path: "attendance", element: <Attendance /> },
      { path: "employees", element: <Employees /> },
      { path: "payslips", element: <PaySlips /> },
      { path: "settings", element: <Settings /> },
      {path:"print/payslips/:id",element:<PrintPaySlips/>}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router}/>
    </AuthProvider>
    <Toaster/>
   
  </StrictMode>
);