const { asyncHandler } = require("../midddleware/asyncHandler");
const Folders = require("../models/folder");
const Notes = require("../models/note");

const getFolders = asyncHandler(async (req, res, next) => {
  const query = {
    admin: req.user_token_details._id,
  };

  const PRS = await Folders.find({ ...query, sharedTo: [] });
  const SBY = await Folders.find({
    ...query,
    sharedTo: { $ne: [] },
  }).populate("sharedTo", "username");
  const SBO = await Folders.find({
    sharedTo: { $in: [query.admin] },
  });

  const folders = { PRS, SBO, SBY };

  res.status(200).send({ folders });
});

const createFolder = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const _id = req.user_token_details._id;

  const folder = await new Folders({ name, admin: _id });
  await folder.save();

  res.status(201).send(folder);
});

const updateFolder = asyncHandler(async (req, res, next) => {
  let { _id, sharedTo } = req.body;

  const foundFolder = await Folders.findOne({ _id });
  if (!foundFolder)
    return res.status(400).send({ msg: "There is no folder of this id" });

  if (!Array.isArray(sharedTo))
    sharedTo = foundFolder.sharedTo.filter(
      (id) => id != req.user_token_details._id
    );

  foundFolder.sharedTo = sharedTo;
  await foundFolder.save();
  await foundFolder.populate("sharedTo", "username");

  res.status(200).send(foundFolder);
});

const deleteFolder = asyncHandler(async (req, res, next) => {
  const _id = req.params.id;

  const foundFolder = await Folders.findOne({ _id });
  if (!foundFolder)
    return res.status(400).send({ msg: "There is no folder of this id" });

  await Notes.deleteMany({ folder: _id });
  await foundFolder.delete();

  res.status(200).send(foundFolder);
});

module.exports = { getFolders, createFolder, updateFolder, deleteFolder };
