import React from 'react'
import '../../App.css'
import MetricCard from '../../components/MetricCard'
import SalesChart from '../../components/SalesChart'
import LineChart from '../../components/LineChart'
import AreaChart from '../../components/AreaChart'
import MultiLineChart from '../../components/MultiLineChart'

function index() {
  // Sample data for the dashboard
  const metricsData = [
    {
      title: "Realtime users",
      value: "635",
      chartData: [
        { time: 1, value: 20 },
        { time: 2, value: 35 },
        { time: 3, value: 25 },
        { time: 4, value: 45 },
        { time: 5, value: 30 },
        { time: 6, value: 55 },
        { time: 7, value: 40 }
      ],
      color: "#3B82F6"
    },
    {
      title: "Total visits",
      value: "325k",
      chartData: [
        { time: 1, value: 30 },
        { time: 2, value: 45 },
        { time: 3, value: 55 },
        { time: 4, value: 35 },
        { time: 5, value: 65 },
        { time: 6, value: 45 },
        { time: 7, value: 75 }
      ],
      color: "#10B981"
    },
    {
      title: "Visit duration",
      value: "5m 8s",
      chartData: [
        { time: 1, value: 40 },
        { time: 2, value: 25 },
        { time: 3, value: 45 },
        { time: 4, value: 30 },
        { time: 5, value: 35 },
        { time: 6, value: 20 },
        { time: 7, value: 25 }
      ],
      color: "#EF4444"
    }
  ]

  const salesData = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
    { month: 'Jul', value: 7000 },
    { month: 'Aug', value: 6500 },
    { month: 'Sep', value: 8000 },
    { month: 'Oct', value: 7500 },
    { month: 'Nov', value: 9000 },
    { month: 'Dec', value: 8500 }
  ]

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              chartData={metric.chartData}
              color={metric.color}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <SalesChart data={salesData} />
          </div>

          {/* Line Charts */}
          <LineChart 
            title="6,345"
            subtitle="1.5% vs last month"
            data={[
              { time: 'Mon', value: 20 },
              { time: 'Tue', value: 35 },
              { time: 'Wed', value: 25 },
              { time: 'Thu', value: 45 },
              { time: 'Fri', value: 30 },
              { time: 'Sat', value: 55 },
              { time: 'Sun', value: 40 }
            ]}
          />

          <MultiLineChart 
            title="9,845"
            subtitle="Last 30 days"
            data={[
              { week: 'Week 1', line1: 30, line2: 45, line3: 25, line4: 35 },
              { week: 'Week 2', line1: 45, line2: 35, line3: 40, line4: 25 },
              { week: 'Week 3', line1: 25, line2: 55, line3: 30, line4: 45 },
              { week: 'Week 4', line1: 55, line2: 25, line3: 50, line4: 35 }
            ]}
          />
        </div>

        {/* Sales Report - Full Width */}
        <div className="mb-8">
          <AreaChart 
            title="Sales report"
            data={[
              { month: 'Jan', current: 4000, previous: 3500 },
              { month: 'Feb', current: 3000, previous: 4000 },
              { month: 'Mar', current: 5000, previous: 3000 },
              { month: 'Apr', current: 4500, previous: 5500 },
              { month: 'May', current: 6000, previous: 4000 },
              { month: 'Jun', current: 5500, previous: 6500 },
              { month: 'Jul', current: 7000, previous: 5000 },
              { month: 'Aug', current: 6500, previous: 7500 },
              { month: 'Sep', current: 8000, previous: 6000 },
              { month: 'Oct', current: 7500, previous: 8500 },
              { month: 'Nov', current: 9000, previous: 7000 },
              { month: 'Dec', current: 8500, previous: 9500 }
            ]}
            height={400}
          />
        </div>

        {/* Bottom Charts - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total Income */}
          <AreaChart 
            title="Total income"
            data={[
              { month: 'Jan', income: 2000, subscription: 1500 },
              { month: 'Feb', income: 2500, subscription: 1800 },
              { month: 'Mar', income: 2200, subscription: 1600 },
              { month: 'Apr', income: 2800, subscription: 2000 },
              { month: 'May', income: 2600, subscription: 1900 },
              { month: 'Jun', income: 3000, subscription: 2200 }
            ]}
            height={300}
          />
          
          {/* Real-time Customers */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Real-time customers</h3>
              <span className="text-2xl font-bold text-gray-900">1,027</span>
            </div>
            <AreaChart 
              data={[
                { time: '10:00', customers: 400 },
                { time: '12:00', customers: 600 },
                { time: '14:00', customers: 800 },
                { time: '16:00', customers: 1000 },
                { time: '18:00', customers: 700 }
              ]}
              height={250}
              showTitle={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index

