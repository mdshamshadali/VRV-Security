const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role, status } = req.body;
  try {
    const newUser = await User.create({ name, email, password, role, status });
    z;
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, role, status } = req.body;

  if (!name || !email || !password || !role || !status) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // Check if the user already exists
  const existuser = await User.findOne({ email });

  if (existuser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
      role,
      status,
    });
    await newUser.save();
    res
      .status(201)
      .json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "An error occurred. Please try again." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This email does not exist." });

    const isMatch = password === user.password;
    if (!isMatch)
      return res.status(400).json({ msg: "Password is incorrect." });

    res.status(200).json({ msg: "Login successful", user });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occurred during login", error: err.message });
  }
};
