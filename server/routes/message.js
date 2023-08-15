const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");

const {
  createMessage,
  getMessages,
  getUnseenMessages,
  seenMessages,
} = require("../controllers/message");

// Create  chat
router.post("/", [auth], createMessage);

// Geting all  chats
router.get("/", [auth], getMessages);

// Geting all unseen chats
router.get("/unseen", [auth], getUnseenMessages);

// pushing ur id in seenBy field unseen chats
router.put("/seen", [auth], seenMessages);

module.exports = router;
