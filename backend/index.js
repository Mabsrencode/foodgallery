require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db.js");
// const adminRoutes = require("./routes/user.route.js");
// const contactRoutes = require("./routes/email.route.js");
const authRoutes = require("./routes/auth.route.js");
const postRecipe = require("./routes/recipes.route.js");
const app = express();

app.use(
  cors({
    // origin: "https://foodgallery.onrender.com",
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));

  // ../frontend/
});

// const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 4000;
app.use((req, res, next) => {
  // Disable caching for all routes
  res.setHeader("Cache-Control", "no-store");
  next();
});
app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});
app.use("/auth", authRoutes);
// app.use("/contact", contactRoutes);
app.use("/post-recipe", postRecipe);
// app.use("/admin", adminRoutes);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Starting server on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
