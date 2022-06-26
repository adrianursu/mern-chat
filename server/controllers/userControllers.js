const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar, isAdmin } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params._id;
  await User.findByIdAndDelete(id).exec();
  res.send("user deleted");
});

const updateUser = asyncHandler(async (req, res) => {
  const newName = req.body.newName;
  const _id = req.body._id;

  try {
    await User.findById(_id, (error, userToUpdate) => {
      userToUpdate.name = newName;
      userToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }

  res.send("updated");
});

const makeAdmin = asyncHandler(async (req, res) => {
  const _id = req.body._id;

  try {
    await User.findById(_id, (error, userToUpdate) => {
      userToUpdate.isAdmin = true;
      userToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }

  res.send("updated admin");
});

module.exports = {
  registerUser,
  authUser,
  getAllUsers,
  deleteUser,
  updateUser,
  makeAdmin,
};
