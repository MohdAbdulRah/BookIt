import React from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const booking = JSON.parse(sessionStorage.getItem("lastBooking") || "null");
  const navigate = useNavigate();

  if (!booking)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold mb-4">No booking found</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Booking Confirmed 🎉
        </h1>

        <div className="mt-4 text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Booking ID:</span> {booking._id}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {booking.fullname}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {booking.email}
          </p>
          <p>
            <span className="font-semibold">Seats:</span> {booking.seats}
          </p>
          <p>
            <span className="font-semibold">Total:</span> ₹{booking.totalPrice}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

