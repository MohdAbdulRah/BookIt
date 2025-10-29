const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date: String,        // e.g. '2025-11-01'
  time: String,        // e.g. '09:00'
  capacity: Number,    // total seats
  price: Number,       // price per seat
  bookedCount: { type: Number, default: 0 }
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  image: String,
  duration: String,
  tags: [String],
  slots: [SlotSchema]
});

module.exports = mongoose.model('Experience', ExperienceSchema);
