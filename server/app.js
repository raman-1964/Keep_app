require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const connectDB = require("./db/conn");

const auth_routes = require("./routes/auth");
const note_routes = require("./routes/note");
const folder_routes = require("./routes/folder");
const user_routes = require("./routes/user");
const chat_routes = require("./routes/chat");
const message_routes = require("./routes/message");
const upload_routes = require("./routes/upload");
const errorMiddleware = require("./midddleware/error");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", auth_routes);
app.use("/api/folder", folder_routes);
app.use("/api/note", note_routes);
app.use("/api/user", user_routes);
app.use("/api/chat", chat_routes);
app.use("/api/message", message_routes);
app.use("/api/upload", upload_routes);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

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
  socket.on("setup", (userName) => {
    socket.join(userName);
  });

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

  //    CREATING OFFER
  socket.on("offer", ({ room, config, offer }) => {
    const arr = [...new Set(socket.rooms)];
    socket.in(room).emit("offer", { from: arr[1], offer, config });
  });

  //    DECLINING OFFER
  socket.on("decline-offer", ({ room }) => {
    socket.in(room).emit("decline-offer");
  });

  //    ACCEPTING OFFER
  socket.on("answer", ({ room, answer }) => {
    socket.in(room).emit("answer", answer);
  });

  //    NOTHING DONE TO CALLL
  socket.on("nothing-done-to-call", ({ room }) => {
    socket.in(room).emit("nothing-done-to-call");
  });

  //  ICE CANDIDATE
  socket.on("ice-candidate", ({ room, candidate }) => {
    socket.in(room).emit("ice-candidate", candidate);
  });

  //  CALL CUT
  socket.on("cut-call", ({ room }) => {
    socket.in(room).emit("cut-call");
  });
});
