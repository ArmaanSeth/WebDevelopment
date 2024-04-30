require("dotenv").config()
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")

// const encrypt=require("mongoose-encryption")
// const md5=require("md5")
// const bcrypt=require("bcrypt")
// const saltrounds=10

const passport=require("passport")
const passportLocalMongoose=require("passport-local-mongoose")
const session=require("express-session")

const GoogleStrategy=require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app=express()

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.connect("mongodb://0.0.0.0:27017/userDB",{useNewUrlParser:true})

const userSchema=new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
})

// Encryption
// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]})

// Cookies
userSchema.plugin(passportLocalMongoose); 
userSchema.plugin(findOrCreate)

const User=new mongoose.model("User",userSchema)

passport.use(User.createStrategy())

//  Cookies
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// OAUTH
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:"http://localhost:3000/auth/google/secrets"
    },
    function(accessToken,refreshToken,profile,cb){
    
        User.findOrCreate({googleId:profile.id},function(err,user){
            return cb(err,user)
        })
    }
))


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/',function(req,res){
    res.render('home')
});

app.get('/submit',function(req,res){
    if(req.isAuthenticated()){
        res.render("submit")
    }else{
        res.redirect("/login")
    }
})

// OAUTH
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

    
app.get('/login',function(req,res){
    res.render('login')
});

app.get('/register',function(req,res){
    res.render('register')
});

// Cookie
app.get('/secrets',function(req,res){
    if(req.isAuthenticated()){
        res.render("secrets")
    }else{
        res.redirect("/login")
    }
});

// OAUTH
app.get('/auth/google/secrets',
    passport.authenticate("google",{failureRedirect:"/login"}),
    function(req,res){
    res.redirect("/secrets")    
})

app.get("/logout",function(req,res){
    req.logout(function(err) {
        if(err){
             return next(err); 
        }else{
            res.redirect('/');
        }
      });
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/submit",function(req,res){
    const secret=req.body.secret
    console.log(req.user.id)
    User.findById(req.user.id).then((foundUser)=>{
        if(foundUser){
            foundUser.secret=secret
            foundUser.save().then(function(){
                res.redirect("/secrets")
            })
        }
    }).catch((err)=>{
        console.log(err)
    })

})

app.post('/register',function(req,res){
    // COOKIE
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log("ERROR:",err)
            res.redirect("/register")
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            }) 
        }
    })
    
    //BCRYPT
    // bcrypt.hash(req.body.password,saltrounds,function(err,hash){
    //     const newUser=new User({
    //         email:req.body.username,
    //         password:hash
    //     })
    //     newUser.save().then(function(){
    //         res.render("secrets");
    //     }).catch((error)=>{
    //         console.log(err)
    //     });
    // });
});

app.post("/login",function(req,res){
    // Cookie
    const user=new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            });
        }
    });
    
    // BCRYPT
    // username=req.body.username
    // password=req.body.password
    // User.findOne({email:username}).then((foundUser)=>{
    //     if(foundUser){
    //         bcrypt.compare(password,foundUser.password,function(err,result){
    //             if (result==true){
    //                 res.render("secrets")
    //             }else{
    //                 res.send("Wrong username or password")
    //             }
    //         })
    //     }
    // }).catch((err)=>{
    //     console.log(err)
    // })
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000,function(){
    console.log("Server started on port 3000")
})
