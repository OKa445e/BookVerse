import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // If no token is provided, send an error response and return immediately
    if (token == null) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    // Verify the token
    jwt.verify(token, "book123", (err, user) => {
        if (err) {
            // If the token is invalid or expired, send an error response and return
            return res.status(403).json({ message: "Token expired, Please sign in again" });
        }

        // If token is valid, attach the user to the request object and proceed
        req.user = user;
        next();
    });
};
// middleware