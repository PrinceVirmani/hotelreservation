"use client";

import Room from "./Room";

export default function Floor({ floor }) {
  return (
    <div className="flex items-center mb-2">
      {/* Floor label */}
      <div className="w-20 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 mr-2">
        <span className="text-sm font-semibold">Floor {floor.floorNumber}</span>
      </div>

      {/* Rooms */}
      <div className="flex space-x-1">
        {floor.rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
