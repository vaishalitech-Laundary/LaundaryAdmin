import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: '10th', sales: 1000 },
  { name: '11th', sales: 3000 },
  { name: '12th', sales: 2000 },
  { name: '13th', sales: 2780 },
  { name: '14th', sales: 1890 },
  { name: '15th', sales: 2390 },
  { name: '16th', sales: 3490 },
];

const Index = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-[250px]">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total User', value: '40,689', change: '+8.6% Up from yesterday', color: 'green' },
          { title: 'Total Order', value: '10,293', change: '+1.5% Up from past week', color: 'blue' },
          { title: 'Total Sales', value: '$89,000', change: '-3.4% Down from yesterday', color: 'red' },
          { title: 'Total Pending', value: '2040', change: '+1.8% Up from yesterday', color: 'green' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-sm text-gray-500">{item.title}</h2>
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className={`text-xs mt-1 text-${item.color}-500`}>{item.change}</p>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700">Sales Details</h2>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
            October
          </span>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700">Deals Details</h2>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
            October
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Service Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date - Time</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: 'Dry Cleaning', location: '6065 Midpatible Landing', date: '12.19.2019 - 12:35 PM', phone: '423', amount: '₹2500', status: 'Delivered' },
                { service: 'Wash & Fold', location: '6065 Midpatible Landing', date: '12.19.2019 - 12:35 PM', phone: '423', amount: '₹1500', status: 'Pending' },
                { service: 'Ironing', location: '6065 Midpatible Landing', date: '12.19.2019 - 12:35 PM', phone: '423', amount: '₹2000', status: 'Delivered' },
              ].map((item, idx) => (
                <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{item.service}</td>
                  <td className="px-4 py-2">{item.location}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.phone}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.status === 'Delivered'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
