const router = require("express").Router();
const task = require("../controller/task");
const { validateToken } = require("../middleware/auth")
const {isAdmin} = require("../middleware/isAdmin")

router.post("/create",validateToken,isAdmin,task.create)
router.get("/get-all-task",validateToken,isAdmin,task.getAll)
router.get("/get-user-tasks",validateToken,task.getTaskByUser)
router.get("/get-task/:id",validateToken,task.getOne)
router.put("/update/:id",validateToken,task.updateTask);
router.delete("/delete/:id",validateToken,isAdmin,task.deleteTask)
router.get('/filter',validateToken,task.getFilters);

module.exports = router;