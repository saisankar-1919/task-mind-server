const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(exprss.json());

connectDB();
