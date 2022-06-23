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
const { isAdmin } = require("../middlewares/isAdminMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, getAllUsers);
router.route("/login").post(authUser);
router.route("/delete/:_id").delete([protect, isAdmin], deleteUser);
router.route("/update").put([protect, isAdmin], updateUser);
router.route("/makeAdmin").put([protect, isAdmin], makeAdmin);

module.exports = router;
