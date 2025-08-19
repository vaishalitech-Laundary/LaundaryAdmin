import React, { useState } from "react";

export default function TeamMember() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "CEO",
    gender: "Male",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setForm({ ...form, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Team Member</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 flex flex-col items-center"
      >
        
        <label className="flex flex-col items-center cursor-pointer mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="mt-2 text-sm font-semibold text-blue-900">Upload Photo</span>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="hidden"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          <div>
            <label className="block text-sm text-gray-500 font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border  rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-500  text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full bg-gray-100 border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">Your email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border bg-gray-100 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border bg-gray-100 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">Position</label>
            <input
              type="text"
              name="position"
              placeholder="CEO"
              value={form.position}
              onChange={handleChange}
              className="w-full  bg-gray-100 border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-[50%] bg-gray-100 border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        
        <button
          type="submit"
          className="mt-8 bg-blue-900 text-white px-12 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Now
        </button>
      </form>
    </div>
  );
}