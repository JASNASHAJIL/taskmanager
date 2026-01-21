const Task = require("../models/task")
//create task
exports.createTask = async (req,res) => {
    if(!req.body.title)
        return res.status(400).json ({message :"task title required"})
      

    const task = await Task.create({
        title : req.body.title,
        user:req.user.id,
    });
    res.status(201).json(task)
};

//get tasks


exports.getTasks = async (req,res) => {
    const filter = req.query.completed;
    let query = {user:req.user.id};

    if(filter === "true")query.completed = true;
    if(filter === "false")query.completed = false;

    const tasks = await Task.find(query);
    res.json(tasks);
};


//update task


exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
};



//delete task

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  res.json({ message: "Task deleted successfully" });
};







