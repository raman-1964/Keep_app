const Folders = require("../models/folder");
const Notes = require("../models/note");

const getFolders = async (req, res, next) => {
  try {
    const { type } = req.query;
    const folders = await Folders.find({
      admin: req.user_token_details,
      ...(type === "personal" ? { sharedTo: [] } : { sharedTo: { $ne: [] } }),
    });

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
    const _id = req.params.id;
    const { sharedTo } = req.body;

    const foundFolder = await Folders.findOne({ _id });
    if (!foundFolder)
      res.status(400).send({ msg: "There is no folder of this id" });

    const folder = await new findByIdAndUpdate(
      _id,
      { $set: { sharedTo } },
      { new: true }
    );

    res.status(201).send(folder);
  } catch (e) {}
};

const deleteFolder = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const foundFolder = await Folders.findOne({ _id });
    if (!foundFolder)
      res.status(400).send({ msg: "There is no folder of this id" });

    await Notes.deleteMany({ folder: _id });
    await foundFolder.deleteOne({ _id });

    res.status(200).send(foundFolder);
  } catch (e) {}
};

module.exports = { getFolders, createFolder, updateFolder, deleteFolder };
