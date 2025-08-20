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
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm">
              {hasCurrentPrevious && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-600">Current year</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-600">Previous year</span>
                  </div>
                </>
              )}
              {hasIncomeSubscription && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Income</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">Subscription</span>
                  </div>
                </>
              )}
            </div>
            <div>
              <select className="text-sm border rounded px-2 py-1">
                <option>12 months</option>
              </select>
            </div>
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

