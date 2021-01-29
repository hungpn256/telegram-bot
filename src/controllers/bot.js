const telegram_url = require("../config/urls").telegram_url;
const axios = require("axios");
const User = require("../models/users");
const moment = require("moment");
const url = telegram_url + "/sendMessage";
module.exports.getUpdates = (req, res) => {
  axios.get(url).then((response) => {
    const data = response.data.result;
    res.send(data);
  });
};

module.exports.autoRepMessage = (req, res) => {
  const body = req.body;
  const { message } = req.body;
  const { text } = message;
  const user_id = message.from.id;
  const chat_id = message.chat.id;
  let reply = "";
  if (text.match("^/lichhoc1.*$")) {
    reply = "replichhoc";
    sendMessage(url, chat_id, reply);
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
    sendMessage(url, chat_id, reply);
  } else if (text.match("^/poll.*$")) {
    reply = "Enter your question.\nStart with /ques ....";
    sendMessage(url, chat_id, reply);
  } else if (text.match("^/ques.*$")) {
    reply = "Enter your options.\nStart with /option ....";
    sendMessage(url, chat_id, reply);
  } else if (text.match("^/option.*$")) {
    reply = "Add option with /option ... or create poll with /done.";
    sendMessage(url, chat_id, reply);
  } else if (text.match("^/id$")) {
    reply = messenge.chat.id;
    sendMessage(url, chat_id, reply);
  } else if (text.match("^/covid.*$")) {
    axios
      .get(`https://api.covid19api.com/summary`)
      .then((res) => {
        let rep = res.data.Countries.find((val) => val.CountryCode === "VN");
        reply = covid(rep);
        sendMessage(url, chat_id, reply);
      })
      .catch((e) => console.log(e));
  } else {
    reply = "gọi gì???";
    sendMessage(url, chat_id, reply);
  }
  // User.findOne({ user_id })
  //   .then((user) => {
  //     if (user) {
  //       let datas = user.datas || [];
  //       if (typeof req.body !== "undefined") {
  //         datas = [...datas, req.body];
  //         user.datas = datas;
  //       }
  //       return user.save().then(() => console.log("Add successfully."));
  //     } else {
  //       const newUser = new User({ user_id });
  //       newUser.datas = [req.body];
  //       newUser.save((err) => {
  //         if (err) console.log(err);
  //         else console.log("Add new user successfully.");
  //       });
  //     }
  //   })
  //   .catch((err) => console.log(err));
  // let reply;
  // var list_poll = [];
  // if (text.match("^/done.*$")) {
  //   await User.findOne({ user_id })
  //     .then((user) => {
  //       if (user) {
  //         user.datas.forEach((element) => {
  //           list_poll.push(element.message.text);
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err.message));
  //   var ques = "";
  //   var options = [];
  //   var si = 0,
  //     di = 0;
  //   for (var index in list_poll) {
  //     if (list_poll[index].match("^/poll.*$")) {
  //       si = parseInt(index);
  //     }
  //     if (list_poll[index].match("^/option.*$")) {
  //       di = parseInt(index);
  //       console.log(di, index);
  //     }
  //   }
  //   for (var i = si; i <= di; i++) {
  //     if (list_poll[i].match("^/ques.*$")) {
  //       ques = list_poll[i].slice(6);
  //     }
  //     if (list_poll[i].match("^/option.*$")) {
  //       options.push(list_poll[i].slice(8));
  //     }
  //   }
  //   if (options.length >= 2) {
  //     await User.findOne({ user_id })
  //       .then((user) => {
  //         if (user) {
  //           user.datas = [];
  //         }
  //         return user.save().then(() => console.log("Delete successfully."));
  //       })
  //       .catch((err) => console.log(err.message));
  //     reply = "Create poll successfully.";
  //     await sendPoll(telegram_url, chat_id, ques, options);
  //   } else {
  //     reply =
  //       "Add option with /option ... or create poll with /done.\n Your options need at least 2.";
  //   }
  // } else {
  //   reply = checkMessage(message);
  // }
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
covid = (val) => {
  return `Thông tin về đại dịch covid ở Việt Nam:
  Tổng số ca nhiễm 🧐🧐: ${val.TotalConfirmed}
  Đã chữa lành 😇😇😇: ${val.TotalRecovered} 
  Tổng số người chết 😢: ${val.TotalDeaths}

  Ngày: ${moment(val.Date).format("DD/MM/YYYY")}

  Số ca mắc mới: ${val.NewConfirmed}
  Số người chết: ${val.NewDeaths}
  Đã chữa lành thêm: ${val.NewDeaths}
  `;
};
