import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminEventForm from '../components/AdminEventForm';
import AdminBookingList from '../components/AdminBookingList';

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);
  
  if (!isAdmin) {
    return null;
  }
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-indigo-600 text-white py-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-indigo-100">Manage events and view bookings</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AdminEventForm />
          </div>
          
          <div className="lg:col-span-2">
            <AdminBookingList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;