const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { validateCreateUser, validateLoginUser } = require("../validate/user");

const register = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;

    const valUser = { username, name, email, password };
    const { error } = validateCreateUser(valUser);
    if (error) return res.status(400).send(error.details[0].message);

    let newUser = await Users.findOne({ email });
    if (newUser) res.status(400).send({ msg: "This email is already in used" });

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
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const valUser = { email, password };
    const { error } = validateLoginUser(valUser);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await Users.findOne({ email });

    if (!user) res.status(400).send({ msg: "user not found" });

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      res.status(400).send({ msg: "email or password is not correct" });

    const token = user.generateAuthToken();

    res.status(200).send({
      data: { ..._.pick(user, ["_id", "name", "username", "email"]) },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
