"use client";

import Image from "next/image";
import kuzhimandhiImage from "./kuzhimandhi.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isExpanding, setIsExpanding] = useState(false);
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const router = useRouter();

  const handleMandhifyClick = () => {
    if (!amount || !frequency) {
      alert("Please enter amount and select frequency!");
      return;
    }
    
    setIsExpanding(true);
    // Redirect after animation completes
    setTimeout(() => {
      router.push(`/results?amount=${amount}&frequency=${frequency}`);
    }, 1000);
  };

  return (
    <div className="bg-orange-500 min-h-screen text-lg font-bold font-sans flex flex-col items-center justify-center relative p-4">
      {/* Expanding image overlay */}
      {isExpanding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Image
            src={kuzhimandhiImage}
            alt="Kuzhimandhi"
            fill
            className="object-cover animate-pulse"
            style={{
              animation: 'expandToFullScreen 1s ease-out forwards'
            }}
          />
        </div>
      )}
      
      {/* Menu Card */}
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 border-4 border-yellow-600">
        {/* Restaurant Header */}
        <div className="text-center border-b-2 border-dashed border-orange-400 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">KUZHI MANDHI HOUSE</h1>
          <p className="text-orange-800 font-semibold">Traditional Kerala Cuisine</p>
          <p className="text-gray-600 text-sm">Est. 1985 • Kozhikode, Kerala</p>
          <div className="mt-2">
            <span className="text-yellow-500">★★★★★</span>
            <p className="text-xs text-gray-500">"Authentic Flavors Since Generations"</p>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-orange-600 text-center mb-4 border-b border-orange-300 pb-2">
            BUDGET CALCULATOR
          </h2>
          
          {/* Menu Item Display */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-orange-800">Quarter Kuzhi Mandhi</span>
              <span className="text-orange-600 font-bold">₹200</span>
            </div>
            <p className="text-xs text-gray-600 italic">
              Aromatic basmati rice with tender mutton, traditional spices & saffron
            </p>
            <p className="text-xs text-orange-600 mt-1">+ 5% GST | Serves 1 person</p>
          </div>

          {/* Calculator Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-orange-800 mb-2">
                Your Budget Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border-2 text-black border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none text-center font-bold text-lg"
                placeholder="Enter Amount"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-orange-800 mb-2">
                Budget Frequency
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full text-black p-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none font-semibold"
              >
                <option value="">Select frequency</option>
                <option value="single">Single Amount</option>
                <option value="daily">Daily Budget</option>
                <option value="weekly">Weekly Budget</option>
                <option value="monthly">Monthly Budget</option>
                <option value="yearly">Yearly Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleMandhifyClick}
            className="w-full text-white font-bold text-xl p-4 border-2 border-orange-600 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 relative overflow-hidden"
            style={{
              backgroundImage: `url(${kuzhimandhiImage.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-orange-600 bg-opacity-70"></div>
            <span className="relative z-10 drop-shadow-lg">
              Calculate My Mandhi Plan
            </span>
          </button>
          
          
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-orange-200">
          <p className="text-xs text-gray-600">
            Phone: +91 9876543210 | Website: kuzhimandhihouse.com
          </p>
          <p className="text-xs text-orange-600 font-semibold mt-1">
            "Where Every Grain Tells a Story"
          </p>
        </div>
      </div>
    </div>
  );
}
