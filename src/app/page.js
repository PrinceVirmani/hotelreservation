"use client";

import BookingForm from "./components/BookingForm";
import Hotel from "./components/Hotel";
import BookingSummary from "./components/BookingSummary";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          Hotel Room Reservation System
        </h1>
        <p className="text-gray-600">
          Book rooms with optimal travel time between them
        </p>
      </header>

      <BookingForm />
      <Hotel />
      <BookingSummary />

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Hotel Room Reservation System &copy; {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
