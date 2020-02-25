const express = require('express');
const app = express();
const passport = require('passport')
const cookiePaser = require('cookie-parser')
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy
const port = 8081


app.use(express.urlencoded({extended: true}))
app.use(cookiePaser('mi ultra hiper secreto'))

app.use(session({
    secret: 'mi ultra hiper secreto',
    resave: true, // volver a guardar la session 
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new PassportLocal(function(username, password, done) { 
    
    if (username == 'prueba' && password == '123456789'){
            return done(null, {
                id: 1,
                name: 'Jonnathan'
            })
        } else {
            return done(null, false)
        }  
    }));

passport.serializeUser(function(user, done){
    done(null,user.id)
})  

passport.deserializeUser(function(id, done){
    done(null, {
        id: 1,
        name: 'Jonnathan'
    })
})

app.set('view engine', 'ejs');

app.get("/", (req, res, next)=>{
    //Si el usuario no inicio sessión se redirecciona desde aqui, 
    //Caso constrario ya puede ingresar a la pagina principal
    if (req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login")
    }
},// no inicio session
(req,res)=>{
   res.send("Servidor funcionando de manera correcta")
})


app.get("/login", (req,res)=>{
    res.render("login")
})

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));


app.listen(port,()=>{
    console.log("Servidor esta funcionando en el puerto: "+ port)
})