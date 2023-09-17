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
    res.redirect("/login")
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    // 1st  tyo email vayeko kohi hamro users tabe ma xa ki xainw 
    const userExists = await users.findAll({
        where: {
            email:email
        }
    })
    if(userExists.length > 0){
        //2nd password check garnu paryoo
       const ismatch = bcrypt.compareSync(password,userExists[0].password)
       console.log(ismatch)
       if(ismatch){
        res.send("you are looged in")
       }
       else{
        res.send("invalid email or password")
       }
    }
    else{
        res.send("user not exist")
    }
    //console.log(userExists)

 
    
})
app.listen(4000,()=>{
    console.log("nodejs project is running at port 4000")
})