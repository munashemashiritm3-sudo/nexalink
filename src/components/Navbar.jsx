import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Menu, X, ChevronRight, Phone, Shield, ArrowRight, UserCheck } from 'lucide-react';

export default function Navbar({ currentRoute, setRoute, onOpenQuote, onOpenPortal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Solutions', route: 'solutions' },
    { label: 'Industries', route: 'industries' },
    { label: 'Client Portal', route: 'portal' },

    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route) => {
    setRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#0E2A47] text-slate-200 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#E63946]" />
              <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">{COMPANY_INFO.phone}</a> / <a href={`tel:${COMPANY_INFO.altPhone}`} className="hover:text-white transition-colors">{COMPANY_INFO.altPhone}</a>
            </span>
            <span className="hidden lg:inline-block text-slate-400">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#38BDF8] font-mono font-semibold">
              🌐 {COMPANY_INFO.website}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[#38BDF8] font-semibold text-[11px]">
              <Shield className="w-3.5 h-3.5" /> Authorised Starlink Reseller
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Single Bigger Official Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer group py-1"
        >
          <img 
            src="/assets/logo.png" 
            alt="Nexalink Solutions - Smart Solutions. Seamless Service." 
            className="h-14 md:h-16 lg:h-18 w-auto object-contain transition-transform group-hover:scale-105" 
          />
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`nav-link-underline px-3.5 py-2 rounded-lg text-sm font-bold transition-all duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/40 ${
                  isActive
                    ? 'nav-active text-[#E63946] bg-red-50 border border-red-100 shadow-sm'
                    : 'text-[#0E2A47] hover:text-[#E63946] hover:bg-slate-100/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('portal')}
            className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold text-[#0E2A47] border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <UserCheck className="w-4 h-4 text-[#0284C7]" />
            Client Login
          </button>

          <button
            onClick={onOpenQuote}
            className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-extrabold text-white bg-[#E63946] hover:bg-[#D92638] shadow-md hover:shadow-lg hover:shadow-red-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenQuote}
            className="sm:hidden px-3 py-1.5 rounded-md text-xs font-bold text-white bg-[#E63946]"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]/40 ${
                  currentRoute === item.route
                    ? 'bg-[#E63946] text-white'
                    : 'text-[#0E2A47] hover:bg-slate-100'
                }`}
              >
                {item.label}
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleNavClick('portal')}
              className="w-full py-3 rounded-xl text-sm font-bold text-center text-[#0E2A47] border border-slate-300 bg-slate-50"
            >
              Client Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-xl text-sm font-extrabold text-center text-white bg-[#E63946] shadow-md"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
