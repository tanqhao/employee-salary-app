const mongoose = require('mongoose');
const unqiueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  id: {type: String, required: true},
  login: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  salary: {type: Number, required: true},
})

userSchema.plugin(unqiueValidator);

module.exports = mongoose.model('User', userSchema);
