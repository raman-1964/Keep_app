const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    isFavorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    colorCode: {
      bg: String,
      txt: String,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", noteSchema);
module.exports = Notes;
