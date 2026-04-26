import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { createPayslip, getPayslip, getPayslipId } from "../controllers/PaySlipController.js";
const paySlipRouter=Router();

paySlipRouter.get('/',protect,getPayslip);
paySlipRouter.post('/',protect,createPayslip);
paySlipRouter.get('/:id',protect,getPayslipId);

export default paySlipRouter