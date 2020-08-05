const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,function (){
    console.log("Server is Running...")
});

// app.get("/",function (req,res){
//     res.sendFile(__dirname+"/views/home.html");
// });

// app.use(express.static("public"));
//
// var counter = 0;
// app.get("/",function (req,res){
//     counter++;
//     res.send("Xin chao: "+counter);
// })
// app.get("/login", function (req,res){
//     let obj = {
//         name: "Le van A",
//         age: 18
//     }
//     res.send(obj);
// //     res.send("Day la trang login");
// // })
// app.use(express.static("public"));
// app.set("view engine","ejs");
// app.get("/",function (req,res){
//     // res.sendFile(__dirname+"/views/Assignment_13.ejs");
//     let title = "Dự báo thời tiết";
//     res.render("Assignment_13",{
//         title: title,
//         counter: counter,
//     });
// });
//
const fs = require("fs");
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/danh-muc",function (req,res){
    let cats = fs.readFileSync("data/data.json","UTF8")
    cats= JSON.parse(cats);
    res.sendFile(__dirname+"/views/fptshop.ejs");
    res.render("fptshop",{
        cats:cats,
    });
})
app.get("/chi-tiet/:sotrang", function (req,res){
    let ID = req.params.sotrang;
    let cats = fs.readFileSync("data/data.json","UTF8")
    cats= JSON.parse(cats);
    let count = 0;
    cats.map(e=>{
        count ++;
        if(e.id == ID){
            res.render("chitiet",{
                cat: e
            });
            count = 0;
        }
    })
    if(count >= cats.length){
        res.send("Khong tim thay");
    }
    // res.send(ID);
    // res.render("chitiet");
})