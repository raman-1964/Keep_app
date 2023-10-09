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

router.put("/", auth, updateFolder);

router.delete("/:id", auth, deleteFolder);

module.exports = router;
