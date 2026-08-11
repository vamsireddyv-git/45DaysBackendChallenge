import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import connectDB from './config/connectDB.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))

app.use(express.json());

connectDB();

app.use("/user",userRouter)

const port = process.env.PORT
app.listen(port,() => console.log(`The server is Cooking hardly at port ${port}`))