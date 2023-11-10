const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { validateCreateUser, validateLoginUser } = require("../validate/user");
const { asyncHandler } = require("../midddleware/asyncHandler");

const register = asyncHandler(async (req, res, next) => {
  const { username, name, email, password } = req.body;

  const valUser = { username, name, email, password };
  const { error } = validateCreateUser(valUser);
  if (error) return res.status(400).send(error.details[0].message);

  let newUser = await Users.findOne({ email });
  if (newUser)
    return res.status(400).send({ msg: "This email is already in used" });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  newUser = await new Users({
    username,
    name,
    email,
    password: hashPassword,
  });
  await newUser.save();

  const token = newUser.generateAuthToken();

  res.status(201).send({
    data: { ..._.pick(newUser, ["_id", "name", "username", "email"]) },
    token,
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;

  const valUser = { identifier, password };
  const { error } = validateLoginUser(valUser);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Users.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) return res.status(400).send({ msg: "User not found" });

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect)
    return res.status(400).send({ msg: "Email or password is not correct" });

  const token = user.generateAuthToken();

  res.status(200).send({
    data: { ..._.pick(user, ["_id", "name", "username", "email"]) },
    token,
  });
});

const suggestUserName = asyncHandler(async (req, res, next) => {
  const { username } = req.body;

  const user = await Users.findOne({ username });
  if (!user)
    return res
      .status(200)
      .send({ available: "success", suggestedUserName: [] });

  const characters = ["_", ".", "-", "#", "!", "$", "@"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const suggestedUserName = [];
  while (suggestedUserName.length < 3) {
    let usrname = username;
    if (Math.floor(Math.random() * 7) % 3 === 0)
      usrname =
        characters[Math.floor(Math.random() * 7)] +
        usrname +
        numbers[Math.floor(Math.random() * 10)];
    else if (Math.floor(Math.random() * 7) % 3 === 1)
      usrname =
        characters[Math.floor(Math.random() * 7)] +
        characters[Math.floor(Math.random() * 7)] +
        usrname +
        characters[Math.floor(Math.random() * 7)] +
        numbers[Math.floor(Math.random() * 10)];
    else
      usrname =
        characters[Math.floor(Math.random() * 7)] +
        usrname +
        numbers[Math.floor(Math.random() * 7)] +
        numbers[Math.floor(Math.random() * 10)];

    const usrnamePresentOrNot = await Users.findOne({ username: usrname });
    if (!usrnamePresentOrNot && !suggestedUserName.includes(usrname))
      suggestedUserName.push(usrname);
  }

  res.send({ available: "rejected", suggestedUserName });
});

module.exports = { register, login, suggestUserName };
