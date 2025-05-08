import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import EventCard from './EventCard';

interface EventListProps {
  onBookClick: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({ onBookClick }) => {
  const { events } = useContext(EventContext);
  
  if (events.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No events available at the moment.</h3>
        <p className="text-gray-500 mt-2">Check back later for upcoming events!</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          onBookClick={onBookClick} 
        />
      ))}
    </div>
  );
};

export default EventList;