import React from 'react'
import { AreaChart as RechartsAreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const AreaChart = ({ title, data, height = 300, showTitle = true }) => {
  // Determine the data structure and render appropriate areas
  const hasCurrentPrevious = data[0]?.current !== undefined
  const hasIncomeSubscription = data[0]?.income !== undefined
  const hasCustomers = data[0]?.customers !== undefined

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
     {showTitle && (
  <div className="mb-6 border-b pb-4">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">Statistics</p>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      {/* Button groups only for Sales Report */}
      {hasCurrentPrevious && title === "Sales report" && (
        <div className="flex items-center space-x-4">
          {/* Left group - Service vs Subscription */}
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md border text-sm text-gray-700 hover:bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Service sales</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md border text-sm text-gray-700 hover:bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Subscription sales</span>
            </button>
          </div>

          {/* Right group - Days toggle */}
          <div className="flex space-x-1 bg-gray-50 rounded-xl p-1">
            <button className="px-3 py-1 text-sm text-gray-500 rounded-lg hover:bg-white">
              7 days
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 rounded-lg hover:bg-white">
              30 days
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-green-500 text-black rounded-lg">
              12 months
            </button>
          </div>
        </div>
      )}

      {/* Legend only for Total Income */}
      {title === "Total income" && (
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-gray-700">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Services</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-700">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Subscriptions</span>
          </div>
        </div>
      )}
    </div>
  </div>
)}

      
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FCD34D" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D1D5DB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D1D5DB" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="subscriptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="customersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey={data[0]?.month ? "month" : data[0]?.time ? "time" : "week"} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              hide={!showTitle}
            />
            
            {/* Render areas based on data structure */}
            {hasCurrentPrevious && (
              <>
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#D1D5DB" 
                  strokeWidth={2}
                  fill="url(#previousGradient)" 
                  strokeDasharray="5,5"
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#FCD34D" 
                  strokeWidth={2}
                  fill="url(#currentGradient)" 
                />
              </>
            )}
            
            {hasIncomeSubscription && (
              <>
                <Area 
                  type="monotone" 
                  dataKey="subscription" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  fill="url(#subscriptionGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  fill="url(#incomeGradient)" 
                />
              </>
            )}
            
            {hasCustomers && (
              <Area 
                type="monotone" 
                dataKey="customers" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fill="url(#customersGradient)" 
              />
            )}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AreaChart

