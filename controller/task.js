const task = require("../models/tasks")

exports.create = async (req, res) => {
    try {
        const taskCreate = await task.create(req.body)
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

exports.getAll = async (req, res) => {
    try {
        const allTask = await task.find({createdBy : req.user._id}).select("-_id -__v")
        if (!allTask) {
            return res.status(400).send("there is no task at a moment")
        }
        return res.status(200).json({
            message : "Task founded successfully",
            success : 1,
            data : allTask
        })
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}

exports.getOne = async(req,res)=>{
    try {
        const getTask = await task.findOne({_id : req.params.id})
        if(!getTask){
            return res.status(404).send("No task found")
        }
        return res.status(200).json({
            message : "Task found successfully",
            success : 1,
            data : getTask
        })
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}

exports.updateTask = async(req,res)=>{
    try {
        const taskUpdate = await task.findOneAndUpdate({_id : req.params.id},req.body,{new:true})
        if(!taskUpdate){
            return res.status(404).send("Task not found")
        }
        return res.status(200).json({
            message : "Task updated successfully",
            success : 1,
            data : taskUpdate
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}touch

exports.deleteTask = async(req,res)=>{
    try {
        const taskDelete = await task.findOneAndDelete({_id : req.params.id})
        if(!taskDelete){
            return res.status(404).send("Task not found")
        }
        return res.status(200).json({
            message : "Task deleted successfully",
            success : 1,
            data : taskDelete
        })
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}

