import React from 'react';
import { Bell, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-[#0C2A4D] text-white px-4 py-2 shadow flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSidyDz4vUFPC_pC4WT44M-8OE1iyO2TcSr0Q&s" alt="Logo" className="h-8" />
        <span className="text-sm font-semibold tracking-widest">FRESHFOLD</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4 max-w-md">
        <div className="flex items-center bg-[#143659] px-3 py-1 rounded border border-[#2f4f6e]">
          <Search className="h-4 w-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-white px-2 w-full"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="h-5 w-5 text-white" />
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
            1
          </span> */}
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
