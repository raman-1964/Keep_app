const Folders = require("../models/folder");
const { Chat } = require("../models/chat");
const Users = require("../models/user");
const bcrypt = require("bcryptjs");

const getUser = async (req, res, next) => {
  try {
    const _id = req.user_token_details._id;

    const me = await Users.findOne({ _id }).select("-password").lean();
    if (!me) return res.status(400).send("User not found");

    res.status(200).send(me);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, username, bio } = req.body;

    const me = await Users.findOne({ _id: req.user_token_details._id });
    if (!me) return res.status(400).send("User not found");

    me.name = name;
    me.username = username;
    me.bio = bio;

    await me.save();

    const response = me.toObject();
    delete response.password;

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const me = await Users.findOne({ _id: req.user_token_details._id });
    if (!me) return res.status(400).send("User not found");

    await Folders.deleteMany({ user: me._id });
    await Chat.deleteMany({ users: { $elemMatch: { $eq: me._id } } });
    await me.delete();

    res.status(200).send(me);
  } catch (error) {
    console.log(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    let { user, allId } = req.query;

    if (!Array.isArray(allId)) allId = [req.user_token_details._id];
    else allId.push(req.user_token_details._id);

    const data = await Users.find({
      username: new RegExp("^" + user, "i"),
      _id: { $nin: allId },
    })
      .select("username")
      .limit(15)
      .lean();

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const me = await Users.findOne({ _id: req.user_token_details._id });
    if (!me) return res.status(400).send("User not found");

    const { oldP, newP } = req.body;

    const isCorrect = await bcrypt.compare(oldP, me.password);
    if (!isCorrect)
      return res.status(400).send({ msg: "your old password is not correct" });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newP, salt);

    me.password = hashPassword;
    await me.save();

    res.status(200).send("your password changed Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  changePassword,
  deleteUser,
  searchUser,
};
