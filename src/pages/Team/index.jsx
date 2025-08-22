import React from "react";

const Team = () => {
  const member = {
    name: "Sai sharma",
    role: "CEO",
    email: "sai.sharma@example.com",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const members = new Array(12).fill(member);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-darkText">Team</h2>
        <button className="bg-bgPri text-lightText px-4 py-2 rounded-lg shadow transition">
          Add New Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((m, index) => (
          <div
            key={index}
            className="bg-bgWhite rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={m.img}
              alt={m.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-lbBlue"
            />
            <h3 className="text-lg font-semibold text-darkText">{m.name}</h3>
            <p className="text-darkText">{m.role}</p>
            <p className="text-darkText text-sm mt-2">{m.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
