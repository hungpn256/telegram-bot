const telegram_url = require("../config/urls").telegram_url;
const axios = require("axios");
const User = require('../models/users');

module.exports.getUpdates = (req, res) => {
  const url = telegram_url + "/getUpdates";
  axios.get(url).then((response) => {
    const data = response.data.result;
    res.send(data);
  });
};

module.exports.autoRepMessage = async (req, res) => {
  console.log(req.body);
  const body = req.body
  const { message } = req.body;
  const { text } = message;
  const user_id = message.from.id;
  const chat_id = message.chat.id;
  User.findOne({user_id}).then((user)=>{
    
    if(user){

      let datas = user.datas || [];
      if(typeof req.body !== 'undefined') {
        datas = [...datas,req.body];
        user.datas = datas;
      }
      return user.save().then(() => console.log('Add successfully.'));
    }
    else{
      const newUser = new User({user_id});
      newUser.datas = [req.body];
      newUser.save((err) => {
        if(err) console.log(err);
        else console.log('Add new user successfully.');
      })
    }
  });
  let reply;
  const url = telegram_url + "/sendMessage";
  var list_poll = [];
  if (text.match("^/done.*$")) {
    await User.findOne({user_id}).then((user)=>{
      user.datas.forEach(element => {
        list_poll.push(element.message.text);
      }); 
    })
    // console.log(list_poll)
    var ques = "";
    var options = [];
    var si=0,di=0;
    for(var index in list_poll){
      
      if(list_poll[index].match("^/poll.*$")){
        si = parseInt(index);
      }
      if(list_poll[index].match("^/option.*$")){
        di = parseInt(index);
        console.log(di,index);
      }
    }
    console.log(si,di);
    for(var i = si;i <= di; i++){
      if(list_poll[i].match("^/ques.*$")){
        ques = list_poll[i].slice(6);
      }
      if(list_poll[i].match("^/option.*$")){
        options.push(list_poll[i].slice(8));
      }
    }
    
    console.log(ques,options)
    sendPoll(telegram_url,chat_id,ques,options);
    
  } else {
    reply = checkMessage(text);
    sendMessage(url,chat_id,reply);
  }
  // sendMessage(url, req.body.message.chat.id, req.body);
  res.send(req.body);
};
function sendPoll(url, user_id, question, options) {
  axios
    .post(url + "/sendPoll", {
      chat_id: user_id,
      question: question,
      options: options,
    })
    .then((response) => {
      console.log("Poll posted");
    })
    .catch((error) => {
      console.log(error);
    });
}
function sendMessage(url, user_id, reply) {
  axios
    .post(url, { chat_id: user_id, text: reply })
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
  } else if (text.match("^/date.*$")) {
    const date = new Date();
    reply = `Thứ ${date.getDay() + 1}, ${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    } - ${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    } - ${date.getFullYear()}`;
  } else if (text.match("^/time.*$")) {
    const date = new Date();
    reply = ` ${date.getHours()} : ${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    } : ${
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    }`;
  } else if(text.match("^/poll.*$")){
    reply = "Enter your question.\nStart with /ques ...."
  } 
  else if(text.match("^/ques.*$")){
    reply = "Enter your options.\nStart with /option ...."
  }
  else if (text.match("^/option.*$")){
    reply = "Add option with /option ... or create poll with /done."
  }
  else {
    reply = "gọi gì???";
  }
  return reply;
}
