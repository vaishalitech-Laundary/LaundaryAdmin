import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import '../../App.css'

function Index() {
  const [searchTerm, setSearchTerm] = useState('')

  // Sample data matching the Figma design exactly
  const orderData = [
    {
      id: '00001',
      name: 'Christine Brooks',
      address: '089 Kutch Green Apt. 448',
      date: '04 Sep 2019',
      services: 'Dry Cleaning',
      status: 'Completed',
      statusClass: 'status-completed'
    },
    {
      id: '00002',
      name: 'Rosie Pearson',
      address: '979 Immanuel Ferry Suite 526',
      date: '28 May 2019',
      services: 'Stain Removal',
      status: 'Processing',
      statusClass: 'status-processing'
    },
    {
      id: '00003',
      name: 'Darrell Caldwell',
      address: '8587 Frida Ports',
      date: '23 Nov 2019',
      services: 'Wash & Fold',
      status: 'Processing',
      statusClass: 'status-processing'
    },
    {
      id: '00004',
      name: 'Gilbert Johnston',
      address: '768 Destiny Lake Suite 600',
      date: '05 Feb 2019',
      services: 'Stain Removal',
      status: 'Completed',
      statusClass: 'status-completed'
    },
    {
      id: '00005',
      name: 'Alan Cain',
      address: '042 Mylene Throughway',
      date: '29 Jul 2019',
      services: 'Dry Cleaning',
      status: 'Processing',
      statusClass: 'status-processing'
    },
    {
      id: '00006',
      name: 'Alfred Murray',
      address: '543 Weimann Mountain',
      date: '15 Aug 2019',
      services: 'Stain Removal',
      status: 'Completed',
      statusClass: 'status-completed'
    },
    {
      id: '00007',
      name: 'Maggie Sullivan',
      address: 'New Scottsbluff',
      date: '21 Dec 2019',
      services: 'Ironing',
      status: 'Processing',
      statusClass: 'status-processing'
    },
    {
      id: '00008',
      name: 'Rosie Todd',
      address: 'New Jon',
      date: '30 Apr 2019',
      services: 'Wash & Fold',
      status: 'On Hold',
      statusClass: 'status-on-hold'
    },
  ]

  return (
    <div className="order-lists-container min-h-screen p-6">
      <div className=" max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Lists</h1>
          
          {/* Filters Section */}
          <div className="filter-bar p-6 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Filter Button */}
              <button className="filter-button flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              
              {/* Order Type Select */}
              <Select>
                <SelectTrigger className="w-[140px] h-10 border-gray-300">
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dry-cleaning">Dry Cleaning</SelectItem>
                  <SelectItem value="wash-fold">Wash & Fold</SelectItem>
                  <SelectItem value="stain-removal">Stain Removal</SelectItem>
                  <SelectItem value="ironing">Ironing</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Order Status Select */}
              <Select>
                <SelectTrigger className="w-[140px] h-10 border-gray-300">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Date Select */}
              <Select>
                <SelectTrigger className="w-[100px] h-10 border-gray-300">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Wash & Fold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input w-full"
                />
              </div>
              
              {/* Reset Filter Button */}
              <button className="reset-filter-button">
                Reset Filter
              </button>
            </div>
          </div>
          
          {/* Table */}
          <div className="data-table">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      NAME
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ADDRESS
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      SERVICES
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderData.map((order) => (
                    <tr key={order.id} className="table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {order.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {order.services}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${order.statusClass}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="pagination-info">
                Showing 1-09 of 78
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1 h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  
  )
}

export default Index