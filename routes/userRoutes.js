import express from 'express'
import { registerUser } from '../controllers/registerUser.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { loginUser } from '../controllers/login.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser);
userRouter.get("/profile",verifyToken, async (req , res) => res.json({
    message  : "Protected Profile accessed",
    userId :  req.user.userId
}))

export default userRouter;
