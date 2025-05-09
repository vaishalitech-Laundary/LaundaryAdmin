import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  FaHome, FaTags, FaEnvelope, FaList, FaChartBar,
  FaCalendarAlt, FaTasks, FaBell, FaFileInvoice,
  FaUsers, FaCog, FaSignOutAlt, FaLifeRing
} from 'react-icons/fa';

const menuItems = [
  { label: 'Dashboard', icon: <FaHome />, path: '/' },
  { label: 'Services', icon: <FaTags />, path: '/services' },
  { label: 'Inbox', icon: <FaEnvelope />, path: '/inbox' },
  { label: 'Order Lists', icon: <FaList />, path: '/orders' },
  { label: 'Reports & Analytics', icon: <FaChartBar />, path: '/reports' },
];

const pageItems = [
  { label: 'Pricing', icon: <FaTags />, path: '/pricing' },
  { label: 'Calender', icon: <FaCalendarAlt />, path: '/calendar' },
  { label: 'To-Do', icon: <FaTasks />, path: '/tasks' },
  { label: 'Notifications', icon: <FaBell />, path: '/notifications' },
  { label: 'Invoice', icon: <FaFileInvoice />, path: '/invoice' },
  { label: 'Team', icon: <FaUsers />, path: '/team' },
];

const Sidebar = () => (
  <div className="w-20 md:w-64 h-screen bg-[#1e3a5f] text-white flex flex-col py-4 overflow-y-auto">
    <div className="flex flex-col flex-grow">
      <nav className="space-y-1 px-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 ${
                isActive ? 'bg-white text-[#1e3a5f] font-semibold' : 'hover:bg-[#2d4a7a]'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <hr className="my-4 border-gray-500 mx-4" />

      <div className="px-4 mb-1 text-sm uppercase tracking-wider text-gray-300">Pages</div>

      <nav className="space-y-1 px-4">
        {pageItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 ${
                isActive ? 'bg-white text-[#1e3a5f] font-semibold' : 'hover:bg-[#2d4a7a]'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <hr className="my-4 border-gray-500 mx-4" />


      <NavLink
        to="/settings"
        className="flex items-center gap-3 px-4 py-2 mt-3 hover:bg-[#2d4a7a] transition"
      >
        <FaCog />
        <span>Settings</span>
      </NavLink>
    </div>

    {/* Help, Image, and Logout - part of the same div */}
    <div className=" px-12 mt-4 space-y-3">
      <div className="bg-white rounded-md p-2 flex justify-center shadow-md">
        <img
          src="https://media-hosting.imagekit.io/4ae94cd559a0411c/Untitled.jpg?Expires=1841317189&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1oCNWrT5J6sNKsdw9hNaQzPHm1NY~AYe9~peaPN4OptTYNlgMypYce0s3Iw4uc3uje7I-NOphJBkcsK8dlTSR3GDNije~gCR0be1GsWYlyYJEQILCIlW21J-jeBNw6QDC8vH6W09aTeIpXQU4qLp1JrLCS8f82D2F8B3AYbijcsoyFqp9joxr57Ra30J1o3fkjE0Hvg88FByVjn3vqokbP7gdw54hcf1L5U-lU59MXoOpemUOTFhBYa3Ikju04j08l2DbmVHKn2pqARn890yyO0h1yoLfxRke3VOj4vNV56NfUq~It230v2sACyoO5lxiKigCRxaAx~DJBCwqDOQEg__"
          alt="Help"
          className="rounded-md w-20 h-20 object-cover"
        />
      </div>

      <button className="w-full flex items-center  justify-center gap-2 py-2 bg-white text-[#1e3a5f] rounded-md hover:bg-gray-200 transition font-semibold">
        <FaLifeRing />
        Help
      </button>
      <NavLink  to="/logout">
      <button className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-semibold">
        <FaSignOutAlt />
        Log Out
      </button>
      </NavLink>
    </div>
  </div>
);

const AdminLayout = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-6 min-h-screen overflow-y-auto bg-gray-100">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
