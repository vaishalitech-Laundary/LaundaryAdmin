import React from 'react'
import { LineChart as RechartsLineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const LineChart = ({ title, subtitle, data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-green-600 font-medium">{subtitle}</p>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Tooltip indicator */}
      <div className="flex justify-center mt-4">
        <div className="bg-green-500 text-white px-2 py-1 rounded text-sm">
          +5%
        </div>
      </div>
    </div>
  )
}

export default LineChart

