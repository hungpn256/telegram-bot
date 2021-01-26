const keys = require('./keys')
const key = require('./keys')
module.exports = {
    telegram_url :
        "https://api.telegram.org/bot" +
         keys.TELEGRAM_API_TOKEN +
        "/sendMessage",
}