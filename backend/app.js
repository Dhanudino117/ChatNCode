import dotenv from "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { connectDB } from "./Db/db.js"
import userRoutes from "./routes/user.routes.js"



const app = express()
connectDB()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/user' , userRoutes)



app.get("/", (req, res) => {
  res.send("🚀 Backend server is running!");
});


export default app