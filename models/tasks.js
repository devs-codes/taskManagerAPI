const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    description:{
        type : String,
    },
    status:{
        type : String,
        enum : ["To-Do","In-progess","Done"],
        default : "To-Do"
    },
    priority:{
        type : String,
        enum : ["Low","Medium","High"],
        default : "Medium"
    },
    assignedBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref  :"user",
    },
    assignedToId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
},{timestamps:true})

module.exports = mongoose.model("task",taskSchema)