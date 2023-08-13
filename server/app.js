require("dotenv").config();
const express = require("express");
const cors = require("cors");

const auth_routes = require("./routes/auth");
const note_routes = require("./routes/note");
const user_routes = require("./routes/user");
const chat_routes = require("./routes/chat");
const message_routes = require("./routes/message");

const app = express();
app.use(express.json());
app.use(cors());

require("./db/conn");

app.use("/api/auth", auth_routes);
app.use("/api/note", note_routes);
app.use("/api/user", user_routes);
app.use("/api/chat", chat_routes);
app.use("/api/message", message_routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`listening to port No. ${process.env.APP_PORT}`);
});
