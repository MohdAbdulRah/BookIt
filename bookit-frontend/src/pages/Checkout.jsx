import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Checkout() {
  const nav = useNavigate();
  const init = JSON.parse(localStorage.getItem('bookingInit') || 'null');
  const [form, setForm] = useState({ fullname: '', email: '', phone: '' });
  const [promo, setPromo] = useState('');
  const [promoResult, setPromoResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!init) {
    return (
      <div>
        No booking selected. Go back to <a href="/">home</a>.
      </div>
    );
  }

  const exp = init.experience;
  const slot = exp.slots[init.slotIndex];
  const basePrice = slot.price * (init.seats || 1);

  async function applyPromo() {
    if (!promo) return;
    const res = await API.post('/promo/validate', { code: promo, amount: basePrice });
    setPromoResult(res.data);
  }

  async function submit() {
    if (!form.fullname || !form.email) return alert('Name and email required');
    setLoading(true);
    try {
      const payload = {
        experienceId: exp._id,
        slotIndex: init.slotIndex,
        seats: init.seats || 1,
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        promoCode: promoResult?.valid ? promoResult.promo?.code : null,
      };
      const res = await API.post('/bookings', payload);
      setLoading(false);
      if (res.data?.success) {
        sessionStorage.setItem('lastBooking', JSON.stringify(res.data.booking));
        nav('/result');
      } else {
        alert('Booking failed: ' + JSON.stringify(res.data));
      }
    } catch (err) {
      setLoading(false);
      alert('Booking failed: ' + (err.response?.data?.error || err.message));
    }
  }

  const discount = promoResult?.valid ? promoResult.discount || 0 : 0;
  const total = Math.max(0, basePrice - discount);

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => nav(-1)}
        className="flex items-center text-gray-700 hover:text-blue-600 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h1 className="text-xl font-bold">Checkout</h1>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="mb-2">
          {exp.title} • {slot.date} {slot.time}
        </div>
        <div className="mb-2">Seats: {init.seats}</div>
        <div className="mb-2">Base: ₹{basePrice}</div>

        <div className="mt-3">
          <input
            placeholder="Full name"
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
        </div>

        <div className="mt-3">
          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="p-2 border rounded"
              placeholder="Promo code"
            />
            <button
              onClick={applyPromo}
              className="px-3 py-2 rounded bg-gray-200"
            >
              Apply
            </button>
          </div>
          {promoResult && (
            <div className="mt-2 text-sm">
              {promoResult.valid
                ? `Applied: -₹${promoResult.discount}`
                : 'Invalid promo'}
            </div>
          )}
        </div>

        <div className="mt-4 font-semibold">Total: ₹{total}</div>

        <div className="mt-4">
          <button
            onClick={submit}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}

