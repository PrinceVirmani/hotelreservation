"use client";

import { useHotel } from "../lib/HotelContext";

export default function Room({ room }) {
  const { selectRoom } = useHotel();

  // Determine the room's status class
  const getRoomStatusClass = () => {
    if (room.isBooked) return "bg-red-500"; // Booked rooms are red
    if (room.isSelected) return "bg-blue-500"; // Selected rooms are blue
    return "bg-white"; // Available rooms are white
  };

  // Handle room click
  const handleClick = () => {
    if (!room.isBooked) {
      selectRoom(room.id);
    }
  };

  return (
    <div
      className={`border border-gray-300 w-10 h-10 flex items-center justify-center cursor-pointer ${getRoomStatusClass()} ${
        room.isBooked ? "cursor-not-allowed" : "hover:bg-gray-200"
      }`}
      onClick={handleClick}
      title={`Room ${room.id} - ${
        room.isBooked ? "Booked" : room.isSelected ? "Selected" : "Available"
      }`}
    >
      <span
        className={`text-xs font-semibold ${
          room.isBooked || room.isSelected ? "text-white" : "text-black"
        }`}
      >
        {room.id}
      </span>
    </div>
  );
}
