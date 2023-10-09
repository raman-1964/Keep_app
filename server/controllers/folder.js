const Folders = require("../models/folder");
const Notes = require("../models/note");

const getFolders = async (req, res, next) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

const createFolder = async (req, res, next) => {
  try {
    const { name } = req.body;
    const _id = req.user_token_details._id;

    const folder = await new Folders({ name, admin: _id });
    await folder.save();

    res.status(201).send(folder);
  } catch (e) {
    console.log(e);
  }
};

const updateFolder = async (req, res, next) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

const deleteFolder = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const foundFolder = await Folders.findOne({ _id });
    if (!foundFolder)
      return res.status(400).send({ msg: "There is no folder of this id" });

    await Notes.deleteMany({ folder: _id });
    await foundFolder.deleteOne({ _id });

    res.status(200).send(foundFolder);
  } catch (e) {}
};

module.exports = { getFolders, createFolder, updateFolder, deleteFolder };
