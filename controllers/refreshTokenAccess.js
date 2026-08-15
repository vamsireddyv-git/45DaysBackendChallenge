import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken, hashToken } from '../utils/generateTokens.js';
import User from '../models/User.js';

export const refreshTokenAccess = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message : "refresh token missing"
        })
    }

    const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH);
    
    const user = await User.findById(decoded.userId);
    if(!user){
        return res.status(401).json({
            success : false,
            message : "User not found"
        })
    }
    const newRefreshHash = hashToken(refreshToken);

    if(newRefreshHash !== user.refreshHash){
        return res.status(401).json({
            success : false,
            message : "Ïnvalid refresh Token"
        })
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);
    user.refreshHash = newRefreshHash;

    await user.save();
    
    res.cookie("refreshToken",newRefreshToken,{
       httpOnly : true,
       secure : false,
       sameSite : "lax",
       maxAge : 7 * 24 * 60 * 60 * 1000
    }) 

    res.json({
        accessToken : newAccessToken
    })
    }catch(error){
        return res.status(500).json({
            message : error.name
        })
    }
}