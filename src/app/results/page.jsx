"use client";
import { useSearchParams } from "next/navigation";
import React from 'react';
import Image from "next/image";
import Payment from "../payment.jpg";

/**
 * Calculates how many kuzhumandis you can eat with a given amount of money.
 *
 * This function provides an analysis of your budget in terms of kuzhumandi consumption.
 * It can handle Single Amount, Daily, Weekly, Monthly, or Yearly budgets.
 *
 * @param {number} amount The amount of money you have.
 * @param {string} [frequency='Single Amount'] The type of budget. Can be 'Single Amount', 'Daily', 'Weekly', 'Monthly', or 'Yearly'.
 * @param {number} [pricePerKuzhumandi=200] The price of one quarter kuzhumandi.
 * @param {number} [mealsPerDay=3] The number of times you plan to eat kuzhumandi per day.
 * @returns {string} A formatted string detailing the kuzhumandi analysis.
 */
function kuzhumandiCalculator(amount, frequency = 'Single Amount', pricePerKuzhumandi = 200, mealsPerDay = 3) {
    if (pricePerKuzhumandi <= 0) {
        return "Error: The price of kuzhumandi must be greater than zero.";
    }

    // Normalize the budget to a total amount for the period
    let calculationAmount = amount;
    let periodString = "single amount";
    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });

    switch (frequency) {
        case 'Daily':
            calculationAmount = amount * 30; // Assuming a 30-day month
            periodString = `daily budget of ${formatter.format(amount)} (totaling ${formatter.format(calculationAmount)} per month)`;
            break;
        case 'Weekly':
            calculationAmount = amount * 4; // Assuming 4 weeks per month
            periodString = `weekly budget of ${formatter.format(amount)} (totaling ${formatter.format(calculationAmount)} per month)`;
            break;
        case 'Monthly':
            calculationAmount = amount;
            periodString = `monthly budget of ${formatter.format(amount)}`;
            break;
        case 'Yearly':
            calculationAmount = amount / 12;
            periodString = `yearly budget of ${formatter.format(amount)} (analyzing one month: ${formatter.format(calculationAmount)})`;
            break;
        case 'Single Amount':
        default:
            calculationAmount = amount;
            periodString = `single amount of ${formatter.format(amount)}`;
            break;
    }

    // Calculate the total number of kuzhumandis that can be purchased
    const totalKuzhumandis = Math.floor(calculationAmount / pricePerKuzhumandi);

    if (totalKuzhumandis === 0) {
        return `With your ${periodString}, you unfortunately cannot afford any quarter kuzhumandis at ${formatter.format(pricePerKuzhumandi)} each.`;
    }

    // Calculate how many days you can eat for the specified number of meals per day
    let daysOfKuzhumandi;
    if (mealsPerDay > 0) {
        daysOfKuzhumandi = Math.floor(totalKuzhumandis / mealsPerDay);
    } else {
        daysOfKuzhumandi = Infinity;
    }

    // Build the result string
    let result = `--- Kuzhumandi Budget Analysis for your ${periodString} ---\n\n`;
    result += `Assuming a quarter kuzhumandi costs ${formatter.format(pricePerKuzhumandi)}:\n\n`;
    result += `Total quarter kuzhumandis you can eat!: ${totalKuzhumandis}\n`;

    if (mealsPerDay > 0) {
        result += `Days you can survive eating ${mealsPerDay} times a day: ${daysOfKuzhumandi} days\n`;
    } else {
        result += "You can't calculate days for 0 meals a day!\n";
    }

    result += "\nHappy eating!";

    return result;
}


export default function Results() {
  const searchParams = useSearchParams();
  const amountStr = searchParams.get('amount');
  const frequency = searchParams.get('frequency');
  
  // Convert amount to a number, defaulting to 0 if it's not a valid number
  const amount = parseFloat(amountStr) || 0;

  // Perform calculation only if amount and frequency are present
  const calculationResults = amount && frequency ? kuzhumandiCalculator(amount, frequency) : "Please provide amount and frequency in the URL.";

  // Parse the calculation results for bill formatting
  const pricePerKuzhumandi = 200;
  const taxRate = 0.05; // 5% total GST (2.5% CGST + 2.5% SGST)
  const mealsPerDay = 3;
  
  // Calculate with taxes included
  const priceWithTax = pricePerKuzhumandi * (1 + taxRate);
  const totalKuzhumandis = Math.floor(amount / priceWithTax);
  const totalCost = totalKuzhumandis * pricePerKuzhumandi;
  const totalTaxes = totalCost * taxRate;
  const totalWithTaxes = totalCost + totalTaxes;
  const change = amount - totalWithTaxes;
  const daysOfKuzhumandi = Math.floor(totalKuzhumandis / mealsPerDay);

  return (
    <div className="bg-orange-500 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md font-mono text-sm">
        {/* Restaurant Header */}
        <div className="text-center border-b-2 border-dashed border-gray-400 pb-4 mb-4">
          <h1 className="text-2xl font-bold mb-2 text-black">🍛 KUZHI MANDHI HOUSE 🍛</h1>
          <p className="text-black">Traditional Kerala Cuisine</p>
          <p className="text-black">Ph: +91 9876543210</p>
          <p className="text-black">Kozhikode, Kerala</p>
          
          {/* Main Eating Analysis - Right after company info */}
          {totalKuzhumandis > 0 && (
            <div className="mt-4 pt-4 border-t bg-gray-300 p-5 m-3 border-gray-300">
              <div className="text-center">
                <p className="text-black font-bold text-lg">🍽️ Your Mandhi Analysis 🍽️</p>
                <p className="text-black mt-2">With ₹{amount.toLocaleString('en-IN')} (including taxes), you can get:</p>
                <p className="text-black font-bold text-xl">{totalKuzhumandis} Quarter Kuzhi Mandhi portions</p>
                <p className="text-black mt-1">Eating 3 times daily = <span className="font-bold text-lg">{daysOfKuzhumandi} days</span> of delicious meals!</p>
                <p className="text-black text-xs mt-2">*Price includes 5% GST (₹{priceWithTax.toFixed(0)} per portion)</p>
              </div>
            </div>
          )}
        </div>

        {/* Bill Details */}
        <div className="border-b border-dashed border-gray-400 pb-4 mb-4 text-black">
          <div className="flex justify-between mb-2">
            <span>Bill No:</span>
            <span>#{Math.floor(Math.random() * 10000)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Date:</span>
            <span>{new Date().toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Time:</span>
            <span>{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex justify-between">
            <span>Frequency:</span>
            <span className="uppercase">{frequency}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="border-b border-dashed border-gray-400 pb-4 mb-4 text-black">
          <h3 className="font-bold mb-3 text-center">ORDER DETAILS</h3>
          <div className="flex justify-between font-bold mb-2">
            <span>ITEM</span>
            <span>QTY</span>
            <span>RATE</span>
            <span>AMOUNT</span>
          </div>
          <div className="border-b border-gray-300 mb-2"></div>
          <div className="flex justify-between">
            <span>Quarter Kuzhi Mandhi</span>
            <span>{totalKuzhumandis}</span>
            <span>₹{pricePerKuzhumandi}</span>
            <span>₹{totalCost.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Bill Summary */}
        <div className="border-b border-dashed border-gray-400 pb-4 mb-4 text-black">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{totalCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>CGST (2.5%):</span>
            <span>₹{(totalCost * 0.025).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>SGST (2.5%):</span>
            <span>₹{(totalCost * 0.025).toFixed(2)}</span>
          </div>
          <div className="border-b border-gray-300 my-2"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>TOTAL:</span>
            <span>₹{totalWithTaxes.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-b border-dashed border-gray-400 pb-4 mb-4 text-black">
          <div className="flex justify-between mb-2">
            <span>Amount Paid:</span>
            <span>₹{amount.toLocaleString('en-IN')}</span>
          </div>
          {change > 0 && (
            <div className="flex justify-between text-black font-bold">
              <span>Change:</span>
              <span>₹{change.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Payment Mode:</span>
            <span>CASH</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-black">
          <p className="mb-2">Thank you for dining with us!</p>
          <p className="mb-2">Visit us again for authentic Kerala flavors</p>
          <p className="font-bold">KUZHI MANDHI HOUSE</p>
          <p>★★★★★ "Best Mandhi in Town!" ★★★★★</p>
        </div>

        {/* QR Code */}
        <div className="text-center mt-4 pt-4 border-t border-dashed border-gray-400">
          <div className="w-16 h-16 mx-auto mb-2 p-4 relative">
            <Image
                        src={Payment}
                        alt="Kuzhimandhi"
                        fill
                        className="object-cover animate-pulse"
                        style={{
                          animation: 'expandToFullScreen 1s ease-out forwards'
                        }}
                      />
          </div>
          <p className="text-xs text-black">Scan for payment</p>
        </div>
      </div>
    </div>
  );
}
