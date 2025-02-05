const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        trim : true,
        maxLength: 32,
        required : true,
        unique : true
    },
    password:{
        type : String,
        trim : true,
        minLength: 8,
        required : true,
    },
    role:{
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
})

userSchema.pre("save",async function (next) {
    try {
        if(!this.isModified("password")){
            next()
        }
        const hashPassword = await bcrypt.hash(this.password,10)
        this.password = hashPassword;
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model("user",userSchema)