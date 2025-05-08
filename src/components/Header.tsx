import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CalendarDays } from 'lucide-react';

const Header: React.FC = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <CalendarDays size={28} />
            <span className="font-bold text-xl">EventLite</span>
          </Link>
          
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className="hover:text-indigo-200 transition-colors">
                  Events
                </Link>
              </li>
              
              {isAdmin ? (
                <>
                  <li>
                    <Link to="/admin/dashboard" className="hover:text-indigo-200 transition-colors">
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/admin" 
                    className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;