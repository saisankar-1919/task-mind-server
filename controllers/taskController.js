const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await Task.create({
      userId: req.userId,
      title,
      description,
    });
    res
      .status(201)
      .json({ message: "Task created successfully!", data: newTask });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "Task updated successfully!", data: newTask });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
