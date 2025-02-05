const jwt = require("jsonwebtoken")

exports.validateToken = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing",
            });
        }

        const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
        if (!token) {
            return res.status(401).json({
                message: "Token is missing from Authorization header",
            });
        }
        
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user has admin role
        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Access forbidden. Admins only.",
            });
        }

        // Attach user info to request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    }catch (error) {
        console.error("Token verification failed:", error);

        // Handle specific JWT errors
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({
                message: "Invalid token",
            });
        } else if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                message: "Token has expired",
            });
        }

        // Generic error response
        return res.status(500).json({
            message: "Internal server error during token verification",
        });
    }
}