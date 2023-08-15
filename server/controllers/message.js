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
      seenBy: [req.user_token_details._id],
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

const getUnseenMessages = async (req, res, next) => {
  const allChats = await Chat.find({
    users: { $elemMatch: { $eq: req.user_token_details._id } },
  }).lean();

  const response = [];
  for (const chat of allChats) {
    const message = await Message.find({
      chat: chat._id,
      seenBy: { $nin: [req.user_token_details._id] },
    });

    response.push(...message);
  }

  return res.status(200).send(response);
};

const seenMessages = async (req, res, next) => {
  const { messages_id } = req.body;

  await Message.updateMany(
    { _id: { $in: messages_id } },
    { $push: { seenBy: req.user_token_details._id } }
  );

  return res.status(200).send("message seen by your receiver");
};

module.exports = {
  createMessage,
  getMessages,
  getUnseenMessages,
  seenMessages,
};
