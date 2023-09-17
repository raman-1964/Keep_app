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
  try {
    const count = await Chat.find({
      users: { $elemMatch: { $eq: req.user_token_details._id } },
    }).countDocuments();

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

    const allChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user_token_details._id } },
    })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("users", "-password")
      .populate("latestMessage")
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

    return res.status(200).send({ allChats, ...resp_data });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  createChat,
  getChats,
};
