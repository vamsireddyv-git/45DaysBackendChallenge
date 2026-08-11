import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const registerUser = async (req , res) => {
    try{
        const { name , email , password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const isExists = await User.findOne({email : email});
        if(isExists){
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = await User.create({
            name,
            email,
            password : hashedPassword
        })

        await newUser.save();

        res.status(201).json({
            success : true,
            message : "User registered successfully"
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}