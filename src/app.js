
import express from 'express';
import http from "http";
import cors from "cors"
import  dbConnect from './config/dbConnect.js';
import userRoutes from './routes/userRouter.js'
import adminRoutes from './routes/adminRouter.js'
import dotenv from "dotenv";
dotenv.config()


const app=express()


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



dbConnect()
const PORT = process.env.PORT || 3000

const server = http.createServer(app)




app.use("/", userRoutes)

app.use("/admin", adminRoutes)


server.listen(PORT, () => {
  console.log(`server starts running at http://localhost:${PORT}`);

})