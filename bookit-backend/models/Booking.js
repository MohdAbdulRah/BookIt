const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' },
  slotIndex: Number, // index into experience.slots array
  slotDate: String,
  slotTime: String,
  fullname: String,
  email: String,
  phone: String,
  seats: Number,
  totalPrice: Number,
  promoCode: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'CONFIRMED' }
});

module.exports = mongoose.model('Booking', BookingSchema);
