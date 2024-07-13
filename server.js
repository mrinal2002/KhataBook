const express=require('express');
const app=express();
const fs=require('fs');

const expressSession=require('express-session');
const cookie=require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(expressSession({
    resave:false,
    secret:"$@%FDS#",
    saveUninitialized:false
}))

app.set("view engine","ejs");

app.get("/",function(req,res,next){
    fs.readdir("./hissab",'utf-8',function(err,data){
        if(err) return res.status(500).send(err.message);
        res.render("index",{filename:data});
    })
})
app.post('/addtask',function(req,res,next){
    fs.writeFile(`./hissab/${req.body.name}.txt`,req.body.description,function(err){
        if(err) return res.status(404).send(err.message);
        res.redirect("/");
    })
})
app.get("/create",function(req,res,next){
    res.render("create");
})

app.get("/show/:filename",function(req,res,next){
    fs.readFile(`./hissab/${req.params.filename}`,'utf-8',function(err,data){
        if(err) return res.status(404).send(err.message);
        res.render("show",{filename:req.params.filename,description:data});
    })
})

app.get("/edit/:filename",function(req,res,next){
    fs.readFile(`./hissab/${req.params.filename}`,'utf-8',function(err,data){
        if(err) return res.status(404).send(err.message);
        res.render("edit",{filename:req.params.filename,description:data});
    })
})

app.post("/update",function(req,res,next){
    fs.writeFile(`./hissab/${req.body.name}.txt`,req.body.description,function(err){
        if(err) return res.status(404).send(err.message);
        res.redirect("/");
    })
})

app.get("/delete/:filename",function(req,res,next){
    fs.unlink(`./hissab/${req.params.filename}`,function(err){
        if(err) return res.status(404).send(err.message);
        res.redirect("/");
    })
})

app.listen(3000,(err)=>{
    console.log("server started at 3000 port")
});