const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
  authUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUsers).post(addUser);
router.post("/login", loginUser);
router.get("/me",protect, authUser);

router
  .route("/:id")
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
