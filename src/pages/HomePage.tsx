import React, { useState } from 'react';
import EventList from '../components/EventList';
import BookingModal from '../components/BookingModal';
import ConfirmationModal from '../components/ConfirmationModal';

const HomePage: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);
  
  const handleBookClick = (eventId: string) => {
    setSelectedEventId(eventId);
  };
  
  const handleCloseModal = () => {
    setSelectedEventId(null);
  };
  
  const handleBookingSuccess = (bookingId: string) => {
    setSelectedEventId(null);
    setBookingConfirmed(bookingId);
  };
  
  const handleCloseConfirmation = () => {
    setBookingConfirmed(null);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-indigo-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Discover and book tickets for exciting events happening near you. From concerts to workshops, find something for everyone.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <EventList onBookClick={handleBookClick} />
        
        <BookingModal 
          eventId={selectedEventId || ''} 
          isOpen={selectedEventId !== null}
          onClose={handleCloseModal}
          onSuccess={handleBookingSuccess}
        />
        
        <ConfirmationModal
          bookingId={bookingConfirmed || ''}
          isOpen={bookingConfirmed !== null}
          onClose={handleCloseConfirmation}
        />
      </div>
    </div>
  );
};

export default HomePage;