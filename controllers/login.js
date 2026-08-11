import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


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

        const accessToken = await jwt.sign(
            { userId : user._id },
             process.env.JWT_SECRET,
            {expiresIn : "7d"}
        )

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