const Folders = require("../models/folder");
const { Chat } = require("../models/chat");
const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("../midddleware/asyncHandler");

const getUser = asyncHandler(async (req, res, next) => {
  const _id = req.user_token_details._id;

  const me = await Users.findOne({ _id })
    .select("-password")
    .populate("followers", "-following -bio -email -password")
    .populate("following", "-following -bio -email -password")
    .lean();
  if (!me) return res.status(400).send("User not found");

  res.status(200).send(me);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { name, username, bio } = req.body;

  const me = await Users.findOne({ _id: req.user_token_details._id });
  if (!me) return res.status(400).send({ msg: "User not found" });

  me.name = name;
  me.username = username;
  me.bio = bio;

  await me.save();

  const response = me.toObject();
  delete response.password;

  res.status(200).send(response);
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const me = await Users.findOne({ _id: req.user_token_details._id });
  if (!me) return res.status(400).send({ msg: "User not found" });

  await Folders.deleteMany({ user: me._id });
  await Chat.deleteMany({ users: { $elemMatch: { $eq: me._id } } });
  await me.delete();

  res.status(200).send(me);
});

const searchUser = asyncHandler(async (req, res, next) => {
  const user = req.query.user;
  let { allId, isProfile } = req.body;

  if (!Array.isArray(allId)) allId = [req.user_token_details._id];
  else allId.push(req.user_token_details._id);
  const selectFields = isProfile ? "-password" : "username";

  const data = await Users.find({
    username: new RegExp("^" + user, "i"),
    _id: { $nin: allId },
  })
    .select(selectFields)
    .limit(10)
    .lean();

  res.status(200).send(data);
});

const changePassword = asyncHandler(async (req, res, next) => {
  const me = await Users.findOne({ _id: req.user_token_details._id });
  if (!me) return res.status(400).send({ msg: "User not found" });

  const { oldP, newP } = req.body;

  const isCorrect = await bcrypt.compare(oldP, me.password);
  if (!isCorrect)
    return res.status(400).send({ msg: "your old password is not correct" });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(newP, salt);

  me.password = hashPassword;
  await me.save();

  res.status(200).send("your password changed Successfully");
});

const follow_unfollow = asyncHandler(async (req, res, next) => {
  const { id, isFollow } = req.body;

  const opponent = await Users.findOne({ _id: id });
  if (!opponent) return res.status(400).send({ msg: "User not found" });

  if (isFollow) {
    await Users.findByIdAndUpdate(req.user_token_details._id, {
      $addToSet: { following: id },
    });

    await Users.findByIdAndUpdate(id, {
      $addToSet: { followers: req.user_token_details._id },
    });
  } else {
    await Users.findByIdAndUpdate(req.user_token_details._id, {
      $pull: { following: id },
    });

    await Users.findByIdAndUpdate(id, {
      $pull: { followers: req.user_token_details._id },
    });
  }

  const me = await Users.findOne({ _id: req.user_token_details._id })
    .select("-password")
    .populate("followers", "-following -bio -email -password")
    .populate("following", "-following -bio -email -password")
    .lean();

  res.status(200).send(me);
});

const update_photo = asyncHandler(async (req, res, next) => {
  const { imgUrl } = req.body;

  const me = await Users.findOne({ _id: req.user_token_details._id });

  me.imgUrl = imgUrl;
  await me.save();

  res.status(200).send(imgUrl);
});

const getAnotherUser = asyncHandler(async (req, res, next) => {
  const { username } = req.params;

  const user = await Users.findOne({ username });
  if (!user) return res.status(400).send({ msg: "user not found" });

  res.status(200).send(user);
});

module.exports = {
  getUser,
  updateUser,
  changePassword,
  deleteUser,
  searchUser,
  follow_unfollow,
  update_photo,
  getAnotherUser,
};
