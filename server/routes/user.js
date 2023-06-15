const express = require("express");
const { getUser, updateUser, deleteUser } = require("../controllers/user");
const auth = require("../midddleware/auth");

const router = express.Router();

router.get("/me", auth, getUser);

router.put("/", auth, updateUser);

router.delete("/", auth, deleteUser);

module.exports = router;
