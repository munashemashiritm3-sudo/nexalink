import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import QuoteWizardModal from './components/QuoteWizardModal';
import ClientPortalView from './components/ClientPortalView';

import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Insights from './pages/Insights';
import Contact from './pages/Contact';

export default function App() {
  const [route, setRoute] = useState('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Sync hash routing if user alters URL
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'about', 'solutions', 'industries', 'portal', 'insights', 'contact'].includes(hash)) {
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
        {route === 'home' && <Home setRoute={changeRoute} onOpenQuote={() => setIsQuoteOpen(true)} onOpenPortal={() => changeRoute('portal')} />}
        {route === 'about' && <About onOpenQuote={() => setIsQuoteOpen(true)} />}
        {route === 'solutions' && <Solutions onOpenQuote={() => setIsQuoteOpen(true)} setRoute={changeRoute} />}
        {route === 'industries' && <Industries onOpenQuote={() => setIsQuoteOpen(true)} />}
        {route === 'portal' && <ClientPortalView onOpenQuote={() => setIsQuoteOpen(true)} />}
        {route === 'insights' && <Insights onOpenQuote={() => setIsQuoteOpen(true)} />}
        {route === 'contact' && <Contact onOpenQuote={() => setIsQuoteOpen(true)} />}
      </main>

      {/* Global Footer */}
      <Footer setRoute={changeRoute} onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Dynamic 5-Step Quote Wizard Modal */}
      <QuoteWizardModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

    </div>
  );
}
