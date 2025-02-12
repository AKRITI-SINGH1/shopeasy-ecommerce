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
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      console.log("User does not exist with email:", email);
      return res.status(400).json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      console.log("Incorrect password for email:", email);
      return res.status(400).json({
        success: false,
        message: "Incorrect Password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.CLIENT_SECRET_KEY || "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    console.log("User logged in, token generated for:", checkUser.email);

    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
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
      message: "Some error occurred",
    });
  }
};

module.exports = { registerUser, loginUser };