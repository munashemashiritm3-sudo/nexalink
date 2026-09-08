import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { MessageSquare, X, Send, ShieldCheck } from 'lucide-react';

export default function WhatsAppWidget({ onOpenQuote }) {
  const [isOpen, setIsOpen] = useState(false);
  const cleanPhone = COMPANY_INFO.whatsapp.replace(/[^\d+]/g, '');

  const quickMessages = [
    { label: "🚀 Get a Custom Quote", text: "Hello Nexalink Team, I would like to request a quote for my business." },
    { label: "🚗 ZINARA & Insurance Renewal", text: "Hi, I need help renewing my vehicle license and insurance today." },
    { label: "📡 Starlink Satellite Internet", text: "Hello, please provide details on Starlink Infinity Connect packages and installation." },
    { label: "📍 Vehicle Tracker ($60)", text: "Hi, I'm interested in the $60 Vehicle Tracker with no monthly subscription." }
  ];

  const handleSend = (text) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${cleanPhone.replace('+', '')}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Menu */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#0E2A47]">Nexalink WhatsApp Support</h4>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online Now • Harare HQ
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
            👋 Welcome to Nexalink! How can we assist your business or vehicle needs today?
          </p>

          <div className="space-y-2 mb-3">
            {quickMessages.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.text)}
                className="w-full text-left text-xs p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 transition-all flex items-center justify-between text-slate-800 font-semibold group"
              >
                <span>{item.label}</span>
                <Send className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Direct Customer Care
            </span>
            <button 
              onClick={() => { setIsOpen(false); onOpenQuote(); }}
              className="text-[#0284C7] hover:underline font-bold"
            >
              Full Quote Form →
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl hover:shadow-emerald-600/40 hover:scale-105 transition-all flex items-center gap-2.5 font-bold text-sm border border-emerald-400/30"
        aria-label="Open WhatsApp Chat"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white"></span>
        </div>
        <span className="hidden sm:inline font-extrabold">WhatsApp Us</span>
      </button>
    </div>
  );
}
