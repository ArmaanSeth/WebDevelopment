const express=require("express")
const app=express()

app.get("/",function(request,response){
    response.send("<h1>Hello, World!!!<h1>")
})

app.get("/contact",function(req,res){
    res.send("contact me at seth.armaanseth@gmail.com")
})

app.get("/about",function(req,res){
    res.send("My name is Armaan Seth")
})

app.listen(3000,function(){
    console.log("Server started on port 3000")
});