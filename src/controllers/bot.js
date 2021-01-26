const telegram_url = require('../config/urls').telegram_url;
const axios = require("axios");

module.exports.getUpdates = (req,res) =>{
  const url = telegram_url + "/getUpdates";
  axios.get(url).then((response) =>{
    const data = response.data.result;
    res.send(data);
  });
}

module.exports.autoRepMessage = (req,res)=>{
    const { message } = req.body;
    const { text } = message;
    const reply = checkMessage(text);
    const url = telegram_url + "/sendMessage";
    sendMessage(url, message.from.id, reply);
    console.log(telegram_url);
    res.send('hello');
}
function sendPoll(url,user_id,question,answer){
  axios
    .post(url+'/sendPoll', { chat_id: user_id ,question: question,options:answer})
    .then((response) => {
      console.log("Poll posted");
    })
    .catch((error) => {
      console.log(error);
  });
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
  else if(text.match("^/date.*$")){
    const date = new Date()
    reply = `Thứ ${date.getDay()+1}, ${(date.getDate()< 10? '0'+date.getDate(): date.getDate())} - ${(date.getMonth()+1< 10? '0'+(date.getMonth()+1): date.getMonth()+1)} - ${date.getFullYear()}`
  }
  else if(text.match("^/time.*$")){
    const date = new Date()
    reply = ` ${date.getHours()} : ${(date.getMinutes()< 10? '0'+date.getMinutes(): date.getMinutes())} : ${(date.getSeconds()< 10? '0'+date.getSeconds(): date.getSeconds())}`
  }
  else if(text.match("/poll")){
    sendPoll(telegram_url,"1527516281","How are you?", ["OK","Fine","Bad"]);
    reply = 'Create poll successfully!!!!'
  }
  else {
    reply = "gọi gì???";
  }
  return reply;
}

