import React, { useState } from 'react';
import { MessageCircle, MessageSquare, PhoneCall, Bot, X, Zap } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

/**
 * MobileSpeedDial — single FAB on mobile (< md breakpoint) replacing
 * the two separate floating widgets that compete for screen space.
 *
 * Props:
 *  onOpenChat — opens the AI ChatWidget drawer
 */
export default function MobileSpeedDial({ onOpenChat }) {
  const [open, setOpen] = useState(false);

  const cleanPhone = COMPANY_INFO.phone.replace(/[\s+]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Nexalink Team! I need assistance.'
  )}`;
  const telUrl = `tel:${COMPANY_INFO.landline}`;

  const actions = [
    {
      id: 'ai',
      label: 'Ask AI Support',
      sublabel: 'Instant answers 24 / 7',
      icon: <Bot className="w-5 h-5" />,
      bgClass: 'bg-gradient-to-r from-[#0E2A47] to-[#163b61]',
      onClick: () => {
        setOpen(false);
        onOpenChat();
      }
    },
    {
      id: 'wa',
      label: 'Chat on WhatsApp',
      sublabel: COMPANY_INFO.phone,
      icon: <MessageSquare className="w-5 h-5" />,
      bgClass: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      onClick: () => {
        window.open(waUrl, '_blank');
        setOpen(false);
      }
    },
    {
      id: 'call',
      label: 'Call Desk',
      sublabel: COMPANY_INFO.landline,
      icon: <PhoneCall className="w-5 h-5" />,
      bgClass: 'bg-gradient-to-r from-violet-600 to-purple-700',
      onClick: () => {
        window.location.href = telUrl;
        setOpen(false);
      }
    }
  ];

  return (
    /* Visible ONLY on mobile (hidden on md+) */
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:hidden">

      {/* Backdrop overlay to close on outside tap */}
      {open && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Speed-dial action items (slide up when open) */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`flex items-center gap-3 ${action.bgClass} text-white rounded-2xl pl-3 pr-4 py-2.5 shadow-xl transition-transform active:scale-95 hover:scale-105`}
          >
            <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              {action.icon}
            </span>
            <span className="text-left">
              <span className="block text-sm font-extrabold leading-tight">{action.label}</span>
              <span className="block text-[10px] font-medium opacity-80 leading-tight">{action.sublabel}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Main FAB trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 ${
          open
            ? 'bg-slate-700 rotate-45 shadow-slate-700/40'
            : 'bg-gradient-to-br from-[#E63946] to-[#c1121f] shadow-[#E63946]/40 hover:scale-110'
        }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <Zap className="w-6 h-6 text-white" />
            {/* Notification badge */}
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
              <span className="text-[8px] font-black text-slate-900">3</span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
