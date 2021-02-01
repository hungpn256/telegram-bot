const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: String,
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject'
  }]
});

module.exports = User = mongoose.model("users", UserSchema);