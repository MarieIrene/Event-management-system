import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const AdminBookingList: React.FC = () => {
  const { events, bookings } = useContext(EventContext);
  
  // Sort bookings by date (newest first)
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
  );
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get event title by ID
  const getEventTitle = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Unknown Event';
  };
  
  if (bookings.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Bookings</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No bookings have been made yet.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h3 className="text-lg font-bold text-gray-800 p-6 pb-4">Bookings</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booked on
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getEventTitle(booking.eventId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.fullName}</div>
                  <div className="text-sm text-gray-500">{booking.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.numberOfTickets}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(booking.bookingDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookingList;