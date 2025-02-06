const task = require("../models/tasks")

exports.create = async (req, res) => {
    try {
        const taskCreate = await task.create({
            ...req.body,
            assignedBy: req.user._id
        })
        return res.status(200).json({
            message: "Task created successfully",
            success: 1,
            data: taskCreate
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.getFilters = async(req,res)=>{
    try {
        const {status, priority} = req.query;
        let filter ={user : req.user.id};
        if(status){
            filter.status = status
        }
        if(priority){
            filter.priority = priority
        }
        const filterTask = await task.find({...filter , assignedToId : req.user._id})
        .populate("assignedToId", "username").select("username status priority assignedToId");
        return res.status(200).json({
            message : "Task filtered by status",
            success : 1,
            data : filterTask
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.getAll = async (req, res) => {
    try {
        console.log(req.user);
        const allTask = await task.find({ assignedBy: req.user._id })
        if (!allTask) {
            return res.status(400).send("there is no task at a moment")
        }
        return res.status(200).json({
            message: "Task founded successfully",
            success: 1,
            data: allTask
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.getTaskByUser = async (req, res) => {
    try {
        const fetchTask = await task.find({ assignedToId: req.user._id })
        if (fetchTask.length === 0) {
            return res.status(200).send("No task allocated to you currently")
        }
        return res.status(200).json({
            message: "Your current task",
            success: 1,
            data: fetchTask
        })
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}

exports.getOne = async (req, res) => {
    try {
        const getTask = await task.findOne({ assignedToId: req.user._id, _id: req.params.id })
        if (!getTask) {
            return res.status(404).send("No task found")
        }
        return res.status(200).json({
            message: "Task found successfully",
            success: 1,
            data: getTask
        })
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}




exports.updateTask = async (req, res) => {
    try {
        const taskUpdate = await task.findOneAndUpdate({
            assignedToId: req.user._id,
            _id: req.params.id
        }, req.body, { new: true })
        if (!taskUpdate) {
            return res.status(404).send("Task not found")
        }
        return res.status(200).json({
            message: "Task updated successfully",
            success: 1,
            data: taskUpdate
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const taskDelete = await task.findOneAndDelete({ _id: req.params.id })
        if (!taskDelete) {
            return res.status(404).send("Task not found")
        }
        return res.status(200).json({
            message: "Task deleted successfully",
            success: 1,
            data: taskDelete
        })
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}

