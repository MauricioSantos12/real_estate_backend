const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/users");
const propertiesRouter = require("./routes/properties");
const propertiesImagesRouter = require("./routes/propertiesImages");
const commentsRouter = require("./routes/comments");
const { swaggerUi, swaggerSpec } = require("./swagger");
const app = express();

app.use(cors());
app.use(express.json());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}, http://localhost:${PORT}`);
  console.log(
    `📄  Docs available at port ${PORT}, http://localhost:${PORT}/api-docs`
  );
});
