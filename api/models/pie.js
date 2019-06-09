const mongoose = require('mongoose')

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  rating: Number
})

module.exports = mongoose.model('Pie', schema)
