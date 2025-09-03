import React, { useState, useEffect } from "react";
import axios from "axios";

const Pricing = () => {
  const [pricingPeriod, setPricingPeriod] = useState("monthly");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/planpricing/allpricingplan",{withCredentials:true});
        setPlans(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch pricing plans:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Pricing</h1>

      {/* Toggle buttons with sliding effect */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-100 rounded-md p-1 relative">
          {/* Sliding background element */}
          <div
            className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-[#1F3C5F] rounded-md transition-all duration-300 ease-in-out ${
              pricingPeriod === "yearly" ? "left-[calc(50%+2px)]" : "left-2.5"
            }`}
          ></div>

          <button
            className={`px-4 py-2 z-10 relative rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
              pricingPeriod === "monthly" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => setPricingPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 z-10 relative rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
              pricingPeriod === "yearly" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => setPricingPeriod("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`rounded-lg p-8 w-full max-w-xs bg-white shadow-md relative transition-transform duration-300 hover:scale-105 hover:shadow-lg ${
              plan.isPopular ? "border-2 border-blue-900 shadow-xl max-w-sm -mt-6 z-10" : ""
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-green-400 text-black font-semibold rounded-md">
                Most Popular
              </div>
            )}

            {/* Plan Name */}
            <h2 className="text-3xl font-bold mb-2 text-center">{plan.name}</h2>

            {/* Price */}
            <div className="flex items-baseline mb-6 justify-center">
              <span className="text-4xl font-bold">
                {plan.currency}
                {pricingPeriod === "monthly"
                  ? plan.monthlyPrice
                  : plan.yearlyPrice}
              </span>
              <span className="text-gray-600 text-xl">
                {pricingPeriod === "monthly" ? "/mo" : "/yr"}
              </span>
            </div>

            {/* Description */}
            <p className="text-center text-gray-600 mb-6">{plan.description}</p>

            {/* Features */}
            <ul className="space-y-4 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="w-full bg-[#1F3C5F] text-white py-3 rounded-md hover:bg-blue-800 transition mb-4">
              Get Started
            </button>

            {/* Free trial */}
            <div className="text-center">
              <a
                href="#"
                className="text-blue-900 hover:underline text-sm"
              >
                Start Your 1 Day Free Trial
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
