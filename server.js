const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const txtPath = path.join(__dirname,"data.txt");

app.use(express.json());
// 静态页面
app.get("/",(req,res)=>res.sendFile(path.join(__dirname,"chat.html")));

// 读取txt聊天记录
app.get("/get",(req,res)=>{
    if(!fs.existsSync(txtPath)) return res.json([]);
    let txt = fs.readFileSync(txtPath,"utf-8");
    let list = txt.split("\n").filter(v=>v).map(JSON.parse);
    res.json(list);
})

// 新增消息写入data.txt
app.post("/send",(req,res)=>{
    let {name,content} = req.body;
    let data = {
        name,
        content,
        time:new Date().toLocaleString()
    }
    fs.appendFileSync(txtPath,JSON.stringify(data)+"\n","utf-8");
    res.end("ok");
})

app.listen(port,()=>{
    console.log(`聊天室运行：http://localhost:${port}`);
})