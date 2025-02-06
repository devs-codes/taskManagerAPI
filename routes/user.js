const router = require("express").Router()
const user = require("../controller/user")
const { validateToken } = require("../middleware/auth")
const { isAdmin } = require("../middleware/isAdmin")

router.post("/sign-up", user.register)
router.post("/sign-in", user.login)
router.get("/getAllUser",validateToken,isAdmin,user.getAll)
router.get("/getOneUser/:id",validateToken,isAdmin,user.getOne)
router.put("/update/:id",validateToken,isAdmin, user.updateUser)
router.delete("/delete/:id",validateToken,isAdmin, user.deleteUser)

module.exports = router