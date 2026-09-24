import React, { useState } from 'react';
import { COMPANY_INFO, FAQS } from '../data/mockData';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';

export default function Contact({ onOpenQuote }) {
  const [activeFaqCat, setActiveFaqCat] = useState('All');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Starlink Satellite', message: '' });
  const [sent, setSent] = useState(false);

  const faqCategories = ['All', 'Connectivity & Starlink', 'Vehicle Tracking', 'Vehicle Services', 'Bill Payments'];

  const filteredFaqs = activeFaqCat === 'All'
    ? FAQS
    : FAQS.filter(f => f.category.toLowerCase().includes(activeFaqCat.toLowerCase().split(' ')[0]));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="bg-hero-glow py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Contact & Support</span>
          <h1 className="text-4xl font-black text-[#0E2A47]">
            Get In Touch With Nexalink
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Reach out to Moses Tadiwa Chikwature and our Harare team for quotes, service inquiries, or instant assistance.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E63946]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2A47]">Telephone & Mobile</h3>
            <div className="space-y-1 text-xs text-slate-700">
              <p><strong className="text-slate-900 font-semibold">Landline:</strong> <a href={`tel:${COMPANY_INFO.landline}`} className="font-mono text-emerald-600 hover:underline">{COMPANY_INFO.landline}</a></p>
              <p><strong className="text-slate-900 font-semibold">Mobile 1:</strong> <span className="font-mono">{COMPANY_INFO.phone}</span></p>
              <p><strong className="text-slate-900 font-semibold">Mobile 2:</strong> <span className="font-mono">{COMPANY_INFO.altPhone}</span></p>
            </div>
            <span className="text-[10px] text-slate-500 block pt-1">Mon - Sat: 8:00am - 5:00pm</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2A47]">WhatsApp Care Desk</h3>
            <p className="text-xs text-slate-700 font-mono">{COMPANY_INFO.whatsapp}</p>
            <p className="text-xs text-slate-700 font-mono">{COMPANY_INFO.altPhone}</p>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^\d+]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-600 font-bold hover:underline inline-block pt-1"
            >
              Open Instant Chat →
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2A47]">Official Email</h3>
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-slate-700 font-mono hover:text-[#0284C7] hover:underline block break-all">
              {COMPANY_INFO.email}
            </a>
            <span className="text-[10px] text-slate-500 block">Typical response within 1 hour</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2A47]">Harare Office</h3>
            <p className="text-xs text-slate-700 leading-snug">{COMPANY_INFO.address || ''}</p>
            <span className="text-[10px] text-[#0284C7] block font-bold">Harare, Zimbabwe</span>
          </div>

        </div>
      </section>

      {/* Form & Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-[#0E2A47]">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below and our team will get back to you with specs and quote details.
                </p>
              </div>

              {sent && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Message dispatched successfully! We will call or email you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Moses Chikwature"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:border-[#E63946] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="info@domain.co.zw"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:border-[#E63946] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+263 788 172 075"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:border-[#E63946] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Target Solution</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:border-[#E63946] focus:outline-none"
                    >
                      <option value="Starlink Satellite">Starlink Infinity Connect</option>
                      <option value="Vehicle Licensing">ZINARA & ZBC Renewals</option>
                      <option value="Vehicle Tracker">$60 Vehicle Tracker</option>
                      <option value="Japan Import">Japan Vehicle Importing</option>
                      <option value="Utility Bills">ZESA / DStv / School Fees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Message or Requirements</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you need..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:border-[#E63946] focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#E63946] hover:bg-[#D92638] text-white font-extrabold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Send Inquiry <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Office Info Card */}
            <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-6 flex flex-col justify-between shadow-md">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#00F2FE]" /> Branch Operations
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Serving businesses, fleet operators, and residential clients across Harare and Zimbabwe.
                </p>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
                  <p className="text-[#00F2FE]">📌 Harare, Zimbabwe</p>
                  <p className="text-slate-300">🕒 Mon-Sat: 8:00 AM - 5:00 PM</p>
                  <p className="text-[#E63946]">⚡ Walk-in ZINARA disc printing</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 bg-[#E63946] text-white text-xs font-extrabold rounded-xl shadow text-center"
                >
                  Launch Full Quote Wizard
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FILTERABLE FAQ ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Got Questions?</span>
          <h2 className="text-3xl font-black text-[#0E2A47]">Frequently Asked Questions</h2>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {faqCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFaqCat(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                activeFaqCat === c ? 'bg-[#E63946] text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-[#0E2A47] flex items-center justify-between gap-4 hover:text-[#E63946]"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#E63946] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#E63946]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
