const { Chat } = require("../models/chat");
const { Message } = require("../models/message");

const createMessage = async (req, res, next) => {
  try {
    const { chatId, msg } = req.body;
    if (!chatId) return res.status(400).send("chatId not provided");

    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) return res.send(400).send("given chatId doesn't exist");

    const newMessage = new Message({
      sender: req.user_token_details._id,
      chat: chatId,
      msg,
    });
    await newMessage.save();
    await newMessage.populate("sender", "-password");

    await Chat.updateOne({ _id: chatId }, { latestMessage: newMessage._id });

    return res.status(201).send(newMessage);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getMessages = async (req, res, next) => {
  const { chatId } = req.query;
  const allMessages = await Message.find({ chat: chatId })
    .populate("sender", "-password")
    .sort({ updatedAt: 1 })
    .lean();

  return res.status(200).send(allMessages);
};

module.exports = {
  createMessage,
  getMessages,
};
