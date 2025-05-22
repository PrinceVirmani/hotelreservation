"use client";

import { useHotel } from "../lib/HotelContext";
import Floor from "./Floor";

export default function Hotel() {
  const { hotel } = useHotel();

  if (!hotel) {
    return <div className="text-center p-4">Loading hotel...</div>;
  }

  // Sort floors in descending order (top floor first)
  const sortedFloors = [...hotel.floors].sort(
    (a, b) => b.floorNumber - a.floorNumber
  );

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Hotel Visualization</h2>
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        {sortedFloors.map((floor) => (
          <Floor key={floor.floorNumber} floor={floor} />
        ))}
      </div>
    </div>
  );
}
