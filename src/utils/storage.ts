import { Event, Booking } from '../types';

// Save events to localStorage
export const saveEvents = (events: Event[]): void => {
  localStorage.setItem('events', JSON.stringify(events));
};

// Save bookings to localStorage
export const saveBookings = (bookings: Booking[]): void => {
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

// Add a new event
export const addEvent = (event: Event): void => {
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
};

// Add a new booking
export const addBooking = (booking: Booking): void => {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  
  // Update event's booked seats
  updateEventSeats(booking.eventId, booking.numberOfTickets);
};

// Update event seats after booking
export const updateEventSeats = (eventId: string, numberOfTickets: number): void => {
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const updatedEvents = events.map((event: Event) => {
    if (event.id === eventId) {
      return {
        ...event,
        bookedSeats: event.bookedSeats + numberOfTickets
      };
    }
    return event;
  });
  
  localStorage.setItem('events', JSON.stringify(updatedEvents));
};

// Check if email has already booked for an event
export const hasAlreadyBooked = (eventId: string, email: string): boolean => {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  return bookings.some((booking: Booking) => 
    booking.eventId === eventId && booking.email.toLowerCase() === email.toLowerCase()
  );
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};