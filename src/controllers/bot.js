const telegram_url = require('../config/urls').telegram_url;
const axios = require("axios");
module.exports.autoRepMessage = (req,res)=>{
    const { message } = req.body;
    const { text } = message;
    if (text.match("^/lichhoc1.*$")) {
      let reply = "replichhoc";
      sendMessage(telegram_url, message.from.id, reply);
    } else {
      let reply = "gọi gì???";
      sendMessage(telegram_url, message.from.id, reply);
    }
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