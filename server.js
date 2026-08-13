import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import connectDB from './config/connectDB.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from  'cookie-parser'
import refreshRouter from './routes/refreshRoutes.js';

const app = express();



app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))

connectDB();

app.use("/user",userRouter)
app.use("/auth",refreshRouter)

const port = process.env.PORT
app.listen(port,() => console.log(`The server is Cooking hardly at port ${port}`))