const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const authToken = require("./verifyToken");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const port = 5001;
mongoose.connect(
  "mongodb+srv://adhiman111111:anujdhiman123@cluster0.jxd1enk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const user = mongoose.model("user", {
  name: String,
  username: String,
  password: String,
  rooms: Array,
});

const room = mongoose.model("room", {
  name: String,
  participants: Array,
});

const message = mongoose.model("message", {
  message: String,
  groupId: String,
  sentBy: String,
  time: String,
});

io.on("connection", async (socket) => {
  socket.on("joinroomnew", (id) => {
    grpId = id;
    socket.join(id);
  });
  socket.on("inputMessage", (msg) => {
    let newMessage = new message(msg);
    newMessage.save();
    socket.to(msg.groupId).emit("received", { msg: msg });
  });

  socket.on("groupMsg", async (ID) => {
    let data = await message.find({ groupId: ID.groupId });
    socket.emit("fetchMsg", { msgData: data });
  });
});

app.post("/addUser", (req, res) => {
  user.find({}, function (err, data) {
    let users = data;
    if (users.length === 0) {
      req.body.rooms = [];
      let newUser = new user(req.body);
      newUser.save();
      res.send("");
      return;
    } else {
      for (let u of users) {
        if (u.username === req.body.username) {
          res.send("Same");
          return;
        }
      }
      let newUser = new user(req.body);
      newUser.save();
      res.send("");
      return;
    }
  });
});

app.post("/checkData", (req, res) => {
  const { username, password } = req.body;

  user.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, "ProCoder");

    // Set token in cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Send token in response
    res
      .status(200)
      .json({ token, userInfo: { id: user._id, name: user.name } });
  });
});

app.get("/fetchData", (req, res) => {
  user.find({}, (err, data) => {
    res.send(data);
    return;
  });
});

app.get("/chat", authToken, (req, res) => {
  // console.log(req.user, "user11");
  res.send(req.user);
  return;
});

app.post("/checkToken", authToken, (req, res) => {
  console.log(req.user, "user");
  res.send(req.user);
  return;
});

app.post("/getUsers", async (req, res) => {
  let roomID = await user.findOne({ _id: req.body.id });
  // console.log(roomID);
  roomID = roomID.rooms;
  let roomData = await room.find({ _id: roomID });
  res.send({ obj: roomData });
});

app.post("/createRoom", authToken, (req, res) => {
  room.find(
    { participants: [req.body.user_id, req.body.friend_id] },
    async function (err, data) {
      if (data.length) {
        res.status(400);
        res.end("error");
        return;
      }

      let newData = req.body;
      let roomID;
      let newRoom = new room();
      if (newData.groupName) {
        newRoom.name = `${newData.groupName}(Group)`;
        let data = await room.find({ name: req.body.groupName });
        if (data.length) {
          res.status(400);
          res.end("error");
          return;
        }
        for (let elem in newData.userId) {
          newRoom.participants[elem] = newData.userId[elem];
        }
      } else {
        newRoom.name = `${newData.userName},${newData.friendName}`;
        newRoom.participants[0] = newData.user_id;
        newRoom.participants[1] = newData.friend_id;
      }
      roomID = newRoom._id;
      newRoom.save();
      if (newData.groupName) {
        user.updateMany(
          { _id: newData.userId },
          { $push: { rooms: roomID } },
          (err, data) => {}
        );
      } else {
        user.updateMany(
          { _id: [newData.user_id, newData.friend_id] },
          { $push: { rooms: roomID } },
          (err, data) => {}
        );
      }
      res.json({ newRoom });
      console.log(newRoom);
      return;
    }
  );
});

app.post("/logout", (req, res) => {
  // Clear token from cookies
  console.log("entered");
  res.clearCookie("access_token");

  res.status(200).json({ message: "Logged out successfully" });
});

server.listen(port, console.log(`Server running at ${port}`));
