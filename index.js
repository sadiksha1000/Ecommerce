const express=require("express")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to our online shop API")
})

const port=process.env.PORT || 90

app.listen(port,console.log("Server running on port 90"))