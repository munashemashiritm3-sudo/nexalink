import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ChatWidget from './components/ChatWidget';
import MobileSpeedDial from './components/MobileSpeedDial';
import QuoteWizardModal from './components/QuoteWizardModal';
import CreateOrderModal from './components/CreateOrderModal';
import ClientPortalView from './components/ClientPortalView';
import { MOCK_CLIENT_DATA } from './data/mockData';

import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Contact from './pages/Contact';

export default function App() {
  const [route, setRoute] = useState('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orderModalPrefill, setOrderModalPrefill] = useState({ service: null, vehicle: null });

  // Externally-controlled chat open state so MobileSpeedDial can open it
  const [chatOpen, setChatOpen] = useState(false);

  // Sync hash routing if user alters URL
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'about', 'solutions', 'industries', 'portal', 'contact'].includes(hash)) {
        setRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const changeRoute = (newRoute) => {
    setRoute(newRoute);
    window.location.hash = `#/${newRoute}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOrder = (params = {}) => {
    setOrderModalPrefill({
      service: params.service || null,
      vehicle: params.vehicle || null
    });
    setIsOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070F1E] text-slate-100 font-sans selection:bg-[#E63946] selection:text-white flex flex-col justify-between">

      {/* Top Header Navigation */}
      <Navbar
        currentRoute={route}
        setRoute={changeRoute}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenPortal={() => changeRoute('portal')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {route === 'home'       && <Home setRoute={changeRoute} onOpenQuote={() => setIsQuoteOpen(true)} onOpenPortal={() => changeRoute('portal')} />}
        {route === 'about'      && <About onOpenQuote={() => setIsQuoteOpen(true)} />}
        {route === 'solutions'  && <Solutions onOpenQuote={() => setIsQuoteOpen(true)} setRoute={changeRoute} />}
        {route === 'industries' && <Industries onOpenQuote={() => setIsQuoteOpen(true)} />}
        {route === 'portal'     && <ClientPortalView onOpenQuote={() => setIsQuoteOpen(true)} />}
        {route === 'contact'    && <Contact onOpenQuote={() => setIsQuoteOpen(true)} />}
      </main>

      {/* Global Footer */}
      <Footer setRoute={changeRoute} onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* ── DESKTOP-ONLY floating widgets (hidden on mobile) ── */}

      {/* WhatsApp Widget — bottom-right, desktop only */}
      <div className="hidden md:block">
        <WhatsAppWidget onOpenQuote={() => setIsQuoteOpen(true)} />
      </div>

      {/* AI Chat Concierge — bottom-left, desktop only */}
      <div className="hidden md:block">
        <ChatWidget
          clientData={MOCK_CLIENT_DATA}
          onOpenOrderModal={handleOpenOrder}
          externalOpen={chatOpen}
          onExternalOpenChange={setChatOpen}
        />
      </div>

      {/* ── MOBILE-ONLY unified Speed-Dial FAB (hidden on desktop) ── */}
      <MobileSpeedDial onOpenChat={() => setChatOpen(true)} />

      {/* Mobile: ChatWidget rendered but trigger is controlled by speed-dial */}
      <div className="md:hidden">
        <ChatWidget
          clientData={MOCK_CLIENT_DATA}
          onOpenOrderModal={handleOpenOrder}
          externalOpen={chatOpen}
          onExternalOpenChange={setChatOpen}
        />
      </div>

      {/* Quote Wizard Modal */}
      <QuoteWizardModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      {/* Global WhatsApp Order Modal */}
      <CreateOrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        preselectedService={orderModalPrefill.service}
        preselectedVehicle={orderModalPrefill.vehicle}
      />
    </div>
  );
}
