"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  generateHotel,
  bookSelectedRooms,
  toggleRoomSelection,
  resetHotel,
  generateRandomOccupancy,
  findRoomById,
  getSelectedRooms,
} from "./hotelModel";
import { validateSelectedRooms, suggestRooms } from "./bookingLogic";

// Create the context
const HotelContext = createContext(null);

// Custom hook to use the context
export function useHotel() {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
}

// Provider component
export function HotelProvider({ children }) {
  // Initialize state
  const [hotel, setHotel] = useState(null);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [message, setMessage] = useState("");

  // Initialize hotel on first render
  useEffect(() => {
    setHotel(generateHotel());
  }, []);

  // Select a room
  const selectRoom = (roomId) => {
    if (!hotel) return;

    // Find the room
    const room = findRoomById(hotel, roomId);
    if (!room) return;

    // If the room is already selected, allow deselection
    if (room.isSelected) {
      const updatedHotel = toggleRoomSelection(hotel, roomId);
      setHotel(updatedHotel);
      setBookingSummary(null);
      setMessage("");
      return;
    }

    // If the room is not selected, check if we already have 5 rooms selected
    const selectedRooms = getSelectedRooms(hotel);
    if (selectedRooms.length >= 5) {
      setMessage("You can only select up to 5 rooms at a time.");
      return;
    }

    // If we have less than 5 rooms selected, allow selection
    const updatedHotel = toggleRoomSelection(hotel, roomId);
    setHotel(updatedHotel);

    // Clear any previous booking summary
    setBookingSummary(null);
    setMessage("");
  };

  // Book selected rooms
  const bookRooms = () => {
    if (!hotel) return;

    const validation = validateSelectedRooms(hotel);

    if (!validation.isValid) {
      setMessage(validation.message);
      return;
    }

    // Create booking summary
    setBookingSummary({
      rooms: validation.rooms,
      totalTravelTime: validation.totalTravelTime,
    });

    // Update hotel with booked rooms
    const updatedHotel = bookSelectedRooms(hotel);
    setHotel(updatedHotel);

    setMessage("Rooms booked successfully!");
  };

  // Generate random occupancy
  const randomizeOccupancy = (rate = 0.7) => {
    if (!hotel) return;

    const updatedHotel = generateRandomOccupancy(hotel, rate);
    setHotel(updatedHotel);

    // Clear any previous booking summary
    setBookingSummary(null);
    setMessage("");
  };

  // Reset the hotel
  const resetAllBookings = () => {
    if (!hotel) return;

    const updatedHotel = resetHotel(hotel);
    setHotel(updatedHotel);

    // Clear any previous booking summary
    setBookingSummary(null);
    setMessage("All bookings have been reset.");
  };

  // Suggest rooms based on number needed
  const suggestRoomsToBook = (roomCount) => {
    if (!hotel || roomCount <= 0 || roomCount > 5) return;

    const suggestion = suggestRooms(hotel, roomCount);

    if (!suggestion) {
      setMessage(`Unable to find ${roomCount} available rooms.`);
      return;
    }

    setHotel(suggestion.hotel);
    setMessage(`${roomCount} rooms suggested for booking.`);
  };

  // The context value
  const value = {
    hotel,
    bookingSummary,
    message,
    selectRoom,
    bookRooms,
    randomizeOccupancy,
    resetAllBookings,
    suggestRoomsToBook,
  };

  return (
    <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
  );
}
