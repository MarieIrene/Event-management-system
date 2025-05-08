import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white py-6">
              <div className="container mx-auto px-4 text-center">
                <p>&copy; 2025 EventLite. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;