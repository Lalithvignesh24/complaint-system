import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// 1. Removed the import for HomePage
import ComplaintForm from './components/ComplaintForm';
import AdminDashboard from './components/AdminDashboard';
import StatusTracker from './components/StatusTracker';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const linkStyles = "text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition";
  const activeLinkStyles = "bg-slate-800 text-white";

  return (
    <Router>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col">
        <nav className="bg-slate-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              <NavLink to="/" className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="College Logo" 
                  className="h-9 w-auto **rounded-full**"
                />
                <span className="text-xl font-bold text-white">
                  Complaint System
                </span>
              </NavLink>

              <div className="flex space-x-4">
                {/* 2. Changed this link back to point to "/" */}
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ''}`}
                >
                  Submit Complaint
                </NavLink>
                <NavLink 
                  to="/track" 
                  className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ''}`}
                >
                  Track Status
                </NavLink>
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : ''}`}
                >
                  Admin
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="py-10 flex-grow">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Routes>
              {/* 3. Set the main route "/" back to the ComplaintForm */}
              <Route path="/" element={<ComplaintForm />} />
              <Route path="/track" element={<StatusTracker />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;