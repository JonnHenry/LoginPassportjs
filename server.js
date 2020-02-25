const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.json({
        "message": "Servidor funcionando de manera correcta"
    })
})



app.get("/login",(req,res)={

})

app.post("/login",(req,res)={

})


app.listen(8080,()=>{
    console.log("Servidor funcionando de manera correcta")
})