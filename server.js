const express=require('express')
const connectDB = require('./config/connectDB')
require("dotenv").config({path:"./config/.env"})

const User=require("./models/User")
const router=express.Router()

const app=express()


connectDB()

//routes
app.use("/api",router)

//get
// localhost:5001/api/user
router.get("/user", async(req,res)=>{
    try {
        const users= await User.find()
        res.status(200).json({message:"get all users", result:users})
        
    } catch (error) {
        res.status(504).json({Error:error})
        
    }
})


port=process.env.PORT

app.listen(port, (error)=>{
    error ? console.log(error) 
          : console.log(`listen on prt ${port}`)
})