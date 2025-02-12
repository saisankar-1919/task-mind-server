const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
  generateToken,
  AppError,
} = require("./utils");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError("User already exists", 400));

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await comparePassword(password, user.password))) {
      return next(new AppError("Invalid email or password", 400));
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
