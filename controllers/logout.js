import jwt from 'jsonwebtoken'
import userRouter from '../routes/userRoutes.js';
import User from '../models/User.js';


export const logout = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.decode(refreshToken);
            if(decoded?.userId){
                await User.findByIdAndUpdate(decoded.userId,{refreshHash : null, csrfTokenHash : null});

            }
        }
        res.clearCookie("refreshToken",{
            httpOnly : true,
            sameSite : "lax",
            secure  : false
        })
        res.json({
            message : "Logout successful"
        })
    }catch(error){
        res.status(500).json({
            message : "Logout Failed"
        })
    }
}