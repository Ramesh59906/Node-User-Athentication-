// models/itemModel.js
// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   description: String,
// });

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  age: {
    type: Number, required: true
  },
  price: {
    type: Number, required: true
  },
  description: {
    type: String, required: true
  },
  phonenumber: {
    type: Number, required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

