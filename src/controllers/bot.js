const telegram_url = require("../config/urls").telegram_url;
const axios = require("axios");

module.exports.getUpdates = (req, res) => {
  const url = telegram_url + "/getUpdates";
  axios.get(url).then((response) => {
    const data = response.data.result;
    res.send(data);
  });
};

module.exports.autoRepMessage = (req, res) => {
  console.log(req.body);
  // const { message } = req.body;
  // const { text } = message;
  // let reply;
  // const url = telegram_url + "/sendMessage";
  // if (text.match("/poll.*")) {
  //   if (text.indexOf("q:") !== -1 && text.indexOf("a:") !== -1) {
  //     const question = text.slice(text.indexOf("q:") + 2, text.indexOf("a:"));
  //     let answers = text.slice(text.indexOf("a:") + 2);
  //     answers = answers.split(",");
  //     console.log("question: ", question);
  //     console.log("answers: ", answers);
  //     sendPoll(telegram_url, message.chat.id, question, answers);
  //     reply = "Create poll successfully!!!!";
  //     sendMessage(url, message.chat.id, reply);
  //   } else
  //     sendMessage(
  //       url,
  //       message.chat.id,
  //       "vui lòng đúng format /poll q:... a:option1,option2,..."
  //     );
  // } else {
  //   reply = checkMessage(text);
  // }
  res.send(req.body);
};
function sendPoll(url, user_id, question, answer) {
  axios
    .post(url + "/sendPoll", {
      chat_id: user_id,
      question: question,
      options: answer,
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
  } else {
    reply = "gọi gì???";
  }
  return reply;
}
