export function generateHotel() {
  const hotel = { floors: [], totalRooms: 97 };

  // Generate floors 1-9 with 10 rooms each
  for (let floor = 1; floor <= 9; floor++) {
    const rooms = [];
    for (let room = 1; room <= 10; room++) {
      rooms.push({
        id: `${floor}${room.toString().padStart(2, "0")}`,
        floor,
        number: room,
        position: room,
        isBooked: false,
        isSelected: false,
      });
    }
    hotel.floors.push({ floorNumber: floor, rooms });
  }

  // Generate floor 10 with 7 rooms
  const floor10Rooms = [];
  for (let room = 1; room <= 7; room++) {
    floor10Rooms.push({
      id: `100${room}`,
      floor: 10,
      number: room,
      position: room,
      isBooked: false,
      isSelected: false,
    });
  }
  hotel.floors.push({ floorNumber: 10, rooms: floor10Rooms });

  return hotel;
}

export function generateRandomOccupancy(hotel, occupancyRate = 0.7) {
  const newHotel = JSON.parse(JSON.stringify(hotel)); // Deep clone

  for (const floor of newHotel.floors) {
    for (const room of floor.rooms) {
      room.isBooked = Math.random() < occupancyRate;
      room.isSelected = false; // Reset any selections
    }
  }

  return newHotel;
}

export function getAvailableRooms(hotel) {
  return hotel.floors
    .flatMap((floor) => floor.rooms)
    .filter((room) => !room.isBooked);
}

export function getSelectedRooms(hotel) {
  return hotel.floors
    .flatMap((floor) => floor.rooms)
    .filter((room) => room.isSelected);
}

export function resetHotel(hotel) {
  const newHotel = JSON.parse(JSON.stringify(hotel)); // Deep clone

  for (const floor of newHotel.floors) {
    for (const room of floor.rooms) {
      room.isBooked = false;
      room.isSelected = false;
    }
  }

  return newHotel;
}

export function clearSelections(hotel) {
  const newHotel = JSON.parse(JSON.stringify(hotel)); // Deep clone

  for (const floor of newHotel.floors) {
    for (const room of floor.rooms) {
      room.isSelected = false;
    }
  }

  return newHotel;
}

export function findRoomById(hotel, roomId) {
  for (const floor of hotel.floors) {
    const room = floor.rooms.find((r) => r.id === roomId);
    if (room) return room;
  }
  return null;
}

export function toggleRoomSelection(hotel, roomId) {
  const newHotel = JSON.parse(JSON.stringify(hotel)); // Deep clone
  const room = findRoomById(newHotel, roomId);

  if (room && !room.isBooked) {
    room.isSelected = !room.isSelected;
  }

  return newHotel;
}

export function bookSelectedRooms(hotel) {
  const newHotel = JSON.parse(JSON.stringify(hotel)); // Deep clone

  for (const floor of newHotel.floors) {
    for (const room of floor.rooms) {
      if (room.isSelected) {
        room.isBooked = true;
        room.isSelected = false;
      }
    }
  }

  return newHotel;
}
