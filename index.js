const express = require("express");
const dbConnection = require("./config/db")
require('dotenv').config();
const app = express()
const port = process.env.PORT || 9000
const userRoutes = require("./routes/user")
const taskRoutes = require("./routes/task")

dbConnection.dbConnection()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.use("/user",userRoutes)
app.use("/task",taskRoutes)
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})