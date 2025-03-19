const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Register
const registerUser = async (req, res) => {
  console.log("=== Register User Called ===");
  console.log("Request Body:", req.body);

  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      console.log("User already exists for email:", email);
      return res.status(400).json({
        success: false,
        message: "User already exists with that email! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    console.log("New user saved to database:", newUser);

    return res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error("Error during registration:", e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Login
const loginUser = async (req, res) => {
  console.log("=== Login User Called ===");
  console.log("Request Body:", req.body);

  const { email, password } = req.body;

  try {
    // Check if user exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      console.log("User does not exist with email:", email);
      return res.status(400).json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    // Verify password - remove duplicate checks
    const isValid = await bcrypt.compare(password, checkUser.password);
    if (!isValid) {
      console.error("Incorrect password for email:", email);
      return res.status(401).json({
        success: false,
        message: "Incorrect Password! Please try again",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY", // Better to use JWT_SECRET
      { expiresIn: "60m" }
    );

    console.log("User logged in, token generated for:", checkUser.email);

    // Set cookie and send response
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000 // 1 hour to match token expiry
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          username: checkUser.username,
        },
      });
  } catch (e) {
    console.error("Error during login:", e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };