import { Router } from "express";
import { createEmployees, deleteEmployees, getEmployees, updateEmployees } from "../controllers/EmployeeController";
import { protect, protectAdmin } from "../middleware/auth";
const employeeRouter=Router();

employeeRouter.get('/',protect,protectAdmin,getEmployees);
employeeRouter.post('/',protect,protectAdmin,createEmployees);
employeeRouter.put('/:id',protect,protectAdmin,updateEmployees);
employeeRouter.delete('/:id',protect,protectAdmin,deleteEmployees);

export default employeeRouter