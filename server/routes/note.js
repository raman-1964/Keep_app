const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  likeNote,
  removeLikeNote,
  getALlLikeNote,
} = require("../controllers/note");

const auth = require("../midddleware/auth");

router.get("/", auth, getNotes);

router.get("/like", auth, getALlLikeNote);

router.post("/", auth, createNote);

router.put("/:id", auth, updateNote);

router.delete("/:id", auth, deleteNote);

router.post("/add-like", auth, likeNote);

router.post("/remove-like", auth, removeLikeNote);

module.exports = router;
