export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  totalSeats: number;
  bookedSeats: number;
  imageUrl: string;
}

export interface Booking {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  numberOfTickets: number;
  bookingDate: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}