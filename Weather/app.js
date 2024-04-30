const express=require("express")
const app=express()
const https=require("https")
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req,res){

    const appiKey="a74fa9e1c328321eae97b76a6d3f83b2"
    const query=req.body.cityName
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+appiKey+"&units="+units+"&q="+query
    https.get(url,function(response){
        console.log(response)
    response.on("data",function(data){
        var weatherData=JSON.parse(data)
        console.log(weatherData)
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const iconName=weatherData.weather[0].icon
        const imgURL="https://openweathermap.org/img/wn/"+iconName+"@2x.png"
        console.log(weatherDescription)
        res.write("<h1>The wearther temperature id "+temp+"</h1>")
        res.write("<p>weather description is "+weatherDescription+"</p>")
        res.write("<img src="+imgURL+">")
        res.send()
        })
    })
})
app.listen(3000,function(){
    console.log("Server is running at port 3000")
})