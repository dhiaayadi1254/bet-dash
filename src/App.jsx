// src/App.jsx
import React, { useState } from 'react';
import SuperAdmin from './pages/SuperAdmin';
import Admin from './pages/Admin';
import SubAdmin from './pages/SubAdmin';
import Client from './pages/Client';

function App() {
  const [currentPage, setCurrentPage] = useState('superadmin');

  const renderPage = () => {
    switch(currentPage) {
      case 'superadmin': return <SuperAdmin />;
      case 'admin': return <Admin />;
      case 'subadmin': return <SubAdmin />;
      case 'client': return <Client />;
      default: return <SuperAdmin />;
    }
  };

  return (
    <div className="App">
      {/* شريط التنقل للتبديل بين الصفحات */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => setCurrentPage('superadmin')} 
            className="hover:bg-gray-700 px-3 py-1 rounded"
          >
            Super Admin
          </button>
          <button 
            onClick={() => setCurrentPage('admin')} 
            className="hover:bg-gray-700 px-3 py-1 rounded"
          >
            Admin
          </button>
          <button 
            onClick={() => setCurrentPage('subadmin')} 
            className="hover:bg-gray-700 px-3 py-1 rounded"
          >
            Sub Admin
          </button>
          <button 
            onClick={() => setCurrentPage('client')} 
            className="hover:bg-gray-700 px-3 py-1 rounded"
          >
            Client
          </button>
        </div>
      </nav>

      {renderPage()}
    </div>
  );
}

export default App;