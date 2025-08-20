import React from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts'

const SalesChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Sales 2023</h3>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-green-600">$12.7k</span>
            <span className="text-sm text-gray-500">8.2% vs last year</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded">Monthly</button>
          <button className="px-3 py-1 text-sm bg-green-500 text-white rounded">Annually</button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `${value/1000}k`}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              fill="url(#salesGradient)" 
            />
            <ReferenceLine 
              x="Jul" 
              stroke="#22C55E" 
              strokeWidth={2}
              strokeDasharray="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Tooltip indicator */}
      <div className="flex justify-center mt-4">
        <div className="bg-green-500 text-white px-2 py-1 rounded text-sm">
          $5,458
        </div>
      </div>
    </div>
  )
}

export default SalesChart

