const telegram_url = require('../config/urls').telegram_url;
const axios = require("axios");
module.exports.autoRepMessage = (req,res)=>{
    const { message } = req.body;
    const { text } = message;
    const reply = checkMessage(text);
    sendMessage(telegram_url, message.from.id, reply);
    res.send('hello');
}
function sendMessage(url, user_id, reply) {
    axios
      .post(url, { chat_id: user_id ,text: reply })
      .then((response) => {
        console.log("Message posted");
      })
      .catch((error) => {
        console.log(error);
      });
}
function checkMessage(text) {
  let reply;
  if (text.match("^/lichhoc1.*$")) {
    reply = "replichhoc";
  } 
  else if(text.match("^/time")){
    reply = Date.now();
  }
  else {
    reply = "gọi gì???";
  }
  return reply;
}

