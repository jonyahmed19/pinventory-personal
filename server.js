const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { readdirSync } = require("fs");

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

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("DB is connected:", port);
});
