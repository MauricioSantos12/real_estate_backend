const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/users");
const propertiesRouter = require("./routes/properties");
const propertiesImagesRouter = require("./routes/propertiesImages");
const commentsRouter = require("./routes/comments");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/properties/images", propertiesImagesRouter);
app.use("/api/comments", commentsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Real Estate Backend" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`)
);
