require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('../models/Experience');
const Promo = require('../models/Promo');

const MONGO = process.env.MONGO_URI;

async function run() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected');

  await Experience.deleteMany({});
  await Promo.deleteMany({});

  const experiences = [
    {
      title: "Sunset Kayaking",
      description: "Guided kayak trip on calm waters.",
      location: "Goa",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      duration: "2 hours",
      tags: ["water", "sunset"],
      slots: [
        { date: "2025-11-01", time: "17:00", capacity: 8, price: 1500 },
        { date: "2025-11-02", time: "17:00", capacity: 8, price: 1500 }
      ]
    },
    {
      title: "Hilltop Sunrise Hike",
      description: "Early morning hike with breakfast.",
      location: "Nainital",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      duration: "4 hours",
      tags: ["hike", "sunrise"],
      slots: [
        { date: "2025-11-05", time: "05:00", capacity: 12, price: 1200 },
        { date: "2025-11-06", time: "05:00", capacity: 12, price: 1200 }
      ]
    },
    {
      title: "Forest Camping Escape",
      description: "Overnight camping adventure under the stars with bonfire and local dinner.",
      location: "Manali",
      image: "https://plus.unsplash.com/premium_photo-1664300792059-863ccfe55932?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9yZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      duration: "2 days",
      tags: ["camping", "adventure"],
      slots: [
        { date: "2025-11-10", time: "17:00", capacity: 10, price: 2500 },
        { date: "2025-11-17", time: "17:00", capacity: 10, price: 2500 }
      ]
    },
    {
      title: "Backwater Kayaking Tour",
      description: "Guided kayaking experience through peaceful backwaters and mangrove forests.",
      location: "Alleppey",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJmYWxsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      duration: "3 hours",
      tags: ["kayak", "nature"],
      slots: [
        { date: "2025-11-08", time: "07:30", capacity: 8, price: 1800 },
        { date: "2025-11-09", time: "16:00", capacity: 8, price: 1800 }
      ]
    },
    {
      title: "Desert Jeep Safari",
      description: "Thrilling jeep ride through golden dunes followed by a sunset dinner.",
      location: "Jaisalmer",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGVzZXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      duration: "5 hours",
      tags: ["safari", "desert"],
      slots: [
        { date: "2025-11-12", time: "15:00", capacity: 15, price: 2200 },
        { date: "2025-11-13", time: "15:00", capacity: 15, price: 2200 }
      ]
    }
  ];

  await Experience.insertMany(experiences);

  await Promo.insertMany([
    { code: 'SAVE10', type: 'PERCENT', value: 10, active: true, expiresAt: new Date('2026-12-31') },
    { code: 'FLAT100', type: 'FLAT', value: 100, active: true }
  ]);

  console.log('Seeded');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
