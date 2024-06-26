const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require('mongoose')

const app = express(); 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"))

mongoose.connect("mongodb://0.0.0.0:27017/wikiDB",{useNewUrlParser:true}).then(()=>console.log("Conected to database successfully!")).catch(err =>console.log("error="+err));

const articleSchema={
    title:String,
    content:String
}

const Article=mongoose.model("Article",articleSchema)

app.route("/articles")
.get(function(req,res){
    Article.find().then(articles=>{
        console.log(articles);
        res.send(articles)
    }).catch(err =>console.log("error="+err));
})
.post(function(req,res){
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save().then(()=>{
        res.send("Successfully added new article");
    }).catch(err=>console.log("error="+err));
})
.delete(function(req,res){
     Article.deleteMany().then(()=>console.log("Successfully deleted article")).catch(err=>console.log("error="+err));
});

app.route("/articles/:articleTitle")
.get(function(req,res){
    Article.findOne({title:req.params.articleTitle}).then(article=>{
        res.send(article)
    }).catch(err=>console.log("error:"+err))
})
.put(function(req,res){
    Article.updateMany(
        {title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content}).then(()=>res.send("Successfully updated article!")).catch(err=>res.send("error:"+err));
})
.patch(function(req,res){
    Article.updateMany(
        {title:req.params.articleTitle},
        {$set:req.body}).then(()=>res.send("Successfully updated article!")).catch(err=>res.send("error:"+err));
})
.delete(function(req,res){
    Article.deleteOne({title:req.params.articleTitle}).then(()=>res.send("Successfully deleted the article!")).catch(err=>res.send("error:"+err));
});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});