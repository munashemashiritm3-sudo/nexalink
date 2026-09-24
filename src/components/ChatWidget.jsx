import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, PhoneCall, ExternalLink, ShieldCheck, RefreshCw, CreditCard, Car, Wifi } from 'lucide-react';
import { COMPANY_INFO, MOCK_CLIENT_DATA, STARLINK_PACKAGES } from '../data/mockData';

export default function ChatWidget({ clientData = MOCK_CLIENT_DATA, onOpenOrderModal, onOpenPayment, externalOpen, onExternalOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Sync external open trigger (from MobileSpeedDial)
  useEffect(() => {
    if (externalOpen && !isOpen) {
      handleOpen();
      if (onExternalOpenChange) onExternalOpenChange(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasGreeted) {
      setHasGreeted(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            role: 'bot',
            text: `Hello ${clientData?.clientName || 'there'}! 👋 Welcome to **Nexalink Solutions AI Support**.\n\nI have active context for **${clientData?.companyName || 'Nexalink Portal'}** (Account \`${clientData?.accountNumber || 'NX-884920'}\`).\n\nYou can ask me about:\n• 📊 **Your Account** (Current balance, invoices, tickets)\n• 🚗 **Fleet Vehicles** (ZINARA & insurance expiry dates)\n• 📡 **Starlink Internet** (Infinity Connect packages & setup)\n• 📍 **GPS Trackers** ($60 full package, no subscription)\n• 💬 Or request human intervention at any time!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: [
              { label: 'Check My Balance', query: 'What is my current balance?' },
              { label: 'Fleet Status', query: 'Check my fleet vehicle expiry dates' },
              { label: 'Starlink Plans', query: 'What Starlink packages do you have?' }
            ]
          }
        ]);
      }, 700);
    }
  };

  /**
   * Evaluates input with context awareness of Nexalink services AND client state
   */
  const evaluateQuery = (userInput) => {
    const q = userInput.toLowerCase().trim();

    // 1. Account Balance / Invoices
    if (q.includes('balance') || q.includes('invoice') || q.includes('owe') || q.includes('bill') || q.includes('pay') && (q.includes('my') || q.includes('account') || q.includes('how much'))) {
      const unpaidInvs = clientData.invoices.filter(i => i.status === 'Unpaid');
      const invSummary = unpaidInvs.map(i => `• **${i.id}**: US$${i.amount.toFixed(2)} (${i.description})`).join('\n');

      return {
        text: `Here is your current billing status for **${clientData.companyName}** (Account \`${clientData.accountNumber}\`):\n\n💰 **Outstanding Balance:** **US$${clientData.balance.toFixed(2)}**\n\n**Pending Invoices:**\n${invSummary || '• No overdue invoices!'}\n\nAccepted payment methods: **EcoCash, InnBucks, OMARI, OneMoney, Visa & Mastercard**.`,
        actions: [
          { label: `Pay US$${clientData.balance.toFixed(2)} Balance`, actionType: 'pay' },
          { label: 'Order via WhatsApp', actionType: 'whatsapp_order' },
          { label: 'Talk to Human on WhatsApp', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 2. Fleet Vehicles & Expiry Dates (AEG-4902, ZINARA, Insurance)
    if (q.includes('fleet') || q.includes('vehicle') || q.includes('car') || q.includes('zinara') || q.includes('insurance') || q.includes('disc') || q.includes('expiry') || q.includes('aeg') || q.includes('4902')) {
      const vehicleList = clientData.fleetVehicles.map(v => {
        const warning = v.status === 'Renewal Warning' ? '⚠️ **RENEWAL DUE / EXPIRED**' : '✅ Compliant';
        return `🚗 **${v.reg}** (${v.model})\n   • Status: ${warning}\n   • ZINARA Expiry: \`${v.zinaraExpiry}\`\n   • Insurance Expiry: \`${v.insuranceExpiry}\`\n   • GPS Tracker: ${v.trackerStatus}`;
      }).join('\n\n');

      return {
        text: `Here is the current status of your registered fleet vehicles:\n\n${vehicleList}\n\n⭐ **Notice:** Vehicle **AEG-4902** requires immediate ZINARA & Insurance renewal to avoid police fines. We offer **same-day physical disc delivery** in Harare!`,
        actions: [
          { label: 'Renew AEG-4902 via WhatsApp', actionType: 'renew_vehicle', vehicle: 'AEG-4902' },
          { label: 'Create Service Order', actionType: 'whatsapp_order' },
          { label: 'Contact Licensing Desk', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 3. Active IT & Starlink Services for this account
    if (q.includes('my starlink') || q.includes('my internet') || q.includes('my cctv') || q.includes('active service') || q.includes('my setup') || q.includes('msasa')) {
      const itList = clientData.itServices.map(s => `🌐 **${s.service}**\n   • Package: ${s.package}\n   • Location: ${s.location}\n   • IP: \`${s.ip}\` • Status: **${s.status}**`).join('\n\n');

      return {
        text: `Here are the active IT & Connectivity assets on your account:\n\n${itList}\n\nYour primary Starlink link at **Msasa Depot** is online with active SLA monitoring. Would you like to request an upgrade or maintenance?`,
        actions: [
          { label: 'Upgrade Starlink Bundle', actionType: 'whatsapp_order', service: 'Starlink' },
          { label: 'Chat with IT Specialist', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 4. Support Tickets
    if (q.includes('ticket') || q.includes('tck') || q.includes('issue') || q.includes('complaint') || q.includes('sla') || q.includes('support status')) {
      const ticketList = clientData.tickets.map(t => `🎫 **${t.id}**: ${t.subject}\n   • Status: **${t.status}** (${t.priority} Priority)\n   • Date: ${t.date}`).join('\n\n');

      return {
        text: `Here are your SLA support requests:\n\n${ticketList}\n\nTicket **TCK-402** is currently handled by our Harare operations team.`,
        actions: [
          { label: 'Follow up on WhatsApp', actionType: 'human_whatsapp' },
          { label: 'Open New Support Ticket', actionType: 'new_ticket' }
        ]
      };
    }

    // 5. Starlink General Knowledge & Offerings
    if (q.includes('starlink') || q.includes('internet') || q.includes('wifi') || q.includes('wi-fi') || q.includes('satellite') || q.includes('infinity') || q.includes('speed')) {
      return {
        text: `📡 **Nexalink is an Authorised Starlink Reseller in Zimbabwe**, fully licensed and registered.\n\n**Infinity Connect Data Bundles:**\n• **Standard** (25 GB) — **US$40 / mo**\n• **Pro** (55 GB) — **US$46 / mo** (Most Popular)\n• **Elite** (120 GB) — **US$70 / mo**\n• **Infinity Connect Unlimited** — **US$77 / mo** ⭐\n• **Advanced** (320 GB) — **US$106 / mo**\n• **Ultra** (450 GB) — **US$130 / mo**\n• **Mega** (650 GB) — **US$186 / mo**\n\nAll setups include professional rooftop installation, alignment, and local billing support. Additional priority data is US$0.26/GB.`,
        actions: [
          { label: 'Order Starlink via WhatsApp', actionType: 'whatsapp_order', service: 'Starlink Infinity Connect' },
          { label: 'Speak to Connectivity Team', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 6. GPS Motor Vehicle Trackers
    if (q.includes('tracker') || q.includes('gps') || q.includes('immobilizer') || q.includes('tracking') || q.includes('60') || q.includes('kill engine') || q.includes('anti-theft')) {
      return {
        text: `📍 **Nexalink Motor Vehicle GPS Tracker Package:**\n\n• **One-Time Price:** **Only US$60** (Full hardware & installation included!)\n• **No Monthly Subscriptions!**\n• **Operating Airtime:** Only **+US$1/month** to keep real-time tracking active\n• **Features:**\n  - Anti-theft remote engine kill / immobilizer from your phone\n  - Real-time pinpoint GPS tracking & playback\n  - Geo-fencing, route history & overspeed alerts\n\nAvailable for private cars, logistics trucks, and entire commercial fleets.`,
        actions: [
          { label: 'Order $60 Tracker on WhatsApp', actionType: 'whatsapp_order', service: 'Motor Vehicle Tracker ($60)' },
          { label: 'Book Installation', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 7. CCTV & AI Surveillance
    if (q.includes('cctv') || q.includes('camera') || q.includes('surveillance') || q.includes('security') || q.includes('ai stream')) {
      return {
        text: `🎥 **HD AI CCTV & Security Solutions:**\n\n• Commercial 4 to 16+ High-Definition Camera packages\n• Smart AI motion tracking, night vision, and intruder tripwires\n• Remote live streaming directly to your mobile phone & control room\n• Backup power integration for load shedding protection\n\nInstalled at Harare HQ, warehouses, depots, and private residences.`,
        actions: [
          { label: 'Request CCTV Site Assessment', actionType: 'whatsapp_order', service: 'HD AI CCTV Security' },
          { label: 'Consult Security Engineer', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 8. Japan Car Importing & Registration
    if (q.includes('japan') || q.includes('import') || q.includes('car import') || q.includes('auction') || q.includes('be forward') || q.includes('customs clearing') || q.includes('number plate')) {
      return {
        text: `🇯🇵 **Japan Vehicle Direct Sourcing & Importation:**\n\n• Direct access to top Japanese auto auction houses (Toyota, Lexus, Nissan, Honda, Isuzu)\n• Full freight handling, marine insurance, and customs clearance (ZIMRA)\n• Physical registration, initial ZINARA road license, and number plates\n• Turnkey delivery to your door in Harare or Bulawayo!`,
        actions: [
          { label: 'Inquire Japan Vehicle Sourcing', actionType: 'whatsapp_order', service: 'Japan Car Direct Sourcing' },
          { label: 'Talk to Import Specialist', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 9. Digital Utility & Bill Payments
    if (q.includes('zesa') || q.includes('electricity') || q.includes('dstv') || q.includes('school') || q.includes('token') || q.includes('utility') || q.includes('harare bill') || q.includes('fees')) {
      return {
        text: `⚡ **Instant Digital Utility & Bill Payments:**\n\n• Instant **ZESA Prepaid Electricity Tokens**\n• **DStv** package subscriptions & renewals\n• Primary, secondary & tertiary **School Fees Payments**\n• **City of Harare** water and municipal rates\n\n**Accepted Payment Methods:** EcoCash, InnBucks, OMARI, OneMoney, Visa, and Mastercard. Instant SMS/WhatsApp token receipts provided!`,
        actions: [
          { label: 'Pay Bills via WhatsApp', actionType: 'whatsapp_order', service: 'Utility Bill Payment' },
          { label: 'Contact Billing Desk', actionType: 'human_whatsapp' }
        ]
      };
    }

    // 10. Contact, Location, Logistics & Hours
    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('location') || q.includes('address') || q.includes('office') || q.includes('msasa') || q.includes('hours') || q.includes('depot') || q.includes('where') || q.includes('landline') || q.includes('email')) {
      return {
        text: `🏢 **Nexalink Solutions Logistics & Contact:**\n\n• 📍 **Headquarters:** Msasa Depot, Harare, Zimbabwe\n• ☎️ **Landline Telephone:** ${COMPANY_INFO.landline}\n• 📞 **Primary Mobile:** ${COMPANY_INFO.phone}\n• 📱 **Alternative Mobile:** ${COMPANY_INFO.altPhone}\n• 💬 **WhatsApp Desk:** ${COMPANY_INFO.whatsapp}\n• 📧 **Email:** ${COMPANY_INFO.email}\n• 🕒 **Operating Hours:** Mon – Sat: 8:00 AM – 5:00 PM\n\nWe provide nationwide service coverage with same-day disc & courier delivery across Harare.`,
        actions: [
          { label: 'Open WhatsApp Chat', actionType: 'human_whatsapp' },
          { label: `Call Landline (${COMPANY_INFO.landline})`, actionType: 'call' }
        ]
      };
    }

    // 11. Request for Human / Agent
    if (q.includes('human') || q.includes('person') || q.includes('representative') || q.includes('agent') || q.includes('speak') || q.includes('talk') || q.includes('call me') || q.includes('operator')) {
      return {
        text: `I'd be happy to connect you with a Nexalink operations officer right away! 🤝\n\nOur team in Harare is on standby to assist with custom orders, fleet negotiations, and urgent technical support.`,
        actions: [
          { label: '💬 Chat with Nexalink Team on WhatsApp', actionType: 'human_whatsapp' },
          { label: '📞 Call Dispatch Directly', actionType: 'call' }
        ]
      };
    }

    // 12. Friendly Greetings
    if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q.includes('good morning') || q.includes('good afternoon') || q.includes('maswera') || q.includes('mangwanani')) {
      return {
        text: `Hello! 👋 Great to hear from you. I'm Nexalink's AI Assistant.\n\nI can help you manage your account **${clientData.accountNumber}**, check fleet renewal deadlines, explore Starlink $77 unlimited packages, or place a direct WhatsApp order. What can I do for you?`,
        actions: [
          { label: 'Check Account Balance', query: 'What is my current balance?' },
          { label: 'AEG-4902 Renewal Status', query: 'When does vehicle AEG-4902 expire?' },
          { label: 'Starlink $77/mo Details', query: 'Tell me about Starlink Infinity Connect' }
        ]
      };
    }

    // Default Fallback
    return {
      text: `I understand you're asking about "${userInput}".\n\nAs your Nexalink assistant, I can directly assist with:\n• 📡 **Starlink Infinity Connect** (from $40/mo, $77 unlimited)\n• 📍 **$60 GPS Vehicle Trackers** (+ anti-theft immobilizer)\n• 🚗 **ZINARA & Insurance Renewals** (same-day disc delivery)\n• 💰 **Account Balance & Invoices** (Account \`${clientData.accountNumber}\`)\n• 🇯🇵 **Japan Car Direct Imports**\n• 💡 **ZESA & Utility Payments**\n\nIf you need tailored human support, tap below to chat directly on WhatsApp!`,
      actions: [
        { label: 'Chat with Human on WhatsApp', actionType: 'human_whatsapp', queryContext: userInput },
        { label: 'Create New Order', actionType: 'whatsapp_order' },
        { label: 'My Account Status', query: 'What is my account status and balance?' }
      ]
    };
  };

  const handleActionClick = (action) => {
    if (action.query) {
      sendMessage(action.query);
      return;
    }

    if (action.actionType === 'human_whatsapp') {
      const cleanPhone = COMPANY_INFO.phone.replace(/[^\d]/g, '');
      const contextText = action.queryContext
        ? `Hello Nexalink Team, I need assistance with: "${action.queryContext}" (Account: ${clientData.accountNumber})`
        : `Hello Nexalink Team, I would like to speak with a customer care representative regarding my account (${clientData.accountNumber} - ${clientData.companyName}).`;
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(contextText)}`;
      window.open(url, '_blank');
      return;
    }

    if (action.actionType === 'whatsapp_order') {
      if (onOpenOrderModal) {
        onOpenOrderModal({ service: action.service });
      } else {
        const cleanPhone = COMPANY_INFO.phone.replace(/[^\d]/g, '');
        const msg = `Hello Nexalink Team, I would like to place a new order:
- Client Account: ${clientData.accountNumber}
- Service: ${action.service || 'Service Inquiry'}
- Target Vehicle: AEG-4902
- Notes: Please assist with prompt processing`;
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
      }
      return;
    }

    if (action.actionType === 'renew_vehicle') {
      if (onOpenOrderModal) {
        onOpenOrderModal({ service: 'ZINARA Road License Renewal', vehicle: action.vehicle });
      } else {
        const cleanPhone = COMPANY_INFO.phone.replace(/[^\d]/g, '');
        const msg = `Hello Nexalink Team, I would like to place a new order:
- Client Account: ${clientData.accountNumber}
- Service: ZINARA Road License Renewal
- Target Vehicle: ${action.vehicle || 'AEG-4902'}
- Notes: Renewal for 12-month period`;
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
      }
      return;
    }

    if (action.actionType === 'pay') {
      if (onOpenPayment) {
        onOpenPayment(clientData.invoices[0]);
      } else {
        const cleanPhone = COMPANY_INFO.phone.replace(/[^\d]/g, '');
        const msg = `Hello Nexalink Billing Desk, I would like to pay my outstanding balance of US$${clientData.balance.toFixed(2)} for Account ${clientData.accountNumber}.`;
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
      }
      return;
    }

    if (action.actionType === 'call') {
      window.location.href = `tel:${COMPANY_INFO.landline || COMPANY_INFO.phone.replace(/\s+/g, '')}`;
      return;
    }
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 450 + Math.random() * 500;
    setTimeout(() => {
      const responseObj = evaluateQuery(text);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: responseObj.text,
          actions: responseObj.actions,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      // Bold rendering
      const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={j} className="bg-slate-200/70 text-slate-800 px-1 py-0.5 rounded font-mono text-[10px]">{part.slice(1, -1)}</code>;
        }
        return part;
      });
      return (
        <span key={i}>
          {i > 0 && <br />}
          {parts}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="mb-3 w-[360px] sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{ height: '560px', maxHeight: '85vh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#0E2A47] to-[#163b61] text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E63946] to-[#D92638] flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0E2A47]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black tracking-tight">Nexalink Assistant</h4>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-200 border border-sky-400/30">AI</span>
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span>Client:</span>
                  <span className="font-mono text-emerald-300 font-bold">{clientData.accountNumber}</span>
                  <span>• Harare HQ</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => { setIsOpen(false); if (onExternalOpenChange) onExternalOpenChange(false); }}
              className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Account Context Banner */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {clientData.companyName}
            </span>
            <span className="font-mono font-bold text-[#E63946]">
              Due: US${clientData.balance.toFixed(2)}
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[88%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-[#E63946] text-white rounded-br-xs'
                      : 'bg-white text-slate-700 rounded-bl-xs border border-slate-200/90'
                  }`}
                >
                  {renderText(msg.text)}
                  <div className={`text-[9px] mt-1.5 text-right font-mono ${msg.role === 'user' ? 'text-red-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </div>
                </div>

                {/* Interactive Action CTAs attached to message */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.actions.map((act, actIdx) => (
                      <button
                        key={actIdx}
                        onClick={() => handleActionClick(act)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 border ${
                          act.actionType === 'human_whatsapp'
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600 hover:shadow-emerald-600/30'
                            : act.actionType === 'whatsapp_order' || act.actionType === 'renew_vehicle'
                            ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-600'
                            : act.actionType === 'pay'
                            ? 'bg-[#E63946] hover:bg-[#D92638] text-white border-[#E63946]'
                            : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        {act.actionType === 'human_whatsapp' && <PhoneCall className="w-3 h-3" />}
                        {act.actionType === 'renew_vehicle' && <Car className="w-3 h-3" />}
                        {act.actionType === 'pay' && <CreditCard className="w-3 h-3" />}
                        <span>{act.label}</span>
                        {act.actionType && <ExternalLink className="w-2.5 h-2.5 opacity-70" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Fallback Direct WhatsApp CTA Banner */}
          <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-900 font-medium">Need instant human help?</span>
            <button
              onClick={() => handleActionClick({ actionType: 'human_whatsapp' })}
              className="text-emerald-700 hover:text-emerald-900 font-extrabold flex items-center gap-1 hover:underline"
            >
              Direct WhatsApp Desk →
            </button>
          </div>

          {/* Message Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about balance, vehicle expiry, Starlink..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#E63946] text-white hover:bg-[#D92638] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button — hidden on mobile (MobileSpeedDial handles it) */}
      <button
        onClick={handleOpen}
        className={`group relative px-4 py-3 rounded-full text-white shadow-xl transition-all flex items-center gap-2.5 font-bold text-sm border ${
          isOpen
            ? 'bg-slate-700 hover:bg-slate-800 border-slate-600 shadow-lg'
            : 'bg-gradient-to-r from-[#0E2A47] to-[#193a5e] hover:shadow-[#0E2A47]/40 hover:scale-105 border-[#0E2A47]/30'
        }`}
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E63946] border-2 border-white animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E63946] border-2 border-white"></span>
            </>
          )}
        </div>
        <span className="hidden sm:inline font-extrabold">
          {isOpen ? 'Close Assistant' : 'AI Assistant'}
        </span>
      </button>
    </div>
  );
}
