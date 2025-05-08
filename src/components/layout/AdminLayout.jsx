import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      {/* Navbar, Sidebar, etc. yahan aayega agar ho */}
      <h1>AdminLayout</h1>
      <Outlet /> {/* Nested route yahan render honge */}
    </div>
  );
};

export default AdminLayout;
