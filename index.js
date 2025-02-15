const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
