const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const { createSecretToken } = require("../utils/createSecretToken.js");
// Register a new user
const register = async (req, res, next) => {
  try {
    const { username, email, password, cpassword } = req.body;
    if (!username || !email || !password || !cpassword) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUsername || existingEmail) {
      return res.status(400).json({ message: "User already exists" });
    } else if (password !== cpassword) {
      return res.status(400).json({ message: "Password are not match" });
    }
    const user = await User.create({
      username,
      email,
      password,
      verified: true,
    });
    const token = createSecretToken(user._id.toString());
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    next(error);
    console.error("Registration failed:", error);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const userData = {
      username: user.username,
      email: user.email,
      _id: user._id,
      verified: user.verified,
    };
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Login successful", token, userData });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

module.exports = { register, login };
