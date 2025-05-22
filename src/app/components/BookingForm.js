"use client";

import { useState } from "react";
import { useHotel } from "../lib/HotelContext";

export default function BookingForm() {
  const {
    bookRooms,
    resetAllBookings,
    randomizeOccupancy,
    suggestRoomsToBook,
    message,
  } = useHotel();

  const [roomCount, setRoomCount] = useState(1);

  // Handle room count change
  const handleRoomCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setRoomCount(count);
  };

  // Handle booking
  const handleBook = () => {
    bookRooms();
  };

  // Handle reset
  const handleReset = () => {
    resetAllBookings();
  };

  // Handle random occupancy
  const handleRandom = () => {
    randomizeOccupancy(0.7); // 70% occupancy rate
  };

  // Handle suggest rooms
  const handleSuggest = () => {
    suggestRoomsToBook(roomCount);
  };

  const rooms = [1, 2, 3, 4, 5];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Booking Controls</h2>
      <div className="flex flex-wrap gap-4 p-4 border border-gray-300 rounded-lg bg-white">
        {/* Room Count Selector */}
        <div className="flex items-center">
          <label htmlFor="roomCount" className="mr-2 font-medium">
            No of Rooms:
          </label>
          <select
            id="roomCount"
            value={roomCount}
            onChange={handleRoomCountChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {rooms.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            onClick={handleSuggest}
            className="ml-2 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Suggest
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleBook}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
          <button
            onClick={handleRandom}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Random
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg">
          {message}
        </div>
      )}
    </div>
  );
}
