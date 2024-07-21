const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.connect(
  "mongodb+srv://hkckhaled:HKc123456@cluster0.4yqdzm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});
// Use CORS for all routes
app.use(cors());

// Routes

app.use("/api/users", require("./routes/userRoutes"));

// Projects
app.use("/api/projects", require("./routes/projectRoutes"));

// Articles
app.use("/api/articles", require("./routes/articleRoutes"));

// Notifications
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Applications
app.use("/api/applications", require("./routes/applicationRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
