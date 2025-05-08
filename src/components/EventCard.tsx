import React from 'react';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
  onBookClick: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onBookClick }) => {
  const availableSeats = event.totalSeats - event.bookedSeats;
  const isSoldOut = availableSeats <= 0;
  const isLowSeats = availableSeats <= 10 && !isSoldOut;
  
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
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        <div className="mb-4">
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
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span 
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold 
                ${isSoldOut 
                  ? 'bg-red-100 text-red-800' 
                  : isLowSeats 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}
            >
              {isSoldOut 
                ? 'Sold Out' 
                : `${availableSeats} ${availableSeats === 1 ? 'seat' : 'seats'} left`
              }
            </span>
          </div>
          
          <button
            onClick={() => onBookClick(event.id)}
            disabled={isSoldOut}
            className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 
              ${isSoldOut 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
          >
            {isSoldOut ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;