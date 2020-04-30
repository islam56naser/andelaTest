const mongoose = require('mongoose');

const { Schema } = mongoose;


const UserSchema = Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});


const User = mongoose.model('User', UserSchema);
User.createIndexes();

module.exports = { User };
