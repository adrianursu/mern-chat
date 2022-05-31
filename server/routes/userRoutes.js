const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, getAllUsers);
router.route("/login").post(authUser);
router.route("/delete/:userEmail").delete(deleteUser);

module.exports = router;
