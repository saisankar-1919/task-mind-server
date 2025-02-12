const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("./utils");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res
      .status(201)
      .json({
        message: "User registered successfully",
        token: token,
        user: user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .json({ message: "Login successfully", token: token, user: user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
