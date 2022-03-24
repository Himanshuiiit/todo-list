const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["one","two","three"];
let workList = [];

app.get("/",(req,res)=>{
    let date = new Date();
    let currentDay = date.getDay();
    let option = {
        weekday:"long",
        day:"numeric", 
        month:"long"
    };
    
    let day = date.toLocaleDateString("en-US",option);
    res.render("list",{title:day,newItems:items});
});

app.post("/",(req,res)=>{
    let item = req.body.item;
    if(req.body.list==="Work"){
        workList.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work",function(req,res){
    res.render("list",{title:"Work List",newItems:workList});
});

app.listen(3000,()=>{
    console.log("app is running on port 3000");
})