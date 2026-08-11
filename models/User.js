import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    }, 

    email : {
        type : String,
        unique  : true,
        required : true
    },

    password : {
        type : String,
    }
})

const User = mongoose.model("users",userSchema,"users");

export default User;