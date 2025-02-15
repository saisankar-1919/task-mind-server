const Task = require("../models/Task");
const { AppError, asyncHandler } = require("./utils");

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user_id: req.user_id });
  res.json(tasks.reverse());
});

exports.createTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title?.trim() || !description?.trim()) {
    throw new AppError("Title and description are required", 400);
  }

  const newTask = await Task.create({
    user_id: req.user_id,
    title,
    description,
  });

  res
    .status(201)
    .json({ message: "Task created successfully!", data: newTask });
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) throw new AppError("Task not found", 404);

  res
    .status(200)
    .json({ message: "Task updated successfully!", data: updatedTask });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  if (!task) throw new AppError("Task not found", 404);

  res.json({ message: "Task deleted successfully" });
});
