import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import { generateId, hasAlreadyBooked } from '../utils/storage';

interface BookingModalProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  eventId, 
  isOpen, 
  onClose,
  onSuccess 
}) => {
  const { events, addBooking, getAvailableSeats } = useContext(EventContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(1);
  const [error, setError] = useState('');
  
  const event = events.find(e => e.id === eventId);
  const availableSeats = getAvailableSeats(eventId);
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setEmail('');
      setTickets(1);
      setError('');
    }
  }, [isOpen]);
  
  // Generate ticket options based on available seats
  const ticketOptions = [];
  const maxTickets = Math.min(10, availableSeats); // Limit to 10 or available seats, whichever is smaller
  for (let i = 1; i <= maxTickets; i++) {
    ticketOptions.push(i);
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!fullName.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Check if this email has already booked
    if (hasAlreadyBooked(eventId, email)) {
      setError('This email has already been used to book this event');
      return;
    }
    
    // Check available seats
    if (tickets > availableSeats) {
      setError(`Only ${availableSeats} seats available`);
      return;
    }
    
    // Create booking
    const bookingId = generateId();
    const booking = {
      id: bookingId,
      eventId,
      fullName,
      email,
      numberOfTickets: tickets,
      bookingDate: new Date().toISOString()
    };
    
    // Add booking and close modal
    addBooking(booking);
    onSuccess(bookingId);
  };
  
  if (!isOpen || !event) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden animate-scale-in"
        style={{animation: 'scale-in 0.2s ease-out'}}
      >
        <div className="bg-indigo-600 p-4 text-white">
          <h2 className="text-xl font-bold">Book Tickets</h2>
          <p className="text-indigo-100">{event.title}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="tickets" className="block text-gray-700 font-medium mb-2">
              Number of Tickets
            </label>
            <select
              id="tickets"
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={availableSeats === 0}
            >
              {ticketOptions.map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'ticket' : 'tickets'}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {availableSeats} seats available
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
              disabled={availableSeats === 0}
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;