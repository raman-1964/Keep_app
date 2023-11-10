const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");
const { getSignature } = require("../controllers/upload");

router.post("/", auth, getSignature);

module.exports = router;
