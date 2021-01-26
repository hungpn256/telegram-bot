const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  datas:[]
});

module.exports = User = mongoose.model("users", UserSchema);