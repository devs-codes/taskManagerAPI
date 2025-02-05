const router = require("express").Router()
const user = require("../controller/user")
const { validateToken } = require("../middleware/auth")

router.post("/sign-up", user.register)
router.post("/sign-in",user.login)
router.get("/getAllUser", validateToken, user.getAll)
router.get("/getOneUser/:id", validateToken, user.getOne)
router.put("/update/:id", validateToken, user.updateUser)
router.delete("/delete/:id", validateToken, user.deleteUser)

module.exports = router