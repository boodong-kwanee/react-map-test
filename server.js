require("dotenv/config");
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use("/ping", (req, res) => {
  res.json("pong");
});

app.use("/1", (req, res) => {
  console.log(__dirname);
  console.log("요청");
  // index.html 파일 응답
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/", (req, res) => {
  console.log(__dirname);
  console.log("요청");
  // index.html 파일 응답
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`server is listening at PORT: ${PORT}`));
