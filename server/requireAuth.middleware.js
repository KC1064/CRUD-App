const jwt = require("jsonwebtoken");
const User = require("./user.model");

const requireAuth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.Authorization;
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "No authentication token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Check token expiration
    if (Date.now() > decoded.exp) {
      return res.status(401).json({ message: "Token has expired" });
    }

    // Find user in database
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    
    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    }
    
    // Log error for debugging
    console.error("Auth middleware error:", error);
    // Send generic error response
    res.status(500).json({ 
      message: "Authentication error",
      error: error.message 
    });
  }
};

module.exports = requireAuth;
