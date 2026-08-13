import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";


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
        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid email or password"
            })
        }

        const accessToken = generateAccessToken(user._id.toString())
        const refreshToken = generateRefreshToken(user._id.toString())

        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            maxAge : 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message : "Login successful",
            accessToken
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}