import React from 'react';
import { COMPANY_INFO, LEADERSHIP_TEAM } from '../data/mockData';
import { Target, Compass, Award, Shield, MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';

export default function About({ onOpenQuote }) {
  return (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="bg-hero-glow py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">About Nexalink Solutions</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0E2A47]">
            Connecting Businesses & Tech in Zimbabwe
          </h1>
          <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nexalink Solutions Pvt Ltd was founded with a singular purpose: to deliver integrated business solutions, cutting-edge satellite IT, and vehicle services that empower local enterprises to thrive.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E63946]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#0E2A47]">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              To provide Zimbabwean businesses and individuals with seamless access to high-speed internet, reliable fleet technology, compliance services, and utility automation—ensuring zero downtime and complete peace of mind.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#0E2A47]">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              To be Southern Africa's most trusted B2B and B2C technology enabler, known for pioneering satellite connectivity and hassle-free vehicle administration.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#0E2A47]">Core Values</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Integrity, Operational Speed, Technology Excellence, and Customer-First Accountability in every transaction we execute across Harare and Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#E63946]">Executive Management</span>
          <h2 className="text-3xl font-black text-[#0E2A47]">Leadership Team</h2>
          <p className="text-sm text-slate-600">Meet the visionaries guiding Nexalink Solutions Pvt Ltd.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEADERSHIP_TEAM.map((leader, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-slate-200 shrink-0 shadow-sm"
              />
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-extrabold text-[#0E2A47]">{leader.name}</h3>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-extrabold bg-red-50 text-[#E63946] border border-red-200">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{leader.bio}</p>
                <div className="pt-2 text-xs space-y-1 text-slate-500 font-mono">
                  <p>📧 {leader.email}</p>
                  <p>📞 {leader.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Office & Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Visit Our Office</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A47]">
                Island Mall Branch, Harare
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Drop by our physical office for instant cash payments, Starlink hardware pickups, or walk-in vehicle licensing renewals.
              </p>

              <div className="space-y-3 text-xs text-slate-700 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                  <span><strong>Address:</strong> {COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span><strong>Hours:</strong> {COMPANY_INFO.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Phone:</strong> {COMPANY_INFO.phone} / {COMPANY_INFO.altPhone}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-[#E63946] hover:bg-[#D92638] shadow"
                >
                  Contact Management Desk
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-[#0E2A47] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0284C7]" /> Company Credentials & Registration
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Registered Zimbabwean Private Limited Company</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Authorised Starlink Satellite Connectivity Partner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Licensed ZINARA Road & ZBC Radio Agent</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>EcoCash & Local Bank Integrated Payment Partner</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
