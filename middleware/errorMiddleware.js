const { AppError } = require("../controllers/utils");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let { message, statusCode } = err;

  if (!statusCode) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
