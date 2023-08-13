const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = new mongoose.model("Chat", ChatSchema);

module.exports.Chat = Chat;
