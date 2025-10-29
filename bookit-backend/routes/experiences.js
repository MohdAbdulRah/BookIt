const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

router.get('/', async (req, res) => {
  const list = await Experience.find({});
  res.json(list);
});

router.get('/:id', async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) return res.status(404).json({ error: 'Not found' });
  res.json(exp);
});

module.exports = router;
