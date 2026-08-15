import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateCsrfToken, generateRefreshToken, hashToken } from "../utils/generateTokens.js";


export const loginUser = async (req , res) => {
    try{

        const { email , password } = req.body;

        if(!email || !password) {
            return res.status(401).json({
                success : false,
                message : "Enter valid details"
            })
        }

        const user = await User.findOne({email : email})
        if(!user){
            return res.status(404).json({
                success : false,
                message : "Cannot find the user"
            })
        }
        const isPasswordMatch = bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid email or password"
            })
        }

        const accessToken = generateAccessToken(user._id.toString())
        const refreshToken = generateRefreshToken(user._id.toString())
        const csrfToken = generateCsrfToken();

        user.refreshHash = hashToken(refreshToken);
        user.csrfTokenHash = hashToken(csrfToken);

        await user.save();

        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            secure : false,
            sameSite : "lax",
            maxAge : 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message : "Login successful",
            accessToken,
            csrfToken
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}