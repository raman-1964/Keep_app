const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  searchUser,
  changePassword,
} = require("../controllers/user");
const auth = require("../midddleware/auth");

const router = express.Router();

router.get("/me", auth, getUser);

router.put("/", auth, updateUser);

router.put("/change-password", auth, changePassword);

router.delete("/", auth, deleteUser);

router.get("/search", auth, searchUser);

module.exports = router;
