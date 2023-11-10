const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  searchUser,
  changePassword,
  follow_unfollow,
  update_photo,
  getAnotherUser,
} = require("../controllers/user");
const auth = require("../midddleware/auth");

const router = express.Router();

router.get("/me", auth, getUser);

router.put("/", auth, updateUser);

router.get("/:username", getAnotherUser);

router.put("/change-password", auth, changePassword);

router.put("/photo", auth, update_photo);

router.post("/search", auth, searchUser);

router.post("/follow_unfollow", auth, follow_unfollow);

router.delete("/", auth, deleteUser);

module.exports = router;
