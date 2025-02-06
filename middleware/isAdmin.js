exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access Forbidden. Admins Only"
        })
    }
    next();
}