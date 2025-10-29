const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
  code: String,
  type: { type: String, enum: ['PERCENT', 'FLAT'] },
  value: Number, // percent or flat amount
  active: { type: Boolean, default: true },
  expiresAt: Date
});

module.exports = mongoose.model('Promo', PromoSchema);
