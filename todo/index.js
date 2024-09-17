 require("dotenv").config();
 const cors=require("cors");
 const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
const {connect,Schema, model} = require("mongoose");
const uri = process.env.URI;
connect(uri)
.then(()=>{
    console.log("connected");
})
.catch(()=>{
    console.log("Failed")
});
let  TodoSchema =new Schema({
    taskname:{
        type:String,
        required:true
    },
    time:String
})
let todo = model("task",TodoSchema);
app.post("/create-todo",async(req,res)=>{
    let {taskname,time}=req.body;
    let newTodo=todo({taskname,time});
    await newTodo.save();
    console.log(taskname,time);
    res.send("Succesful");

})
// app.post("/",(req,res)=>{
//     let NewTodos ={taskname,time};
// NewTodos =req.body;
// let newTodo =todo({taskname,time})
// newTodo.save();
//     res.send("success");
//     // console.log(req.body);

// })
 app.get("/todos",async(req,res)=>{
    const todos= await todo.find({});
    res.send(todos);
    // console.log("welcome followcome ventures");

 });
 app.get("/user",(req,res)=>{

 })
 app.get("/user/:id",(req,res)=>{

 })

 app.put("/todos/:id",async(req,res)=>{
    const todos = await todo.findByIdAndUpdate(req.params.id,req.body);
    console.log(todos)
    res.send(todos);
 });
 app.get("/todos/:id",async(req,res)=>{
    const todos = await todo.findById(req.params.id);
    res.send(todos);
 })
 app.delete("/todos/:id",async(req,res)=>{
    const todos = await todo.findByIdAndDelete(req.params.id);
    console.log(todos)
    res.send(todos);
 });

 


app.listen(5001,()=>{
    console.log("App is running on port 5001 ")
});