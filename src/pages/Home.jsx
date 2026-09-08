import React from 'react';
import { COMPANY_INFO, SOLUTIONS_CATEGORIES, WHY_NEXALINK_PILLARS, HOW_IT_WORKS_STEPS, INDUSTRIES_SERVED } from '../data/mockData';
import { ArrowRight, CheckCircle2, Shield, Zap, Layers, Users, Wifi, Car, ShieldCheck, BarChart3, CreditCard, Server, PhoneCall } from 'lucide-react';

export default function Home({ setRoute, onOpenQuote, onOpenPortal }) {
  const handleNav = (route) => {
    setRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Wifi': return <Wifi className="w-6 h-6 text-[#0284C7]" />;
      case 'Car': return <Car className="w-6 h-6 text-[#E63946]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-purple-600" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-600" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-amber-600" />;
      default: return <Zap className="w-6 h-6 text-cyan-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-hero-glow overflow-hidden border-b border-slate-200">
        
        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-bold text-[#0E2A47] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E63946] animate-ping"></span>
              Official Zimbabwean Business & Tech Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0E2A47] tracking-tight leading-[1.1]">
              Smart Solutions. <br className="hidden sm:inline" />
              <span className="text-gradient-red">Seamless Service.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              {COMPANY_INFO.tagline} Connecting IT, Starlink Satellite internet, vehicle licensing, fleet tracking, and digital payments under one trusted roof.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold text-white bg-[#E63946] hover:bg-[#D92638] shadow-lg shadow-red-500/25 hover:shadow-red-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleNav('solutions')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-[#0E2A47] border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Explore Our Solutions
              </button>
            </div>

            {/* Live Trust Metrics */}
            <div className="pt-8 border-t border-slate-300/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#0E2A47] font-mono">300+</span>
                <p className="text-xs font-semibold text-slate-500">Car Owners Served</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#0284C7] font-mono">100%</span>
                <p className="text-xs font-semibold text-slate-500">Same-Day Licensing</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#E63946] font-mono">US$60</span>
                <p className="text-xs font-semibold text-slate-500">GPS Vehicle Tracker</p>
              </div>
            </div>

          </div>

          {/* Hero Right Visual: Single Official Logo Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 relative z-10 space-y-5 border border-slate-200 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <img src="/assets/logo.png" alt="Nexalink Solutions" className="h-10 w-auto object-contain" />
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  LIVE ZIMBABWE DESK
                </span>
              </div>

              {/* Flyer highlight snippet */}
              <div className="relative rounded-2xl overflow-hidden group border border-slate-200">
                <img 
                  src="/assets/starlink-infinity-flyer.png" 
                  alt="Infinity Connect Starlink" 
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47] via-[#0E2A47]/30 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase">STARLINK AUTHORISED RESELLER</span>
                  <h3 className="text-lg font-black text-white">Infinity Connect Packages</h3>
                  <p className="text-xs text-slate-200">High-Speed Satellite Internet from US$40/mo or US$77 Unlimited</p>
                </div>
              </div>

              {/* Quick actions inside card */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => handleNav('solutions')} 
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-[#0E2A47] font-bold text-center border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <Wifi className="w-3.5 h-3.5 text-[#0284C7]" /> Starlink Plans
                </button>
                <button 
                  onClick={onOpenQuote} 
                  className="p-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-[#E63946] font-extrabold text-center flex items-center justify-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5 text-[#E63946]" /> ZINARA Renewal
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: WHAT IS NEXALINK? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">About The Company</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E2A47]">
                What is Nexalink Solutions?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Nexalink Solutions Pvt Ltd is a premier Zimbabwean business solutions and technology enterprise headquartered in Harare. We simplify complex operations for businesses and individuals by bringing satellite connectivity, IT infrastructure, vehicle licensing, GPS fleet tracking, and everyday bill payments into one integrated platform.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => handleNav('about')}
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-[#0E2A47] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all flex items-center gap-2 shadow-sm"
              >
                Discover Nexalink
                <ArrowRight className="w-4 h-4 text-[#E63946]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR SOLUTIONS (5 INTERACTIVE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#E63946]">Comprehensive Offerings</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0E2A47]">Our 5 Core Solutions</h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            From high-speed satellite internet to same-day vehicle license delivery in Harare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_CATEGORIES.map((cat, idx) => (
            <div 
              key={cat.id} 
              className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between group ${idx === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                    {getIcon(cat.icon)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">0{idx + 1} / SOLUTION</span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#0E2A47] group-hover:text-[#E63946] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    {cat.tagline}
                  </p>
                </div>

                {/* Feature bullets */}
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  {cat.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleNav('solutions')}
                  className="text-xs font-bold text-[#0E2A47] hover:text-[#E63946] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  View Details & Pricing <ArrowRight className="w-3.5 h-3.5 text-[#E63946]" />
                </button>

                {cat.flyerImage && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#0284C7] font-bold border border-cyan-200">
                    Verified Flyer Spec
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: WHY NEXALINK? (4 PILLARS) */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">The Nexalink Advantage</span>
            <h2 className="text-3xl font-black text-[#0E2A47]">Why Choose Nexalink Solutions?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_NEXALINK_PILLARS.map((p, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#E63946] shadow-xs">
                  {i === 0 && <CheckCircle2 className="w-5 h-5 text-[#E63946]" />}
                  {i === 1 && <Zap className="w-5 h-5 text-[#0284C7]" />}
                  {i === 2 && <Layers className="w-5 h-5 text-indigo-600" />}
                  {i === 3 && <Users className="w-5 h-5 text-emerald-600" />}
                </div>
                <h3 className="text-lg font-bold text-[#0E2A47]">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: B2B SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E2A47] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40 inline-block">
                B2B ENTERPRISE TRANSFORMATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">
                Powering Corporate Fleets & High-Speed Office Connectivity
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                Whether you manage a logistics fleet requiring real-time $60 GPS tracking and automated ZINARA licensing, or an enterprise needing Starlink satellite backup and CCTV surveillance, Nexalink delivers guaranteed service level agreements.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-[#E63946] hover:bg-[#D92638] shadow-lg flex items-center gap-2"
                >
                  Build Your Business Solution <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/10">
                <Server className="w-5 h-5 text-[#00F2FE] mb-2" />
                <h4 className="font-bold text-white">Infinity Connect</h4>
                <p className="text-[11px] text-slate-300 mt-1">Dedicated Starlink data plans for commercial branches.</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#E63946] mb-2" />
                <h4 className="font-bold text-white">$60 Fleet Trackers</h4>
                <p className="text-[11px] text-slate-300 mt-1">Anti-theft immobilizers with zero monthly subscription.</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/10">
                <Car className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="font-bold text-white">Japan Imports</h4>
                <p className="text-[11px] text-slate-300 mt-1">Direct sourcing & full road clearance in Zimbabwe.</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/10">
                <CreditCard className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="font-bold text-white">EcoCash Pay</h4>
                <p className="text-[11px] text-slate-300 mt-1">Instant digital payments for ZESA, ZINARA & DStv.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS (5-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#E63946]">Streamlined Onboarding</span>
          <h2 className="text-3xl font-black text-[#0E2A47]">How It Works (5 Simple Steps)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {HOW_IT_WORKS_STEPS.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <span className="text-2xl font-black text-[#E63946] font-mono">{s.step}</span>
              <h3 className="text-base font-bold text-[#0E2A47]">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: CLIENT PORTAL TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Self-Service Portal</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A47]">
                Manage Your Services, Invoices & Fleet Online
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Log into the Nexalink Client Portal to track active Starlink packages, request vehicle licensing renewals, download PDF invoices, or open support tickets.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleNav('portal')}
                  className="px-5 py-3 rounded-xl text-xs font-extrabold text-white bg-[#0E2A47] hover:bg-[#0A192F] shadow flex items-center gap-1.5"
                >
                  Client Login Portal <ArrowRight className="w-4 h-4 text-[#E63946]" />
                </button>
              </div>
            </div>

            {/* Portal Mini Preview */}
            <div className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-white font-bold">Harare Logistics Co. (NX-884920)</span>
                <span className="text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded">AUTHENTICATED</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-950 p-2 rounded">
                  <span className="block text-slate-400 text-[10px]">Active IT</span>
                  <span className="text-sm font-bold text-[#00F2FE]">4 Services</span>
                </div>
                <div className="bg-slate-950 p-2 rounded">
                  <span className="block text-slate-400 text-[10px]">ZINARA Due</span>
                  <span className="text-sm font-bold text-[#E63946]">2 Vehicles</span>
                </div>
                <div className="bg-slate-950 p-2 rounded">
                  <span className="block text-slate-400 text-[10px]">Balance</span>
                  <span className="text-sm font-bold text-white">$77.00</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: INDUSTRIES SERVED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Tailored Solutions</span>
          <h2 className="text-3xl font-black text-[#0E2A47]">Industries We Serve</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INDUSTRIES_SERVED.map((ind, i) => (
            <button
              key={i}
              onClick={() => handleNav('industries')}
              className="bg-white p-4 rounded-xl border border-slate-200 text-left hover:border-slate-400 shadow-xs transition-all space-y-1.5 group"
            >
              <h4 className="text-sm font-bold text-[#0E2A47] group-hover:text-[#E63946]">{ind.name}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-2">{ind.solution}</p>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 9: FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 bg-gradient-to-r from-[#E63946] via-red-600 to-red-700 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black">Ready for a Smarter Solution?</h2>
            <p className="text-sm sm:text-base text-red-100 font-normal">
              Get in touch with Moses Tadiwa Chikwature and the Nexalink Harare team today. Fast quotes, transparent pricing, and guaranteed turnaround.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold text-[#0E2A47] bg-white hover:bg-slate-100 shadow-xl transition-all"
              >
                Request a Quote Now
              </button>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5" /> Call {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
