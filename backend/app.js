const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const CardRoute = require("./routes/CardRoute");
require("./connection/connections");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors({
    origin: 'https://hackathon-lyart-one.vercel.app',
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", CardRoute);

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Data received");
  return res.redirect("/");
});

app.listen(1000, () => {
  console.log("Server is running on port 3000");
});
