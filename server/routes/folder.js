const express = require("express");
const router = express.Router();
const {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} = require("../controllers/folder");

const auth = require("../midddleware/auth");

router.get("/", auth, getFolders);

router.post("/", auth, createFolder);

router.put("/:id", auth, updateFolder);

router.delete("/:id", auth, deleteFolder);

// router.post("/add-like", auth, likeFolder);

// router.post("/remove-like", auth, removeLikeFolder);

module.exports = router;
