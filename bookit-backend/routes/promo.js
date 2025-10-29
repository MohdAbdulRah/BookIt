const express = require('express');
const router = express.Router();
const Promo = require('../models/Promo');

router.post('/validate', async (req, res) => {
  const { code, amount } = req.body;
  if (!code) return res.status(400).json({ valid: false, message: 'No code' });

  const promo = await Promo.findOne({ code: code.toUpperCase(), active: true });
  if (!promo) return res.json({ valid: false });

  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
    return res.json({ valid: false, message: 'Expired' });
  }

  let discount = 0;
  if (promo.type === 'PERCENT') discount = (promo.value / 100) * (amount || 0);
  else discount = promo.value;

  res.json({ valid: true, discount, promo: { code: promo.code, type: promo.type, value: promo.value } });
});

module.exports = router;
