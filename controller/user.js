const user = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { username } = req.body;
        const findUser = await user.findOne({ username })
        if (findUser) {
            return res.status(400).send("Username already taken")
        }
        const registerUser = await user.create(req.body)
        const token = jwt.sign({ _id: registerUser.id, role: registerUser.role }, process.env.JWT_SECRET)
        return res.status(200).json({
            message: "user register successfully",
            success: 1,
            token: `Bearer ${token}`,
            data: registerUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await user.findOne({ username });
        if (!findUser) {
            return res.status(404).send("username doesn't exist")
        }
        const isMatch = await bcrypt.compare(password, findUser.password)
        if (!isMatch) {
            return res.status(404).send("Invalid credentials")
        }
        const token = jwt.sign({ _id: findUser.id, role: findUser.role }, process.env.JWT_SECRET)
        return res.status(200).json({
            message: "User login successfully",
            success: 1,
            token: `Bearer ${token}`,
            data: findUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.getAll = async (req, res) => {
    try {
        const getAllUsers = await user.find().select("-_id -__v")
        if (getAllUsers.length === 0 ) {
            return res.status(404).send("No user at a moment")
        }
        return res.status(200).json({
            message: "users found successfully",
            success: 1,
            data: getAllUsers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.getOne = async (req, res) => {
    try {
        const getUser = await user.findOne({ _id: req.params.id })
        if (!getUser) {
            return res.status(404).send("No user found")
        }
        return res.status(200).json({
            message: "User found successfully",
            success: 1,
            data: getUser
        })
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userUpdate = await user.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if(!userUpdate){
            return res.status(404).send("No user found")
        }
        return res.status(200).json({
            message : "User updated successfully",
            success : 1,
            data : userUpdate
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        const userRemove = await user.findOneAndDelete({_id : req.params.id})
        if(!userRemove){
            return res.status(404).send("No user found")
        }
        return res.status(200).json({
            message : "User deleted successfully",
            success : 1,
            data : userRemove
        })
    } catch (error) {
        
    }
}