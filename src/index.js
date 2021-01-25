var express = require("express");
var app = express();

const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
let telegram_url =
  "https://api.telegram.org/bot" +
  process.env.TELEGRAM_API_TOKEN +
  "/sendMessage";
app.post("/", function (req, res) {
  const { message } = req.body;
  const { text } = message;
  if (text.matchs("^/lichhoc1$")) {
    let reply = "replichhoc";
    sendMessage(telegram_url, message, reply, res);
  } else {
    let reply = "gọi gì???";
    sendMessage(telegram_url, message, reply, res);
  }
});
function sendMessage(url, message, reply, res) {
  axios
    .post(url, { chat_id: message.chat.id, text: reply })
    .then((response) => {
      console.log("Message posted");
      res.end("ok");
    })
    .catch((error) => {
      console.log(error);
    });
}
app.listen(PORT, () => console.log("Telegram bot is listening on port 3000!"));
