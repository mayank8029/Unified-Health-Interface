const jwt = require("jsonwebtoken");

const authenticateDoctor = (req, res, next) => {
    try {
        // Retrieve the token from the 'Authorization' header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            // If no authorization header exists, deny access
            return res.status(401).json({ message: "Authorization token is missing." });
        }

        // Assuming the Authorization header is in the format: 'Bearer [token]'
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            // If no token is found after the Bearer keyword, deny access
            return res.status(401).json({ message: "Authorization token is malformed." });
        }

        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded.doctorId) {
            // If decoded token does not contain doctorId, deny access
            return res.status(401).json({ message: "Authorization token is invalid." });
        }

        // Attach doctorId to the request object
        req.doctorId = decoded.doctorId;
        next(); // Pass control to the next middleware function
    } catch (error) {
        console.error("Error during authentication:", error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired. Please log in again." });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = authenticateDoctor;