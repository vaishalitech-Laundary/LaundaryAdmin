import React, { useState } from 'react';
import data from "./serviceData.json";
import { FiSearch, FiFilter } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiChevronRight } from 'react-icons/bi';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState({});
  
  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Function to get appropriate color for service heading
  const getHeadingColorClasses = (heading) => {
    const headingType = heading?.toUpperCase();
    
    switch(headingType) {
      case 'WASH & FOLD':
        return 'text-amber-700 bg-amber-200';
      case 'DRY CLEANING':
        return 'text-blue-700 bg-blue-200';
      case 'IRONING':
        return 'text-purple-700 bg-purple-200';
      case 'STAIN REMOVAL':
        return 'text-red-700 bg-red-200';
      default:
        return 'text-green-700 bg-green-200';
    }
  };

  const filteredServices = data.filter(service => 
    service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-6">Services</h1>
      
      {/* Filter and Search Section */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        {/* Filter Button */}
        <div className="flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md">
            <FiFilter className="text-gray-600" />
            <span>Filter</span>
            <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {filteredServices.length}
            </span>
          </button>
        </div>

        {/* Search Box */}
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Wash & Fold" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Sort by:</span>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md">
              Service Type
              <IoMdArrowDropdown />
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md font-medium">
          Reset Filter
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="rounded-lg overflow-hidden shadow-md bg-white">
            {/* Service Image */}
            <div className="relative h-48">
              <img 
                src="https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt={service.name} 
                className="w-full h-full object-cover" 
              />
              <button 
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                onClick={() => toggleFavorite(service.id)}
              >
                {favorites[service.id] ? 
                  <FaHeart className="text-red-500" /> : 
                  <FaRegHeart className="text-gray-400" />
                }
              </button>
            </div>

            {/* Service Info */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs uppercase p-1 rounded-xl ${getHeadingColorClasses(service.heading)}`}>
                  {service.heading}
                </span>
                <span className="font-semibold">{service.priceLabel}</span>
              </div>
              <p className="text-sm text-gray-700 mb-4">{service.shortDescription}</p>
              
              <div className="flex justify-end">
                <button className="flex items-center gap-1 text-blue-600 text-sm">
                  Edit Details <BiChevronRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;