var express = require("express");
var app = express();

const bot = require('./routers/bot');
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/',bot);

app.listen(PORT, () => console.log(`Telegram bot is listening on port ${PORT}!`));
