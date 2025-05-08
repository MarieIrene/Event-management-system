import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { Booking } from '../types';

interface ConfirmationModalProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  bookingId, 
  isOpen, 
  onClose 
}) => {
  const { events, bookings } = useContext(EventContext);
  
  if (!isOpen) return null;
  
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return null;
  
  const event = events.find(e => e.id === booking.eventId);
  if (!event) return null;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg max-w-md w-full mx-4 animate-scale-in"
        style={{animation: 'scale-in 0.2s ease-out'}}
      >
        <div className="bg-green-600 p-4 text-white">
          <h2 className="text-xl font-bold">Booking Confirmed</h2>
          <p className="text-green-100">Thank you for your booking!</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span> {formatDate(event.date)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Time:</span> {event.time}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Location:</span> {event.location}
            </p>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-800 mb-2">Booking Details</h4>
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {booking.fullName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {booking.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Tickets:</span> {booking.numberOfTickets}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Booking ID:</span> {booking.id}
            </p>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            A confirmation email has been sent to your email address. Please save your booking ID for reference.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;