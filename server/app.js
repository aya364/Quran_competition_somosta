
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();
// const bodyParser = require("body-parser");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/quran_competition", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// const User = mongoose.model('User', UserSchema);

// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username, password });
//   if (user) {
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// });

// const registerRoute = require("./routes/register");
// const excelRoute = require("./routes/excel");
// app.use("/api/register", registerRoute);
// app.use("/api/excel", excelRoute);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT,"0.0.0.0",() => {
//   console.log(`Server is running on port ${PORT}`);
// });




// competitorsomostanode-production-1a56.up.railway.app



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const corsOptions = {
  // origin: "https://aya364.github.io/competitorSomosta2",
  origin:"mazoraCOM.surge.sh" ,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));




app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/quran_competition", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });


// MongoDB Connection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.get("/", (req, res) => {
  res.send("Server is running on port " + process.env.PORT);
});
const registerRoute = require("./routes/register");
const excelRoute = require("./routes/excel");
app.use("/api/register", registerRoute);
app.use("/api/excel", excelRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
