import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Event, Booking } from '../types';
import { getEvents, getBookings } from '../utils/mockData';
import { saveEvents, saveBookings, addEvent as addEventToStorage, addBooking as addBookingToStorage } from '../utils/storage';

interface EventContextType {
  events: Event[];
  bookings: Booking[];
  addEvent: (event: Event) => void;
  addBooking: (booking: Booking) => void;
  getAvailableSeats: (eventId: string) => number;
}

export const EventContext = createContext<EventContextType>({
  events: [],
  bookings: [],
  addEvent: () => {},
  addBooking: () => {},
  getAvailableSeats: () => 0
});

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load initial data
    setEvents(getEvents());
    setBookings(getBookings());
  }, []);

  const addEvent = (event: Event) => {
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    addEventToStorage(event);
  };

  const addBooking = (booking: Booking) => {
    // Add the booking
    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    saveBookings(updatedBookings);
    
    // Update the event's booked seats
    const updatedEvents = events.map(event => {
      if (event.id === booking.eventId) {
        return {
          ...event,
          bookedSeats: event.bookedSeats + booking.numberOfTickets
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    addBookingToStorage(booking);
  };

  const getAvailableSeats = (eventId: string): number => {
    const event = events.find(e => e.id === eventId);
    if (!event) return 0;
    return event.totalSeats - event.bookedSeats;
  };

  return (
    <EventContext.Provider 
      value={{ 
        events, 
        bookings, 
        addEvent, 
        addBooking, 
        getAvailableSeats 
      }}
    >
      {children}
    </EventContext.Provider>
  );
};