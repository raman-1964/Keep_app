const Notes = require("../models/note");
const Users = require("../models/user");
const { validateUpdateUser } = require("../validate/user");

const getUser = async (req, res, next) => {
  try {
    const _id = req.user_token_details._id;
    const me = await Users.findOne({ _id }).select("-password").lean();
    if (!me) res.status(400).send("User not found");

    res.status(200).send(me);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const me = await Users.findOne();
    if (!me) res.status(400).send("User not found");

    const uUser = { ...req.body };
    const { error } = validateUpdateUser(uUser);
    if (error) res.send(error.details[0].message);

    me.set({ uUser });
    await me.save();

    res.status(200).send(me);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const me = await Users.findOne();
    if (!me) res.status(400).send("User not found");

    await Notes.deleteMany({ user: me._id });
    await me.delete();

    res.status(200).send(me);
  } catch (error) {
    console.log(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const { user } = req.query;

    const data = await Users.find({
      username: new RegExp("^" + user, "i"),
      _id: { $ne: req.user_token_details._id },
    })
      .select("username")
      .limit(15)
      .lean();

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, updateUser, deleteUser, searchUser };
