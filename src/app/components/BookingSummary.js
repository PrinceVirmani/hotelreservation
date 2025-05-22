"use client";

import { useHotel } from "../lib/HotelContext";

export default function BookingSummary() {
  const { hotel, bookingSummary } = useHotel();

  // If there's no hotel data yet, don't render anything
  if (!hotel) return null;

  // Get all selected rooms
  const selectedRooms = hotel.floors
    .flatMap((floor) => floor.rooms)
    .filter((room) => room.isSelected);

  // Calculate total travel time between selected rooms
  const calculateTravelTime = (rooms) => {
    if (rooms.length <= 1) return 0;

    let totalTime = 0;
    for (let i = 0; i < rooms.length - 1; i++) {
      // Vertical travel time (2 minutes per floor)
      const verticalTime = Math.abs(rooms[i].floor - rooms[i + 1].floor) * 2;

      // Horizontal travel time (1 minute per room)
      let horizontalTime = 0;
      if (rooms[i].floor === rooms[i + 1].floor) {
        horizontalTime = Math.abs(rooms[i].position - rooms[i + 1].position);
      }

      totalTime += verticalTime + horizontalTime;
    }

    return totalTime;
  };

  // If there are no selected rooms and no booking summary, don't show anything
  if (selectedRooms.length === 0 && !bookingSummary) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        {selectedRooms.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Selected Rooms</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedRooms.map((room) => (
                <span
                  key={room.id}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
                >
                  {room.id}
                </span>
              ))}
            </div>
            <p>
              Total Travel Time:{" "}
              <strong>{calculateTravelTime(selectedRooms)} minutes</strong>
            </p>
          </div>
        )}

        {bookingSummary && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Last Booking</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {bookingSummary.rooms.map((room) => (
                <span
                  key={room.id}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded"
                >
                  {room.id}
                </span>
              ))}
            </div>
            <p>
              Total Travel Time:{" "}
              <strong>{bookingSummary.totalTravelTime} minutes</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
