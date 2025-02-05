const router = require("express").Router();
const task = require("../controller/task");
const { validateToken } = require("../middleware/auth")

router.post("/create",validateToken,task.create)
router.get("/getAllTask",validateToken,task.getAll)
router.get("/getTask/:id",validateToken,task.getOne)
router.put("/update/:id",validateToken,task.updateTask);
router.delete("/delete/:id",validateToken,task.deleteTask)

module.exports = router;