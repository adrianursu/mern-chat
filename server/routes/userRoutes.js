const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
  deleteUser,
  updateUser,
  makeAdmin,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, getAllUsers);
router.route("/login").post(authUser);
router.route("/delete/:_id").delete(deleteUser);
router.route("/update").put(updateUser);
router.route("/makeAdmin").put(makeAdmin);

module.exports = router;
