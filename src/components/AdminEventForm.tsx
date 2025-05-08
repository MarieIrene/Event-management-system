import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { generateId } from '../utils/storage';

const AdminEventForm: React.FC = () => {
  const { addEvent } = useContext(EventContext);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    totalSeats: 100,
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalSeats' ? parseInt(value) || 0 : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Validation
    if (!formData.title.trim() || !formData.date || !formData.time || !formData.location.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.totalSeats <= 0) {
      setError('Total seats must be greater than 0');
      return;
    }
    
    // Use default image if none provided
    const imageUrl = formData.imageUrl.trim() || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    
    // Create new event
    const newEvent = {
      id: generateId(),
      ...formData,
      imageUrl,
      bookedSeats: 0
    };
    
    // Add event
    addEvent(newEvent);
    
    // Reset form
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      totalSeats: 100,
      imageUrl: ''
    });
    
    setSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Event</h3>
      
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md">
          Event added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date*
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time*
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location*
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 mb-1">
            Total Seats*
          </label>
          <input
            type="number"
            id="totalSeats"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Event Image URL (optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://example.com/image.jpg"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave blank to use a default image
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AdminEventForm;