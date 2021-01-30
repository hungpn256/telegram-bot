var express = require("express");
var app = express();
const mongoose = require('mongoose');
const bot = require('./routers/bot');
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const CONNECTION_URL = "mongodb+srv://admin:tD932cU4JIBUoULV@cluster0.adxn5.mongodb.net/tele-bot?retryWrites=true&w=majority"

require("dotenv").config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/',bot);


mongoose.connect(CONNECTION_URL,{ 
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => console.log('MongoDb Connection is successful.'))
.catch((err) => console.log(err));



// tD932cU4JIBUoULV

app.listen(PORT, () => console.log(`Telegram bot is listening on port ${PORT}!`));
