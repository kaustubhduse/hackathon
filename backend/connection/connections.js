// m83vT5cZmBuxWvjw

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kaustubhduse2004:m83vT5cZmBuxWvjw@cluster0.ryngt.mongodb.net/hackathon?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Connected to MongoDB");
});
