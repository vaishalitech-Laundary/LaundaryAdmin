import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const MetricCard = ({ title, value, chartData, color }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border h-[220px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {/* Bigger chart */}
        <div className="w-52 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
