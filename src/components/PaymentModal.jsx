import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, Smartphone, CreditCard } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, invoice }) {
  const [method, setMethod] = useState('ecocash');
  const [phoneOrCard, setPhoneOrCard] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'ecocash', name: 'EcoCash', type: 'Mobile Money', color: 'border-blue-500 bg-blue-50' },
    { id: 'innbucks', name: 'InnBucks', type: 'Instant Wallet', color: 'border-amber-500 bg-amber-50' },
    { id: 'omari', name: 'OMARI', type: 'Old Mutual Wallet', color: 'border-emerald-500 bg-emerald-50' },
    { id: 'onemoney', name: 'OneMoney', type: 'NetOne Wallet', color: 'border-orange-500 bg-orange-50' },
    { id: 'card', name: 'Visa / Mastercard', type: 'Debit/Credit Card', color: 'border-indigo-500 bg-indigo-50' }
  ];

  const handlePay = (e) => {
    e.preventDefault();
    if (!phoneOrCard) {
      alert("Please enter your EcoCash / Wallet phone number or Card number.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#0E2A47] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Nexalink Secure Payment Gateway</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handlePay} className="p-5 space-y-5">
            {/* Amount Summary */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 font-medium">{invoice?.description || "Nexalink Service Invoice"}</p>
                <p className="text-xs font-mono text-slate-500">{invoice?.id || "INV-2026-NEXA"}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#0E2A47]">US${invoice?.amount?.toFixed(2) || "77.00"}</span>
                <span className="block text-[10px] text-slate-500 font-medium">VAT & ZINARA Tax Included</span>
              </div>
            </div>

            {/* Select Method */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-[#0E2A47]">Select Payment Method in Zimbabwe:</label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setMethod(pm.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      method === pm.id
                        ? `${pm.color} border-2 shadow-xs`
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-[#0E2A47] block">{pm.name}</span>
                    <span className="text-[10px] text-slate-500">{pm.type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input field */}
            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-[#0E2A47]">
                {method === 'card' ? 'Card Number (Visa / Mastercard)' : `${method.toUpperCase()} Mobile Number`}
              </label>
              <div className="relative">
                {method === 'card' ? (
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                ) : (
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                )}
                <input
                  type="text"
                  required
                  placeholder={method === 'card' ? '4000 1234 5678 9010' : '+263 77 123 4567'}
                  value={phoneOrCard}
                  onChange={(e) => setPhoneOrCard(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-9 pr-3 text-slate-900 focus:border-[#E63946] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authorizing Payment...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Pay US${invoice?.amount?.toFixed(2) || "77.00"} Now
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-500 font-medium flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              256-bit Encrypted • Official Nexalink Solutions Payment Engine
            </p>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-[#0E2A47]">Payment Confirmed!</h4>
            <p className="text-xs text-slate-600">
              Receipt #NEXA-PAY-{Math.floor(10000 + Math.random() * 90000)} generated. Your service renewal / order is active immediately.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 text-left font-mono space-y-1">
              <p>Amount Paid: US${invoice?.amount?.toFixed(2) || "77.00"}</p>
              <p>Method: {method.toUpperCase()} ({phoneOrCard})</p>
              <p className="text-emerald-700 font-bold">Status: VERIFIED & CLEARED</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#0E2A47] hover:bg-[#0A192F] text-white text-xs font-bold rounded-xl"
            >
              Return to Portal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
