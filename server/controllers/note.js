const { asyncHandler } = require("../midddleware/asyncHandler");
const Folders = require("../models/folder");
const Notes = require("../models/note");
const validateNote = require("../validate/note");

const getNotes = asyncHandler(async (req, res, next) => {
  const count = await Notes.find({
    folder: req.query.folder,
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
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("isFavorite", "username -_id")
    .lean();

  notes.forEach((note) => {
    note.isFavorite = note.isFavorite?.map((fav) => fav.username);
  });

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
});

const createNote = asyncHandler(async (req, res, next) => {
  const { title, text, selectedColor, folder } = req.body;

  const { error } = validateNote({ title, text });
  if (error) return res.status(400).send({ msg: error.details[0].message });

  const savedNote = await new Notes({
    title,
    text,
    folder,
    colorCode: { ...selectedColor },
  });
  await savedNote.save();

  res.status(201).send(savedNote);
});

const updateNote = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;
  const { title, text, selectedColor } = req.body;

  const { error } = validateNote({ title, text });
  if (error) res.status(400).send({ msg: error.details[0].message });

  const foundNote = await Notes.findOne({ _id });
  if (!foundNote)
    return res.status(400).send({ msg: "There is no note of this id" });

  foundNote.title = title;
  foundNote.text = text;
  foundNote.colorCode = selectedColor;
  await foundNote.save();

  const ans = await Notes.findOne({ _id })
    .populate("isFavorite", "username -_id")
    .lean();
  ans.isFavorite = ans.isFavorite?.map((fav) => fav.username);

  res.status(200).send(ans);
});

const deleteNote = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;

  const foundNote = await Notes.findOne({ _id });
  if (!foundNote)
    return res.status(400).send({ msg: "There is no note of this id" });

  await foundNote.delete();

  res.status(200).send(foundNote);
});

const likeNote = asyncHandler(async (req, res, next) => {
  const _id = { ...req.body };

  const foundNote = await Notes.findOne({ _id });
  if (!foundNote)
    return res.status(400).send({ msg: "There is no note of this id" });

  foundNote.isFavorite = [...foundNote.isFavorite, req.user_token_details._id];
  await foundNote.save();

  const ans = await Notes.findOne({ _id })
    .populate("isFavorite", "username -_id")
    .lean();
  ans.isFavorite = ans.isFavorite?.map((fav) => fav.username);

  res.status(200).send(ans);
});

const removeLikeNote = asyncHandler(async (req, res, next) => {
  const _id = { ...req.body };

  const foundNote = await Notes.findOne({ _id });
  if (!foundNote)
    return res.status(400).send({ msg: "There is no note of this id" });

  const favourite = foundNote.isFavorite.filter(
    (id) => id != req.user_token_details._id
  );

  foundNote.isFavorite = favourite;
  await foundNote.save();

  const ans = await Notes.findOne({ _id })
    .populate("isFavorite", "username -_id")
    .lean();
  ans.isFavorite = ans.isFavorite?.map((fav) => fav.username);

  res.status(200).send(ans);
});

const getALlLikeNote = asyncHandler(async (req, res, next) => {
  const { type } = req.query;
  const query = {
    admin: req.user_token_details._id,
  };
  let folder;

  if (type === "PRS")
    folder = await Folders.find({ ...query, sharedTo: [] })
      .select("_id")
      .lean();
  else if (type === "SBY")
    folder = await Folders.find({ ...query, sharedTo: { $ne: [] } })
      .select("_id")
      .lean();
  else
    folder = await Folders.find({ sharedTo: { $in: [query.admin] } })
      .select("_id")
      .lean();

  const response = [];
  await Promise.all(
    folder.map(async (t) => {
      const note = await Notes.find({
        folder: t._id,
        isFavorite: {
          $in: [req.user_token_details._id],
        },
      })
        .sort({ createdAt: -1 })
        .select("title text colorCode -_id")
        .lean();
      response.push(...note);
    })
  );

  res.status(200).send(response);
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  getALlLikeNote,
  deleteNote,
  likeNote,
  removeLikeNote,
};
