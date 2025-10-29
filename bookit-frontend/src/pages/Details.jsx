import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();
  const nav = useNavigate();
  const [exp, setExp] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState({ index: null, seats: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/experiences/${id}`)
      .then((res) => {
        setExp(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!exp) return <div>Experience not found</div>;

  function handleProceed() {
    if (selectedSlot.index == null) return alert('Select a slot');
    const bookingInit = {
      experience: exp,
      slotIndex: selectedSlot.index,
      seats: selectedSlot.seats,
    };
    localStorage.setItem('bookingInit', JSON.stringify(bookingInit));
    nav('/checkout');
  }

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
  
      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE — Image + Info */}
        <div>
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full rounded-lg object-contain max-h-[400px] mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{exp.title}</h1>
          <p className="text-gray-600 mb-2">
            {exp.location} • {exp.duration}
          </p>
          <p className="text-gray-700">{exp.description}</p>
        </div>
  
        {/* RIGHT SIDE — Slots + Booking */}
        <div className="bg-white shadow p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Available Slots</h2>
          <div className="space-y-3">
            {exp.slots.map((s, idx) => {
              const available = (s.capacity - (s.bookedCount || 0)) > 0;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded border ${
                    selectedSlot.index === idx
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">
                        {s.date} • {s.time}
                      </div>
                      <div className="text-sm text-gray-600">
                        Price: ₹{s.price} • Seats left:{' '}
                        {Math.max(0, s.capacity - (s.bookedCount || 0))}
                      </div>
                    </div>
                    <button
                      disabled={!available}
                      onClick={() => setSelectedSlot({ index: idx, seats: 1 })}
                      className={`px-3 py-1 rounded ${
                        available
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {available
                        ? selectedSlot.index === idx
                          ? 'Selected'
                          : 'Select'
                        : 'Sold out'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
  
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Seats</label>
            <input
              type="number"
              min="1"
              max="10"
              value={selectedSlot.seats || 1}
              onChange={(e) =>
                setSelectedSlot((s) => ({
                  ...s,
                  seats: Math.max(1, Number(e.target.value)),
                }))
              }
              className="p-2 border rounded w-24"
            />
          </div>
  
          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
  
}
