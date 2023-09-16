const express = require('express')
const { users } = require('./model/index')
const app = express()
app.set("view engine", "ejs")
const bcrypt = require("bcryptjs")


//database connection
require("./model/index")
//form bata ako data parse garnye means bujnye
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/register", (req,res)=>{
    res.render("register")
})
//post api for handling user registration
app.post("/register",async(req,res)=>{
    console.log(req.body)
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    //validation of the form
if(!email || !username || !password ){
    return res.send("please provide required field")
}
    await users.create({
        email : email,
        username : username,
        password : bcrypt.hashSync(password,8)
    })
    res.send("user register successfully")
})

app.listen(3000,()=>{
    console.log("nodejs project is running at port 3000")
})