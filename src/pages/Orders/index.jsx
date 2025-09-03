import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Filter, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../App.css";
import axios from "axios";

function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [orderStatusModal, setOrderStatusModal] = useState(false);
  const [calendarModal, setCalendarModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const [orderData, setOrderData] = useState([]);

  // fetching all order from the server
  useEffect(() => {
    const orders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders/allorder",
          { withCredentials: true }
        );
        console.log("Fetched orders:", res.data.data);
        setOrderData(res.data.data); // ✅ only set the array
      } catch (error) {
        alert("server error");
      }
    };
    orders();
  }, []);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Filtering
  const filteredOrders = orderData.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.orderType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(order.orderType);

    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(order.status);

    const matchesDate =
      selectedDates.length === 0 ||
      selectedDates.some(
        (d) =>
          new Date(order.orderDate).toDateString() === d.toDateString()
      );

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Date format helper
  const formatDate = (isoString) => {
    return new Date(isoString)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-"); // DD-MM-YYYY
  };

  return (
    <div className="order-lists-container min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Lists</h1>

          {/* Filters Section */}
          <div className="filter-bar p-6 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Filter Button */}
              <button
                className="filter-button flex items-center gap-2"
                onClick={() => setShowFilterModal(true)}
              >
                <Filter className="h-4 w-4" />
                Filter
              </button>

              {/* Order Type Select */}
              <Select>
                <SelectTrigger
                  className="w-[140px] h-10 border-gray-300"
                  onClick={() => setShowFilterModal(true)}
                >
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
              </Select>

              {/* Order Status Select */}
              <Select>
                <SelectTrigger
                  className="w-[140px] h-10 border-gray-300"
                  onClick={() => setOrderStatusModal(true)}
                >
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
              </Select>

              {/* Date Select */}
              <Select>
                <SelectTrigger
                  className="w-[100px] h-10 border-gray-300"
                  onClick={() => setCalendarModal(true)}
                >
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
              </Select>

              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search order type"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input w-full"
                />
              </div>
              <button
                className="reset-filter-button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTypes([]);
                  setSelectedStatuses([]);
                  setSelectedDates([]);
                  setCurrentPage(1);
                }}
              >
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
                      Order Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => (
                    <tr key={order._id} className="table-row">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.orderType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.services?.map((s) => s.serviceName).join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
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
                Showing {startIndex + 1} -{" "}
                {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 h-8 w-8 p-0"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 h-8 w-8 p-0"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Type Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[521px] relative">
            <h2 className="text-lg font-semibold mb-4">Select Order Type</h2>
            <button
              className=" top-2 right-4 absolute text-gray-500 hover:text-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200 border rounded-full p-1"
              onClick={() => setShowFilterModal(false)}
            >
              <X className="h-4 w-6" />
            </button>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                "Dry Cleaning",
                "Stain Removal",
                "Steam Press",
                "Wash & Fold",
                "Wash & Iron",
                "Ironing Only",
                "Shoe Cleaning",
                "Curtain & Bedding Cleaning",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 py-2 rounded-2xl border text-sm font-medium transition ${
                    selectedTypes.includes(type)
                      ? "bg-[#7ED321] text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-6">
              *You can choose multiple order types
            </p>
            <Button
              className="w-[130px] bg-[#1F3C5F] hover:bg-[#2c5280] block m-auto cursor-pointer"
              onClick={() => setShowFilterModal(false)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      )}

      {/* Order Status Modal */}
      {orderStatusModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[521px] relative">
            <h2 className="text-lg font-semibold mb-4">Select Order Status</h2>
            <button
              className=" top-2 right-4 absolute text-gray-500 hover:text-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200 border rounded-full p-1"
              onClick={() => setOrderStatusModal(false)}
            >
              <X className="h-4 w-6" />
            </button>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["Pending Pickup", "Completed", "Rejected", "Refunded"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`px-3 py-2 rounded-2xl border text-sm font-medium transition ${
                      selectedStatuses.includes(status)
                        ? "bg-[#7ED321] text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
            <p className="text-xs text-gray-500 mb-6">
              *You can choose multiple statuses
            </p>
            <Button
              className="w-[130px] bg-[#1F3C5F] hover:bg-[#2c5280] block m-auto cursor-pointer"
              onClick={() => setOrderStatusModal(false)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {calendarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[360px] relative">
            <button
              className=" top-2 right-4 absolute text-gray-500 hover:text-gray-700 cursor-pointer "
              onClick={() => setCalendarModal(false)}
            >
              <X className="h-4 w-6" />
            </button>
            <DayPicker
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              captionLayout="buttons"
            />
            <p className="text-xs text-gray-500 mb-6">
              *You can choose multiple dates
            </p>
            <Button
              className="w-[130px] bg-[#1F3C5F] hover:bg-[#2c5280] block m-auto cursor-pointer"
              onClick={() => setCalendarModal(false)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
