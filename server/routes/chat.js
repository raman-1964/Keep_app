const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");

const { createChat, getChats } = require("../controllers/chat");

// Create  chat
router.post("/create", [auth], createChat);

// Geting all  chats
router.get("/", [auth], getChats);

module.exports = router;
