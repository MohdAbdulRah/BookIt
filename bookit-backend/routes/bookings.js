const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { experienceId, slotIndex, seats, fullname, email, phone, promoCode } = req.body;
  if (!experienceId || slotIndex == null || !seats || !fullname || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Use a transaction to avoid race conditions (MongoDB ReplicaSet required for transactions)
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const exp = await Experience.findById(experienceId).session(session);
    if (!exp) {
      await session.abortTransaction();
      return res.status(404).json({ error: 'Experience not found' });
    }

    const slot = exp.slots[slotIndex];
    if (!slot) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Slot not found' });
    }

    // check capacity: seats + bookedCount <= capacity
    if ((slot.bookedCount || 0) + seats > slot.capacity) {
      await session.abortTransaction();
      return res.status(409).json({ error: 'Not enough seats available' });
    }

    // increment bookedCount
    slot.bookedCount = (slot.bookedCount || 0) + seats;
    await exp.save({ session });

    // compute price
    const totalPrice = slot.price * seats;

    const booking = new Booking({
      experienceId,
      slotIndex,
      slotDate: slot.date,
      slotTime: slot.time,
      fullname,
      email,
      phone,
      seats,
      totalPrice,
      promoCode
    });
    await booking.save({ session });

    await session.commitTransaction();
    res.json({ success: true, booking });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    session.endSession();
  }
});

module.exports = router;
