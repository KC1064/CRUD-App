const jwt = require("jsonwebtoken");
const User = require("./user.model");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = bcrypt.hashSync(password, 8);
    const user = await User.create({
      email,
      password: hashedPass,
    });

    // Create JWT token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ 
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ 
      message: "Error creating user",
      error: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password with hashed password
    const passMatch = bcrypt.compareSync(password, user.password);

    // Check if password matches
    if (!passMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Set token expiration (30 days from now)
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;

    // Create JWT token
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set authentication cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Send success response with user data
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    // Log error for debugging
    console.error("Login error:", error);
    // Send error response
    res.status(500).json({ 
      message: "Error during login",
      error: error.message 
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("Authorization", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const checkAuth = async (req, res) => {
  try {
    // The user is already attached to req by the requireAuth middleware
    // We just need to return the user information
    res.status(200).json({
      message: "Authenticated",
      user: {
        id: req.user._id,
        email: req.user.email
      }
    });
  } catch (error) {
    // Log error for debugging
    console.error("Auth check error:", error);
    // Send error response
    res.status(500).json({ 
      message: "Error checking authentication",
      error: error.message 
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
