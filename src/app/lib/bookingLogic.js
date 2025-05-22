export function calculateTravelTime(room1, room2) {
  // Vertical travel time (2 minutes per floor)
  const verticalTime = Math.abs(room1.floor - room2.floor) * 2;

  // Horizontal travel time (1 minute per room)
  let horizontalTime = 0;
  if (room1.floor === room2.floor) {
    horizontalTime = Math.abs(room1.position - room2.position);
  }

  return verticalTime + horizontalTime;
}

export function calculateTotalTravelTime(rooms) {
  if (rooms.length <= 1) return 0;

  let totalTime = 0;
  for (let i = 0; i < rooms.length - 1; i++) {
    totalTime += calculateTravelTime(rooms[i], rooms[i + 1]);
  }

  return totalTime;
}

export function findOptimalRooms(hotel, roomsNeeded) {
  if (roomsNeeded > 5) return null; // Max 5 rooms per booking

  // Get all available rooms
  const availableRooms = hotel.floors
    .flatMap((floor) => floor.rooms)
    .filter((room) => !room.isBooked);

  if (availableRooms.length < roomsNeeded) return null; // Not enough rooms

  // Check if we can book all rooms on a single floor
  for (const floor of hotel.floors) {
    const availableOnFloor = floor.rooms.filter((room) => !room.isBooked);

    if (availableOnFloor.length >= roomsNeeded) {
      // Sort rooms by position to minimize horizontal travel time
      const selectedRooms = [...availableOnFloor]
        .sort((a, b) => a.position - b.position)
        .slice(0, roomsNeeded);

      return {
        rooms: selectedRooms,
        totalTravelTime: calculateTotalTravelTime(selectedRooms),
      };
    }
  }

  // If we can't book all rooms on a single floor, find the optimal combination

  // Group available rooms by floor
  const roomsByFloor = hotel.floors.map((floor) =>
    floor.rooms.filter((room) => !room.isBooked)
  );

  // Start with the floor that has the most available rooms
  roomsByFloor.sort((a, b) => b.length - a.length);

  // For demonstration, let's just pick rooms from floors with most availability
  let selectedRooms = [];
  for (const floorRooms of roomsByFloor) {
    const neededFromThisFloor = Math.min(
      roomsNeeded - selectedRooms.length,
      floorRooms.length
    );

    if (neededFromThisFloor > 0) {
      // Sort rooms by position
      const sortedFloorRooms = [...floorRooms].sort(
        (a, b) => a.position - b.position
      );
      selectedRooms = [
        ...selectedRooms,
        ...sortedFloorRooms.slice(0, neededFromThisFloor),
      ];
    }

    if (selectedRooms.length === roomsNeeded) break;
  }

  // Sort selected rooms by floor and position for optimal travel
  selectedRooms.sort((a, b) => {
    if (a.floor !== b.floor) return a.floor - b.floor;
    return a.position - b.position;
  });

  return {
    rooms: selectedRooms,
    totalTravelTime: calculateTotalTravelTime(selectedRooms),
  };
}

export function validateSelectedRooms(hotel, maxRooms = 5) {
  const selectedRooms = hotel.floors
    .flatMap((floor) => floor.rooms)
    .filter((room) => room.isSelected);

  if (selectedRooms.length === 0) {
    return { isValid: false, message: "No rooms selected" };
  }

  if (selectedRooms.length > maxRooms) {
    return {
      isValid: false,
      message: `You can only book up to ${maxRooms} rooms at a time`,
    };
  }

  // Check if any selected room is already booked
  const bookedSelected = selectedRooms.find((room) => room.isBooked);
  if (bookedSelected) {
    return {
      isValid: false,
      message: `Room ${bookedSelected.id} is already booked`,
    };
  }

  return {
    isValid: true,
    message: "Valid selection",
    rooms: selectedRooms,
    totalTravelTime: calculateTotalTravelTime(selectedRooms),
  };
}

export function suggestRooms(hotel, roomsNeeded) {
  const booking = findOptimalRooms(hotel, roomsNeeded);

  if (!booking) return null;

  // Create a new hotel object with the suggested rooms selected
  const newHotel = JSON.parse(JSON.stringify(hotel)); // Deep clone

  for (const suggestedRoom of booking.rooms) {
    const room = newHotel.floors
      .flatMap((floor) => floor.rooms)
      .find((r) => r.id === suggestedRoom.id);

    if (room) {
      room.isSelected = true;
    }
  }

  return {
    hotel: newHotel,
    booking,
  };
}
