import { HotelProvider } from "./lib/HotelContext";
import "./globals.css";

export const metadata = {
  title: "Hotel Room Reservation System",
  description: "A system for booking hotel rooms with optimal travel time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HotelProvider>{children}</HotelProvider>
      </body>
    </html>
  );
}
