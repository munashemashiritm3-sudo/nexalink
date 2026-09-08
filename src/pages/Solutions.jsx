import React, { useState } from 'react';
import { SOLUTIONS_CATEGORIES, STARLINK_PACKAGES } from '../data/mockData';
import { Wifi, Car, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Solutions({ onOpenQuote, setRoute }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedStarlinkPlan, setSelectedStarlinkPlan] = useState('unlimited');

  const filteredSolutions = activeTab === 'all' 
    ? SOLUTIONS_CATEGORIES 
    : SOLUTIONS_CATEGORIES.filter(s => s.id === activeTab);

  return (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="bg-hero-glow py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Solutions Directory</span>
          <h1 className="text-4xl font-black text-[#0E2A47]">
            Integrated Business & Vehicle Solutions
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Select a service category below to view detailed specifications, verified pricing flyers, and instant quote options.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#E63946] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              All Solutions
            </button>
            {SOLUTIONS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat.id
                    ? 'bg-[#E63946] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STARLINK INFINITY CONNECT CALCULATOR */}
      {(activeTab === 'all' || activeTab === 'connectivity-it') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-8 shadow-sm">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-[#0284C7] border border-sky-200 mb-2">
                  <Wifi className="w-3.5 h-3.5" /> STARLINK AUTHORISED RESELLER
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A47]">
                  Infinity Connect Satellite Data Packages
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  High-speed, low-latency satellite internet for Harare, Bulawayo & remote Zimbabwe.
                </p>
              </div>
              <button
                onClick={onOpenQuote}
                className="px-5 py-2.5 bg-[#E63946] hover:bg-[#D92638] text-white text-xs font-extrabold rounded-xl shadow shrink-0"
              >
                Order Starlink Kit Now
              </button>
            </div>

            {/* Starlink Plans Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STARLINK_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedStarlinkPlan(pkg.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 relative ${
                    selectedStarlinkPlan === pkg.id
                      ? 'bg-slate-50 border-[#0284C7] shadow-md ring-2 ring-[#0284C7]'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0284C7] text-white uppercase">
                      MOST POPULAR UNLIMITED
                    </span>
                  )}
                  {pkg.popular && (
                    <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#E63946] text-white uppercase">
                      BEST VALUE PRO
                    </span>
                  )}

                  <h4 className="text-base font-bold text-[#0E2A47]">{pkg.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#0E2A47] font-mono">US${pkg.price}</span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-600 font-medium">
                    <p className="font-bold text-[#0284C7]">Data: {pkg.data}</p>
                    <p className="text-[11px] text-slate-500">Add. Priority: {pkg.priorityData}</p>
                    <p className="text-[11px] text-slate-500">Target: {pkg.bestFor}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Flyer Image Preview */}
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 flex flex-col md:flex-row items-center gap-6">
              <img 
                src="/assets/starlink-infinity-flyer.png" 
                alt="Infinity Connect Flyer" 
                className="w-full md:w-64 h-auto rounded-xl border border-slate-300 shadow-sm"
              />
              <div className="space-y-3 text-xs text-slate-700 font-medium">
                <h4 className="text-sm font-extrabold text-[#0E2A47] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0284C7]" /> Official Flyer Features & Guarantees:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Mobile Priority Support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Rooftop Alignment & Mounting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Additional Priority Data @ US$0.26 / GB
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Quick Order (+263 788 172 075)
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* VEHICLE SERVICES & $60 TRACKER */}
      {(activeTab === 'all' || activeTab === 'vehicle-services' || activeTab === 'logistics-mobility') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-8 shadow-sm">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-50 text-[#E63946] border border-red-200 mb-2">
                  <Car className="w-3.5 h-3.5" /> MOTOR VEHICLE SERVICES & FLEET TECH
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A47]">
                  ZINARA Licensing, Japan Importing & $60 Vehicle Tracker
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Complete automotive legal compliance and IoT fleet monitoring across Zimbabwe.
                </p>
              </div>
              <button
                onClick={onOpenQuote}
                className="px-5 py-2.5 bg-[#E63946] hover:bg-[#D92638] text-white text-xs font-extrabold rounded-xl shadow shrink-0"
              >
                Request Vehicle Service
              </button>
            </div>

            {/* 3 Vehicle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-2xl font-black text-[#0284C7] font-mono">US$60</span>
                  <h4 className="text-lg font-extrabold text-[#0E2A47]">Motor Vehicle Tracker Package</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Full hardware & installation package with <strong>NO MONTHLY SUBSCRIPTION</strong>! Just +$1 airtime/mo to maintain live GPS connection.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Real-time GPS Tracking</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Anti-Theft Engine Immobilizer</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> Route History & Speed Alerts</li>
                  </ul>
                </div>
                <img src="/assets/vehicle-tracker-flyer.jpg" alt="Tracker Flyer" className="w-full h-40 object-cover rounded-xl border border-slate-300 shadow-xs" />
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">SAME-DAY DELIVERY</span>
                  <h4 className="text-lg font-extrabold text-[#0E2A47]">ZINARA & ZBC License Renewals</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Avoid police fines! We renew your ZINARA road user license, ZBC radio license, and vehicle insurance with same-day disc delivery to your door in Harare.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Third Party & Comprehensive</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> EcoCash, InnBucks, OMARI Accepted</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Trusted by 300+ Car Owners</li>
                  </ul>
                </div>
                <img src="/assets/vehicle-licensing-flyer.png" alt="Licensing Flyer" className="w-full h-40 object-cover rounded-xl border border-slate-300 shadow-xs" />
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">JAPAN TO DRIVEWAY</span>
                  <h4 className="text-lg font-extrabold text-[#0E2A47]">Japan Vehicle Import Sourcing</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Direct sourcing of quality Japanese cars (Toyota, Lexus, Honda). We handle shipping, customs clearing, registration, and initial licensing.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Direct Japanese Auction Sourcing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Registration & Number Plates</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Hassle-Free Harare Delivery</li>
                  </ul>
                </div>
                <img src="/assets/japan-car-import-flyer.jpg" alt="Japan Import Flyer" className="w-full h-40 object-cover rounded-xl border border-slate-300 shadow-xs" />
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ALL CATEGORIES DETAILED GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-2xl font-black text-[#0E2A47] border-l-4 border-[#E63946] pl-3">
          Full Category Directory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSolutions.map((sol) => (
            <div key={sol.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-xl font-extrabold text-[#0E2A47]">{sol.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{sol.tagline}</p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {sol.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0E2A47] font-bold text-xs rounded-xl border border-slate-300 flex items-center gap-1.5"
                >
                  Request Quote for {sol.title} <ArrowRight className="w-3.5 h-3.5 text-[#E63946]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
