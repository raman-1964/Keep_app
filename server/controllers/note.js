const Notes = require("../models/note");
const validateNote = require("../validate/note");

const getNotes = async (req, res, next) => {
  try {
    const count = await Notes.find({
      user: req.user_token_details,
    }).countDocuments();

    let totalPages = 1,
      skip = 0,
      limit = 0,
      currentPage = 1;

    if (req.query.limit) limit = parseInt(req.query.limit);
    if (limit > 0) totalPages = parseInt(Math.ceil(count / limit));
    if (req.query.page) {
      currentPage = parseInt(req.query.page);
      skip = (currentPage - 1) * limit;
      if (skip > count)
        return res.status(400).send({ msg: "page number too high" });
    }

    const notes = await Notes.find({ folder: req.query.folder })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-user")
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

    res.status(200).send({ notes, ...resp_data });
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, text, selectedColor, folder } = req.body;

    const { error } = validateNote({ title, text });
    if (error) return res.status(400).send(error.details[0].message);

    const savedNote = await new Notes({
      title,
      text,
      folder,
      colorCode: { ...selectedColor },
    });
    await savedNote.save();

    res.status(201).send(savedNote);
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { title, text, selectedColor } = req.body;

    const { error } = validateNote({ title, text });
    if (error) res.status(400).send(error.details[0].message);

    const foundNote = await Notes.findOne({ _id });
    if (!foundNote)
      res.status(400).send({ msg: "There is no note of this id" });

    // const id = req.user_token_details._id;

    const ans = await Notes.findByIdAndUpdate(
      _id,
      { title, text, colorCode: { ...selectedColor } },
      { new: true }
    );

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
    if (!foundNote)
      res.status(400).send({ msg: "There is no note of this id" });

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
