const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    msg: {
      type: String,
      trim: true,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

const Message = new mongoose.model("Message", MessageSchema);

module.exports.Message = Message;
