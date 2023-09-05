const { Chat } = require("../models/chat");
const Users = require("../models/user");

const createChat = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).send("userId not provided");

    const user = await Users.findOne({ _id: userId });
    if (!user) return res.status(400).send("user doesn't exist");

    const chat = await Chat.findOne({
      users: {
        $all: [req.user_token_details._id, userId],
      },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .lean();

    if (chat) return res.status(200).send(chat);
    console.log(chat);

    const newChat = new Chat({
      users: [req.user_token_details._id, userId],
      chatName: "sender",
    });
    await newChat.save();
    await newChat.populate("users", "-password");

    return res.status(201).send(newChat);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getChats = async (req, res, next) => {
  const allChats = await Chat.find({
    users: { $elemMatch: { $eq: req.user_token_details._id } },
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .lean();

  return res.status(200).send(allChats);
};

module.exports = {
  createChat,
  getChats,
};
