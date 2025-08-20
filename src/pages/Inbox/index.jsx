import React from "react";
import { Search, Mail, Star, SendHorizontal, Pencil, TriangleAlert, MessageSquareHeart, Trash2, Archive } from "lucide-react";

const emails = [
  {
    name: "Jullu Jalal",
    label: "Primary",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
  },
  {
    name: "Minerva Barnett",
    label: "Work",
    subject: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
  },
  {
    name: "Peter Lewis",
    label: "Friends",
    subject: "Vacation Home Rental Success",
    time: "7:52 PM",
  },
  {
    name: "Anthony Briggs",
    label: "Work",
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
  },
  {
    name: "Clifford Morgan",
    label: "Social",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
  },
  {
    name: "Cecilia Webster",
    label: "Friends",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
  },
  {
    name: "Harvey Manning",
    label: "Work",
    subject: "Curling Irons Are As Individual As The Women Who Use Them",
    time: "2:30 PM",
  },
  {
    name: "Willie Blake",
    label: "Primary",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
  },
  {
    name: "Minerva Barnett",
    label: "Work",
    subject: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
  },
  {
    name: "Fanny Weaver",
    label: "Work",
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
  },
  {
    name: "Olga Hogan",
    label: "Social",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
  },
  {
    name: "Lora Houston",
    label: "Friends",
    subject: "Vacation Home Rental Success",
    time: "7:52 PM",
  },
];

const index = () => {
  return (
    <div className="flex gap-5 h-screen bg-bgWhite w-full">

      {/* Sidebar */}
      <div className="w-64 bg-white  shadow-xl px-7 py-10 flex flex-col rounded-4xl border-1 border-[#B9B9B9]">
        <button className="bg-bgPri text-lightText rounded-lg py-2 px-4 mb-6 ">
          + Compose
        </button>

        <div className="flex flex-col space-y-3 mt-5">

          <div className="flex items-center justify-between">
            <div className="flex gap-3 justify-center items-center">
              <Mail className="h-5" />
              <span className="flex items-center space-x-2">Inbox</span>
            </div>
            <span className="text-sm text-gray-500">1253</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 justify-center items-center">
              <Star className="h-5" />
              <span className="flex items-center space-x-2">Starred</span>
            </div>
            <span className="text-sm text-gray-500">1253</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 justify-center items-center">
              <SendHorizontal className="h-5" />
              <span className="flex items-center space-x-2">Sent</span>
            </div>
            <span className="text-sm text-gray-500">1253</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 justify-center items-center">
              <Pencil className="h-5" />
              <span className="flex items-center space-x-2">Draft</span>
            </div>
            <span className="text-sm text-gray-500">1253</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 justify-center items-center">
              <TriangleAlert className="h-5" />
              <span className="flex items-center space-x-2">Spam</span>
            </div>
            <span className="text-sm text-gray-500">1253</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 justify-center items-center">
              <MessageSquareHeart className="h-5" />
              <span className="flex items-center space-x-2">Important</span>
            </div>
            <span className="text-sm text-gray-500">1253</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3 justify-center items-center">
              <Trash2 className="h-5" />
              <span className="flex items-center space-x-2">Bin</span>
            </div>
            <span className="text-sm text-gray-500">1253</span>
          </div>

        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-darkText mb-6">Label</h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-4 cursor-pointer">
              <input type="checkbox" className="text-lbGreen" />
              <span className="text-lbGreen text-sm">Primary</span>
            </label>
            <label className="flex items-center gap-4 cursor-pointer">
              <input type="checkbox" className="text-lbBlue" />
              <span className="text-lbBlue text-sm">Social</span>
            </label>
            <label className="flex items-center gap-4 cursor-pointer">
              <input type="checkbox" className="text-lbRed" />
              <span className="text-lbRed text-sm">Work</span>
            </label>
            <label className="flex items-center gap-4 cursor-pointer">
              <input type="checkbox" className="text-lbYellow " />
              <span className="text-lbYellow text-sm">Friends</span>
            </label>
            <button className="text-darkText/60 hover:text-darkText/80 mt-5">+ Create New Label</button>
          </div>
        </div>

      </div>


      {/* Main */}
      <div className="h-[90vh] flex-1 px-8 py-7 bg-bgWhite rounded-4xl shadow-xl border-1 border-[#B9B9B9]">

        {/* Search bar */}
        <div className="flex justify-between items-center rounded-lg p-2 mb-4">
          <div className="flex justify-center items-center gap-3 w-80 px-2 rounded-full bg-[#F5F6FA]">
            <Search className="text-gray-400 w-5 h-5 ml-2" />
            <input
              type="text"
              placeholder="Search mail"
              className="flex-1 p-2 outline-none bg-transparent"
            />
          </div>
          <div className="flex space-x-2 px-5 py-2 justify-center items-center bg-[#F5F6FA] rounded-full">
            <Archive className="w-8 text-darkText cursor-pointer" />
            <Star className="w-8 text-darkText cursor-pointer" />
            <Trash2 className="w-8 text-darkText cursor-pointer" />
          </div>
        </div>

        <div className="h-[67vh] overflow-y-scroll overflow-x-hidden">
          {/* Email list */}
          <div className="bg-white shadow rounded-lg divide-y">
            {emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-100"
              >
                <div className="flex justify-center items-center space-x-3">
                  <input type="checkbox" />
                  <Star className="w-4 h-4 text-gray-400 cursor-pointer" />
                  <span className="font-medium w-32">{email.name}</span>
                  {email.label && (
                    <span
                      className={`text-xs px-2 py-0.5 w-14 flex justify-center items-center m-auto ${email.label === "Primary"
                        ? "bg-lbGreen/30 text-lbGreen"
                        : email.label === "Work"
                          ? "bg-lbRed/30 text-lbRed"
                          : email.label === "Friends"
                            ? "bg-lbYellow/30 text-lbYellow"
                            : "bg-lbBlue/30 text-lbBlue"
                        }`}
                    >
                      {email.label}
                    </span>
                  )}
                  <span className="text-gray-600 ml-3">{email.subject}</span>
                </div>
                <span className="text-sm text-gray-500 w-18">{email.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <p>Showing 1-12 of 1,253</p>
          <div className="space-x-2">
            <button className="px-3 py-1 border rounded">{"<"}</button>
            <button className="px-3 py-1 border rounded">{">"}</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default index;
