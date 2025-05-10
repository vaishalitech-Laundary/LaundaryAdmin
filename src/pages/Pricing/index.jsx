import React, { useState } from 'react';

const Pricing = () => {
  const [pricingPeriod, setPricingPeriod] = useState('monthly');

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-8">Pricing</h1>

      {/* Toggle buttons with sliding effect */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-100 rounded-md p-1 relative">
          {/* Sliding background element */}
          <div 
            className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-[#1F3C5F] rounded-md transition-all duration-300 ease-in-out ${
              pricingPeriod === 'yearly' ? 'left-[calc(50%+2px)]' : 'left-2.5'
            }`}
          ></div>
          
          {/* Button text elements (now positioned above the sliding background) */}
          <button 
            className={`px-4 py-2 z-10 relative rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
              pricingPeriod === 'monthly' ? 'text-white' : 'text-gray-700'
            }`}
            onClick={() => setPricingPeriod('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`px-4 py-2 z-10 relative rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
              pricingPeriod === 'yearly' ? 'text-white' : 'text-gray-700'
            }`}
            onClick={() => setPricingPeriod('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Rest of the pricing card components */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        
        {/* Basic Plan */}
        <div className="rounded-lg p-8 w-full max-w-xs bg-white shadow-md relative transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h2 className="text-5xl font-bold mb-2 text-center">Basic Plan</h2>
          <div className="flex items-baseline mb-15 justify-center">
            <span className="text-4xl font-bold">₹199</span>
            <span className="text-gray-600 text-xl">/mo</span>
          </div>
          
          <ul className="space-y-5 mb-15">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Wash & Fold (5kg limit)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>2 Day Delivery</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Basic Stain Removal</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>No Subscription Perks</span>
            </li>
          </ul>
          
          <button className="w-full bg-[#1F3C5F] text-white py-3 rounded-md hover:bg-blue-800 transition mb-15">
            Get Started
          </button>
          
          <div className="text-center mb-10">
            <a href="#" className="text-blue-900 hover:underline text-sm">
              Start Your 1 Day Free Trial
            </a>
          </div>
        </div>
        
        {/* Premium Plan - Made larger and with stronger shadow */}
        <div className="border-2 border-blue-900 rounded-lg p-8 w-full max-w-sm bg-white shadow-xl relative -mt-6 z-10 transition-transform duration-300 hover:scale-105">
          <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-green-400 text-black font-semibold rounded-md">
            Most Popular
          </div>
          <h2 className="text-5xl font-bold mb-2 text-center">Premium Plan</h2>
          <div className="flex items-baseline mb-20 justify-center">
            <span className="text-4xl font-bold">₹499</span>
            <span className="text-gray-600 text-xl">/mo</span>
          </div>
          
          <ul className="space-y-5 mb-18">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Wash, Fold & Iron (Unlimited)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Same-Day Delivery</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Advanced Stain Removal</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Free Pickup & Delivery</span>
            </li>
          </ul>
          
          <button className="w-full bg-[#1F3C5F] text-white py-3 rounded-md hover:bg-blue-800 transition mb-15">
            Get started
          </button>
          
          <div className="text-center mb-10">
            <a href="#" className="text-blue-900 hover:underline text-sm">
              Start Your 1 Day Free Trial
            </a>
          </div>
        </div>
        
        {/* Elite Plan */}
        <div className="rounded-lg p-7 w-full max-w-xs bg-white shadow-md relative transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h2 className="text-5xl font-bold mb-2 text-center">Elite Plan</h2>
          <div className="flex items-baseline mb-15 justify-center">
            <span className="text-4xl font-bold">₹999</span>
            <span className="text-gray-600 text-xl">/mo</span>
          </div>
          
          <ul className="space-y-3 mb-15">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>All Premium Services</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Customized Laundry Care</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Dedicated Account Manager</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Additional Discounts on Add-ons</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Priority Service</span>
            </li>
          </ul>
          
          <button className="w-full bg-[#1F3C5F] text-white py-3 rounded-md hover:bg-blue-800 transition mb-15">
            Get started
          </button>
          
          <div className="text-center mb-10">
            <a href="#" className="text-blue-900 hover:underline text-sm">
              Start Your 1 Day Free Trial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;