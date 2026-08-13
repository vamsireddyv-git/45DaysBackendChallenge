import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateTokens.js';

export const refreshTokenAccess = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message : "refresh token missing"
        })
    }

    const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH);
    
    const newAccessToken = generateAccessToken(decoded.userId)

    res.json({
        accessToken : newAccessToken
    })
    }catch(error){
        return res.status(500).json({
            message : error.name
        })
    }
}