const express=require("express")
const app=express()

const bodyParser=require("body-parser")

app.use( bodyParser.urlencoded({extended:true}))

app.post("/",function(req,res){
    console.log(req.body)
    res.send("Thanks for posting")
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.listen(3000,function(){
    console.log("Server 3000 is running")
})
