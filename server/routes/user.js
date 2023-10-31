const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  searchUser,
  changePassword,
  follow_unfollow,
} = require("../controllers/user");
const auth = require("../midddleware/auth");

const router = express.Router();

router.get("/me", auth, getUser);

router.put("/", auth, updateUser);

router.put("/change-password", auth, changePassword);

router.delete("/", auth, deleteUser);

router.post("/search", auth, searchUser);

router.post("/follow_unfollow", auth, follow_unfollow);

module.exports = router;
