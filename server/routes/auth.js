const express = require("express");
const router = express.Router();
const { register, login, suggestUserName } = require("../controllers/auth");

router.post("/register", register);

router.post("/login", login);

router.post("/unique-user-name", suggestUserName);

module.exports = router;
