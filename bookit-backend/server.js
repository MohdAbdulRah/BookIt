require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const experiencesRouter = require('./routes/experiences');
const bookingsRouter = require('./routes/bookings');
const promoRouter = require('./routes/promo');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error(err));
