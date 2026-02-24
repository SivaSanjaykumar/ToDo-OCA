const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/schema.js")


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// GET All Todos
app.get("/todos",async(req,res)=>{
    try {
        const todos = await Todo.find().sort({createdAt:-1});
        res.json(todos);

    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
   }) 


//POST all the New todos
app.post("/todos",async(req,res)=>{
    console.log("POST route hit");
try {
   const newTodo = new Todo({
    task:req.body.task,
    completed:false,
   });
   await newTodo.save();
   res.status(201).json(newTodo);
} catch (error) {
    res.status(404).json({message:"Error Creating todo"})
}
});

//DELETE TODOS

app.delete("/todos/:id",async(req,res)=>{

    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({message:"message Deleted!!!"})
    } catch (error) {
        res.json({message:"Error in Code!!!"})
    }
})

//TOGGLE COMPLETE

app.put("/todos/:id",async(req,res)=>{
try {
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        return res.status(404).json({message:"message Not Found"});
    }
    todo.completed=!todo.completed;
    await todo.save();

    res.json(todo);
} catch (error) {
    res.status(500).json({ message: "Error updating" });
}
});

app.listen(5000,()=>{
    console.log("Server is running on 5000 Port....");
    
});


