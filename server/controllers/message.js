const { asyncHandler } = require("../midddleware/asyncHandler");
const { Chat } = require("../models/chat");
const { Message } = require("../models/message");

const createMessage = asyncHandler(async (req, res, next) => {
  const { chatId, msg } = req.body;
  if (!chatId) return res.status(400).send({ msg: "ChatId not provided" });

  const chat = await Chat.findOne({ _id: chatId });
  if (!chat) return res.send(400).send({ msg: "Given chatId doesn't exist" });

  const newMessage = new Message({
    sender: req.user_token_details._id,
    chat: chatId,
    seenBy: [req.user_token_details._id],
    msg,
  });
  await newMessage.save();
  await newMessage.populate("sender", "-password");
  await newMessage.populate("chat", "-password");
  await newMessage.populate("chat.users", "username");

  await Chat.updateOne({ _id: chatId }, { latestMessage: newMessage._id });

  return res.status(201).send(newMessage);
});

const getMessages = asyncHandler(async (req, res, next) => {
  const { chatId } = req.query;
  const count = await Message.find({ chat: chatId }).countDocuments();

  let totalPages = 1,
    currentPage = 1,
    skip = 0,
    limit = 0;
  if (req.query.limit) limit = parseInt(req.query.limit);
  if (limit > 0) totalPages = parseInt(Math.ceil(count / limit));
  if (req.query.page) {
    currentPage = parseInt(req.query.page);
    skip = (currentPage - 1) * limit;
    if (skip > count)
      return res.status(400).send({ msg: "page number too high" });
  }

  const allMessages = await Message.find({ chat: chatId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("sender", "-password")
    .lean();

  const resp_data = {
    prev: true,
    next: true,
    totalPages,
    currentPage,
    limit,
  };
  if (currentPage === 1) resp_data.prev = false;
  if (currentPage >= totalPages) resp_data.next = false;

  return res
    .status(200)
    .send({ allMessages: allMessages.reverse(), ...resp_data });
});

const getUnseenMessages = asyncHandler(async (req, res, next) => {
  const allChats = await Chat.find({
    users: { $elemMatch: { $eq: req.user_token_details._id } },
  }).lean();

  const response = [];
  for (const chat of allChats) {
    const message = await Message.find({
      chat: chat._id,
      seenBy: { $nin: [req.user_token_details._id] },
    }).populate("chat", "_id");
    response.push(...message);
  }

  return res.status(200).send(response);
});

const seenMessages = asyncHandler(async (req, res, next) => {
  let { messages_id, seenBy } = req.body;
  if (!seenBy) seenBy = req.user_token_details._id;

  await Message.updateMany(
    { _id: { $in: messages_id } },
    { $push: { seenBy: seenBy } }
  );

  return res.status(200).send("message seen by your receiver");
});

module.exports = {
  createMessage,
  getMessages,
  getUnseenMessages,
  seenMessages,
};
