require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const connectDB = require("./db/conn");

const auth_routes = require("./routes/auth");
const note_routes = require("./routes/note");
const user_routes = require("./routes/user");
const chat_routes = require("./routes/chat");
const message_routes = require("./routes/message");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", auth_routes);
app.use("/api/note", note_routes);
app.use("/api/user", user_routes);
app.use("/api/chat", chat_routes);
app.use("/api/message", message_routes);

const server = app.listen(process.env.APP_PORT, () => {
  console.log(`listening to port No. ${process.env.APP_PORT}`);
});

const io = socket(server, {
  pingTimeOut: 30000,
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  // console.log("socket connected");

  socket.on("setup", (userName) => {
    socket.join(userName);
  });

  // socket.on("join-chat", (room) => {
  //   socket.join(room);
  //   // console.log("user joined ", room);
  // });

  socket.on("typing", ({ room, chatId }) =>
    socket.in(room).emit("Typing", chatId)
  );
  socket.on("stop-typing", ({ room, chatId }) =>
    socket.in(room).emit("stopTyping", chatId)
  );

  socket.on("new-message", (msg) => {
    if (!msg.chat.users) return;

    msg.chat.users.map((user) => {
      if (user.username === msg.sender.username) return;
      socket.in(user.username).emit("new-msg-received", msg);
    });
  });
});
