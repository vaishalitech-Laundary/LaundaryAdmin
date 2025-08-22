import React, { useState } from "react";
import { Printer, Send } from "lucide-react";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({
    from: {
      name: "Virginia Walker",
      address: "9694 Krajcik Locks Suite 635",
    },
    to: {
      name: "Austin Miller",
      address: "Brookview",
    },
    invoiceDate: "12 Nov 2025",
    dueDate: "25 Dec 2025",
    items: [
      { id: 1, description: "Wash & fold", quantity: 2, baseCost: 20 },
      { id: 2, description: "Dry Cleaning", quantity: 2, baseCost: 50 },
      { id: 3, description: "Steam Press", quantity: 5, baseCost: 100 },
      { id: 4, description: "Ironing", quantity: 4, baseCost: 1000 },
    ],
  });

  const totalCost = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.baseCost,
    0
  );

  return (
    <div className="p-1 md:p-6 min-h-screen">
      <h1 className="text-lg md:text-2xl font-bold mb-4 text-lightText">
        Invoice
      </h1>

      <div className="bg-bgWhite shadow-md rounded-lg p-3 md:p-6">
        <div className="flex gap-2 md:flex-row md:justify-between md:gap-0 mb-6 text-darkText text-[8px] md:text-base">
          <div className=" flex flex-col gap-1">
            <p className="font-semibold">Invoice From :</p>
            <div>
              <p>{invoiceData.from.name}</p>
              <p>{invoiceData.from.address}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Invoice To :</p>
            <div>
              <p>{invoiceData.to.name}</p>
              <p>{invoiceData.to.address}</p>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <p>Invoice Date : {invoiceData.invoiceDate}</p>
            <p>Due Date : {invoiceData.dueDate}</p>
          </div>
        </div>
        <div className=" overflow-x-auto md:overflow-visible">
          <table className="w-full border-collapse text-darkText text-[10px] md:text-base text-center">
            <thead>
              <tr className="bg-bgBar text-[8px] md:text-sm text-darkText">
                <th className="p-1 md:p-2">Serial No.</th>
                <th className="p-1 md:p-2">Description</th>
                <th className="p-1 md:p-2">Quantity</th>
                <th className="p-1 md:p-2">Base Cost</th>
                <th className="p-1 md:p-2">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, idx) => (
                <tr key={item.id} className="border-b  border-bgPri/10 text-[8px] md:text-sm font-semibold text-darkText/90">
                  <td className="p-1 md:p-2">{idx + 1}</td>
                  <td className="p-1 md:p-2">{item.description}</td>
                  <td className="p-1 md:p-2">{item.quantity}</td>
                  <td className="p-1 md:p-2">₹{item.baseCost}</td>
                  <td className="p-1 md:p-2">₹{item.quantity * item.baseCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4 text-xs md:text-lg font-semibold text-darkText">
          <p>
            Total = <span className="ml-2">₹{totalCost}</span>
          </p>
        </div>
        <div className="flex justify-end space-x-2 md:space-x-4 mt-4 md:mt-6">
          <button className="px-2 md:px-4 md:py-2 rounded-lg bg-lightText text-lightText hover:opacity-90 border-1 border-bgPri/10">
            <Printer className="w-3 h-3 md:w-4 md:h-4 text-black" />
          </button>
          <button className="px-2 md:px-3 py-1 md:py-2 flex gap-2 md:gap-3 rounded-lg bg-bgPri text-lightText hover:opacity-90 text-[11px] md:text-base">
            Send
            <div className="px-2 md:px-3 py-1 bg-white/10 rounded-lg">
              <Send className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
