const Notes = require("../models/note");
const validateNote = require("../validate/note");

const getNotes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const count = await Notes.find({ user: req.user_token_details }).countDocuments();
    console.log(count);
    const notes = await Notes.find({ user: req.user_token_details })
      .select("-user")
      .lean();

    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const note = { ...req.body };

    const { error } = validateNote(note);
    if (error) return res.status(400).send(error.details[0].message);

    const _id = req.user_token_details._id;
    note.user = _id;

    const savedNote = await new Notes(note);
    await savedNote.save();

    res.status(201).send(savedNote);
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const note = { ...req.body };

    const { error } = validateNote(note);
    if (error) res.status(400).send(error.details[0].message);

    const foundNote = await Notes.findOne({ _id });
    if (!foundNote) res.status(400).send("There is no note of this id");

    const id = req.user_token_details._id;
    note.user = id;

    const ans = await Notes.findByIdAndUpdate(_id, note, { new: true });

    // await foundNote.updateOne(note, { new: true });
    // await foundNote.set({
    //   note,
    // });
    // await foundNote.save();

    res.status(200).send(ans);
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const foundNote = await Notes.findOne({ _id });
    if (!foundNote) res.status(400).send("There is no note of this id");

    await foundNote.deleteOne({ _id });

    res.status(200).send(foundNote);
  } catch (error) {
    console.log(error);
  }
};

const likeNote = async (req, res, next) => {
  try {
    const _id = { ...req.body };

    const foundNote = await Notes.findOne({ _id });
    if (!foundNote) res.status(400).send("There is no note of this id");

    const ans = await Notes.findByIdAndUpdate(
      _id,
      { isFavorite: true },
      { new: true }
    );

    res.status(200).send(ans);
  } catch (error) {
    console.log(error);
  }
};

const removeLikeNote = async (req, res, next) => {
  try {
    const _id = { ...req.body };

    const foundNote = await Notes.findOne({ _id });
    if (!foundNote) res.status(400).send("There is no note of this id");

    const ans = await Notes.findByIdAndUpdate(
      _id,
      { isFavorite: false },
      { new: true }
    );

    res.status(200).send(ans);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  likeNote,
  removeLikeNote,
};
