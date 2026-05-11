const Task = require("../models/Task");

exports.createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getTasks = async (req, res) => {

  try {

    const tasks = await Task.find();

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.updateTaskStatus = async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};