import { Event, Booking, AdminCredentials } from '../types';

// Get events from localStorage or use default data
export const getEvents = (): Event[] => {
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    return JSON.parse(storedEvents);
  }

  // Default events if none in localStorage
  const defaultEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2025',
      date: '2025-06-15',
      time: '09:00 AM',
      location: 'Convention Center, San Francisco',
      totalSeats: 200,
      bookedSeats: 45,
      imageUrl: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      title: 'Music Festival',
      date: '2025-07-22',
      time: '04:00 PM',
      location: 'Central Park, New York',
      totalSeats: 500,
      bookedSeats: 320,
      imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '3',
      title: 'Business Workshop',
      date: '2025-06-28',
      time: '10:00 AM',
      location: 'Business Hub, Chicago',
      totalSeats: 75,
      bookedSeats: 65,
      imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '4',
      title: 'Art Exhibition',
      date: '2025-08-10',
      time: '11:00 AM',
      location: 'Art Gallery, Los Angeles',
      totalSeats: 120,
      bookedSeats: 40,
      imageUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  localStorage.setItem('events', JSON.stringify(defaultEvents));
  return defaultEvents;
};

// Get bookings from localStorage or return empty array
export const getBookings = (): Booking[] => {
  const storedBookings = localStorage.getItem('bookings');
  if (storedBookings) {
    return JSON.parse(storedBookings);
  }
  return [];
};

// Admin credentials (in a real app, this would be server-side)
export const adminCredentials: AdminCredentials = {
  username: 'admin',
  password: 'admin123'
};