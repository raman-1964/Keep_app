const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");

const { createMessage, getMessages } = require("../controllers/message");

// Create  chat
router.post("/", [auth], createMessage);

// Geting all  chats
router.get("/", [auth], getMessages);

module.exports = router;
