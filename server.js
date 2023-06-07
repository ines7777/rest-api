const express=require('express')
const connectDB = require('./config/connectDB')
require("dotenv").config({path:"./config/.env"})

const User=require("./models/User")
const router=express.Router()

const app=express()


connectDB()

//routes
app.use("/api",router)
router.use(express.json())

//get
// localhost:5000/api/user
router.get("/user", async(req,res)=>{
    try {
        const users= await User.find({})
        res.status(200).json({message:"get all users", result:users})
        
    } catch (error) {
        console.log(error)
        res.status(504).json({Error:error})
        
    }
})


//post
// localhost:5000/api/user
router.post("/user", async(req,res)=>{
    try {
        const {name}=req.body
        const newUser= new User({name})
        const user= await newUser.save()

        
        res.status(201).json({message:"user saved", result:user})
        
    } catch (error) {
        console.log(error)
        res.status(504).json({Error:error})
        
    }
})

//put
// localhost:5000/api/user/:id
router.put("/user/:id", async(req,res)=>{
    try {
        const {id}=req.params
        const {name}=req.body
        await User.findByIdAndUpdate({_id:id},{$set: {name:name}})
        res.status(200).json({message:"user updated"})
    } catch (error) {
        res.status(500).json({message:"error"})
    }
})


//delete
// localhost:5000/api/user/:id
router.delete("/user/:id", async(req,res)=>{
    try {
       // const {id}=req.params
        
        await User.findByIdAndRemove(req.params.id)
        res.status(200).json({message:"user deleted"})
    } catch (error) {
        res.status(500).json({message:"error"})
    }
})




port=process.env.PORT

app.listen(port, (error)=>{
    error ? console.log(error) 
          : console.log(`listen on prt ${port}`)
})