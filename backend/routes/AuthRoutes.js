import { Router } from "express";
import { changePassword, login, session } from "../controllers/AuthController.js";
import { protect } from "../middleware/auth.js";
const authRouter=Router();

authRouter.get('/session',protect,session);
authRouter.post('/login',login);
authRouter.post('/change-password',protect,changePassword);
 export default authRouter;