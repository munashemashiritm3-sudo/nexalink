import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import LazyImage from './LazyImage';

export default function Footer({ setRoute, onOpenQuote }) {
  const handleNav = (route) => {
    setRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E2A47] border-t border-slate-700/60 pt-16 pb-8 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Single Official Logo & Bio */}
          <div className="lg:col-span-1 space-y-4">
            <div 
              onClick={() => handleNav('home')} 
              className="cursor-pointer inline-block"
            >
              <LazyImage 
                src="/assets/logo.png" 
                alt="Nexalink Solutions" 
                className="h-14 md:h-16 w-auto object-contain bg-white/95 rounded-lg p-1.5 shadow-md hover:scale-105 transition-transform" 
              />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>
            <div className="pt-2 text-xs space-y-2">
              {COMPANY_INFO.address ? (
                <div className="flex items-start gap-2 text-slate-200">
                  <MapPin className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              ) : null}
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-3 border-[#E63946] pl-2.5">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-white transition-colors">
                  Starlink Satellite Internet
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-white transition-colors">
                  Infinity Connect Bundles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-white transition-colors">
                  $60 Motor Vehicle Tracker
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-white transition-colors">
                  ZINARA & ZBC License Renewals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-white transition-colors">
                  Japan Car Importing & Registration
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('solutions')} className="hover:text-white transition-colors">
                  ZESA, DStv & School Fees Bills
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-3 border-[#38BDF8] pl-2.5">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Nexalink
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Leadership Profiles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Industries Served
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rates')} className="hover:text-white transition-colors">
                  Live Exchange Rates
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Office Location Map
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Portal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-3 border-indigo-400 pl-2.5">
              Customers
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('portal')} className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-[#38BDF8]">
                  Client Portal Dashboard <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-white transition-colors">
                  Request a Custom Quote
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portal')} className="hover:text-white transition-colors">
                  Renew Fleet Licenses
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Support & FAQs
                </button>
              </li>
              <li>
                <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  WhatsApp Quick Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Connect & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-3 border-emerald-400 pl-2.5">
              Connect With Us
            </h4>
            <div className="space-y-2 text-xs">
              <a href={`tel:${COMPANY_INFO.landline}`} className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono">{COMPANY_INFO.landline}</span> (Landline)
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#E63946]" />
                <span className="font-mono">{COMPANY_INFO.phone}</span> (Mobile)
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>
              <span className="flex items-center gap-2 text-[#38BDF8] font-mono font-bold">
                🌐 {COMPANY_INFO.website}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-extrabold text-white bg-[#E63946] hover:bg-[#D92638] transition-colors text-center shadow-md"
              >
                Get Started Today
              </button>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5" /> Licensed & Registered in Zim
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {COMPANY_INFO.year} {COMPANY_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('contact')} className="hover:text-white">Privacy Policy</button>
            <button onClick={() => handleNav('contact')} className="hover:text-white">Terms of Service</button>
            <button onClick={() => handleNav('contact')} className="hover:text-white">SLA Commitment</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
