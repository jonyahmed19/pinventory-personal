const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { readdirSync } = require("fs");
const errorHandler = require("./src/middlewares/errorHandlerMiddleware");
const { default: mongoose } = require("mongoose");

/*
 *
 * middlewares
 *
 */

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

/***
 * Error middleware
 */

readdirSync("./src/routes").map((fileName) =>
  app.use("/api/v1", require(`./src/routes/${fileName}`))
);

app.use(errorHandler);
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    app.listen(port, () => {
      console.log("DB is connected:", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
