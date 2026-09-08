import React, { useState } from 'react';
import { INDUSTRIES_SERVED } from '../data/mockData';
import { Building2, ShoppingBag, Truck, GraduationCap, Tractor, HardHat, HeartHandshake, Briefcase, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Industries({ onOpenQuote }) {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const getIndustryIcon = (name) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6 text-[#0284C7]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[#E63946]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-purple-600" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'Tractor': return <Tractor className="w-6 h-6 text-emerald-600" />;
      case 'HardHat': return <HardHat className="w-6 h-6 text-orange-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-600" />;
      default: return <Briefcase className="w-6 h-6 text-cyan-600" />;
    }
  };

  const current = INDUSTRIES_SERVED[selectedIndustry];

  return (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="bg-hero-glow py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Sectorial Expertise</span>
          <h1 className="text-4xl font-black text-[#0E2A47]">
            Industry Solution Mapping
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            We map specific operational pain points in Zimbabwe to integrated Nexalink technology & logistics solutions.
          </p>
        </div>
      </section>

      {/* Interactive Matrix Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Industry Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {INDUSTRIES_SERVED.map((ind, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndustry(idx)}
              className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                selectedIndustry === idx
                  ? 'bg-white border-[#E63946] shadow-md ring-2 ring-[#E63946]'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                {getIndustryIcon(ind.icon)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0E2A47]">{ind.name}</h4>
                <span className="text-[10px] text-slate-500">Click to view mapping</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Industry Detail Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-100">
                {getIndustryIcon(current.icon)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#0284C7] font-bold uppercase">SECTOR PROFILE</span>
                <h2 className="text-2xl font-extrabold text-[#0E2A47]">{current.name}</h2>
              </div>
            </div>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 bg-[#E63946] hover:bg-[#D92638] text-white text-xs font-extrabold rounded-xl shadow"
            >
              Get Quote for {current.name}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Problem Card */}
            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-200 space-y-3">
              <div className="flex items-center gap-2 text-[#E63946]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-bold text-[#0E2A47]">Common Industry Pain Point</h3>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-mono font-medium">
                "{current.problem}"
              </p>
              <p className="text-xs text-slate-600 font-normal">
                In Zimbabwe, entities in {current.name} often lose productivity managing multiple disconnected service providers.
              </p>
            </div>

            {/* Solution Card */}
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-[#0E2A47]">Nexalink Integrated Solution</h3>
              </div>
              <p className="text-sm text-[#0E2A47] font-bold leading-relaxed">
                {current.solution}
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-1 font-medium">
                <li>• Single monthly SLA billing & dedicated Harare account manager</li>
                <li>• Instant digital payments & vehicle license delivery</li>
                <li>• Starlink Satellite high-speed backup connection</li>
              </ul>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
