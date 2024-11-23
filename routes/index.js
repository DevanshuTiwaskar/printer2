var express = require('express');
var router = express.Router();
const userModel = require("./users")

const passport = require('passport');
// const flash = require('connect-flash')



const localStrategy = require('passport-local');  
/*Yeh code passport-local module ka ek hissa hai,
 jo user authentication ke liye use hota hai. 
passport module ke saath istemal karne se pehle, 
hum localStrategy ko passport-local module se import karte hain.*/

passport.use(new localStrategy(userModel.authenticate()));
/*passport.authenticate() function passport ke ek method hai
 jo hume authentication provide karta hai. Isme hum localStrategy 
 ka istemal kar rahe hain jo UserModel ka authenticate() method ko 
 use karta hai.
     Simple shabdon mein, yeh code Passport ke saath Local Strategy ko 
use karke user authentication implement karta hai.*/




router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  const data = new userModel({
    username: req.body.username,        //// ( username:) come from  user.js /// and  req.body.(username) come from register.ejs we set as name:username  
    password: req.body.password,
    contact: req.body.contact,
    
    /* Is code ka main uddeshya hai user ko register 
      karna aur phir usey authenticate karke profile page pe bhejna.*/

  })

  userModel.register(data, req.body.password)
  /*Yeh line mein userData ko ek user ke naye data ke roop mein register
  karta hai, aur req.body.password uss user ka password hota hai jo 
  client ne submit kiya hai.*/
 
  .then(function(registereduser){
   /*Yeh ek promise ka method hai. Jab userModel.register puri ho jata 
   hai, tab yeh wala function chalta hai.*/
 
   passport.authenticate("local")(req, res, function(){
     res.redirect("/profile");
     /*Yeh line user ko authenticate karta hai, agar woh local 
     strategy ka istemal kar raha hai. Agar authentication sahi 
     hota hai, toh phir yeh user ko /profile page pe redirect karta 
     hai.*/
   })
  }) 
 });
router.get('/profile',isLoggedIn , function(req, res,next) {
    res.render("profile")
});



 router.post('/login',passport.authenticate("local", {     //router.get it well give error 
  successRedirect: "/profile",
  failureRedirect:"/",

  // failureFlash: true,     /// for flash messages

}),function(res,req){
});
  
/* GET logout page */ 
router.get('/logout',function(req,res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

/* isloggedIn function */
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) { 
    return next();
  }
  res.redirect("/");
}

module.exports = router;
