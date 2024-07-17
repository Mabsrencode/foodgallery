require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db.js");
const authRoutes = require("./routes/auth.route.js");
const postRecipe = require("./routes/recipes.route.js");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Serve API routes first
app.use("/auth", authRoutes);
app.use("/post-recipe", postRecipe);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 4000;
const pingServer = () => {
  http
    .get("https://foodgallery-api.onrender.com", (res) => {
      console.log("Pinged server, status code:", res.statusCode);
    })
    .on("error", (err) => {
      console.error("Error pinging server:", err.message);
    });
};
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Starting server on port ${PORT}`);
    });
    cron.schedule("*/5 * * * *", pingServer);
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
