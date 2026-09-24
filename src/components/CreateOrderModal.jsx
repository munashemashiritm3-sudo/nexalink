import React, { useState, useEffect } from 'react';
import { X, Send, Car, Wifi, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MOCK_CLIENT_DATA, COMPANY_INFO } from '../data/mockData';

const SERVICE_OPTIONS = [
  { id: 'zinara', label: 'ZINARA Road License Renewal', category: 'Vehicle Licensing', icon: Car, defaultNotes: 'Renewal for 12-month period, same-day disc delivery' },
  { id: 'insurance', label: 'Vehicle Insurance Renewal (Third-Party / Full)', category: 'Vehicle Licensing', icon: ShieldCheck, defaultNotes: 'Renewal for 12-month period' },
  { id: 'tracker', label: 'Motor Vehicle Tracker Full Package ($60)', category: 'Mobility & GPS', icon: ShieldCheck, defaultNotes: 'Installation booking at Harare Msasa depot or on-site' },
  { id: 'starlink', label: 'Starlink Infinity Connect Satellite Internet ($77/mo)', category: 'Connectivity', icon: Wifi, defaultNotes: 'Hardware installation & priority unlimited data setup' },
  { id: 'cctv', label: 'HD AI CCTV Security Surveillance System', category: 'Security & IT', icon: Wifi, defaultNotes: 'Site assessment for 8-camera AI surveillance' },
  { id: 'japan-import', label: 'Japan Vehicle Direct Sourcing & Import', category: 'Vehicle Admin', icon: Car, defaultNotes: 'Request auction quotation & clearing timeline' },
  { id: 'utility', label: 'Utility Bill Payment (ZESA / DStv / School Fees)', category: 'Digital Payments', icon: CheckCircle2, defaultNotes: 'Immediate token generation & receipt delivery' }
];

export default function CreateOrderModal({ isOpen, onClose, preselectedVehicle, preselectedService, onOrderSubmitted }) {
  const [service, setService] = useState('ZINARA Road License Renewal');
  const [targetVehicle, setTargetVehicle] = useState('');
  const [notes, setNotes] = useState('Renewal for 12-month period');
  const [whatsappLine, setWhatsappLine] = useState('+263788172075');
  const [customVehicle, setCustomVehicle] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync props when opening
  useEffect(() => {
    if (preselectedVehicle) {
      setTargetVehicle(preselectedVehicle);
    } else if (MOCK_CLIENT_DATA.fleetVehicles.length > 0) {
      setTargetVehicle(MOCK_CLIENT_DATA.fleetVehicles[0].reg);
    } else {
      setTargetVehicle('General Account (NX-884920)');
    }

    if (preselectedService) {
      setService(preselectedService);
      const matched = SERVICE_OPTIONS.find(s => s.label.toLowerCase().includes(preselectedService.toLowerCase()) || s.id === preselectedService);
      if (matched) {
        setNotes(matched.defaultNotes);
      }
    }
  }, [isOpen, preselectedVehicle, preselectedService]);

  if (!isOpen) return null;

  const handleServiceChange = (e) => {
    const selected = e.target.value;
    setService(selected);
    const matched = SERVICE_OPTIONS.find(s => s.label === selected);
    if (matched) {
      setNotes(matched.defaultNotes);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalTarget = targetVehicle === '__custom__' ? (customVehicle.trim() || 'Custom Vehicle') : targetVehicle;

    // Strict prompt formatting:
    // Hello Nexalink Team, I would like to place a new order:
    // - Client Account: NX-884920
    // - Service: ZINARA Road License Renewal
    // - Target Vehicle: AEG-4902
    // - Notes: Renewal for 12-month period
    const rawMessage = `Hello Nexalink Team, I would like to place a new order:
- Client Account: ${MOCK_CLIENT_DATA.accountNumber}
- Service: ${service}
- Target Vehicle: ${finalTarget}
- Notes: ${notes.trim() || 'Please process at your earliest convenience'}`;

    const encoded = encodeURIComponent(rawMessage);
    const cleanNumber = whatsappLine.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    setIsSuccess(true);

    if (onOrderSubmitted) {
      onOrderSubmitted({
        service,
        targetVehicle: finalTarget,
        notes,
        whatsappLine,
        timestamp: new Date().toISOString()
      });
    }

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-2xl relative overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Direct WhatsApp Dispatch
            </div>
            <h3 className="text-xl font-black text-[#0E2A47]">Create New Service Order</h3>
            <p className="text-xs text-slate-500">
              Account: <span className="font-mono font-bold text-slate-700">{MOCK_CLIENT_DATA.accountNumber}</span> • {MOCK_CLIENT_DATA.companyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-50 shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-black text-[#0E2A47]">Opening WhatsApp Chat!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your order has been formatted and directed to Nexalink's WhatsApp dispatch team.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Service Type Selection */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Service Type <span className="text-[#E63946]">*</span>
              </label>
              <select
                value={service}
                onChange={handleServiceChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946] focus:outline-none"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.label}>
                    {opt.label} ({opt.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Vehicle / Account */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Target Vehicle or Account <span className="text-[#E63946]">*</span>
              </label>
              <select
                value={targetVehicle}
                onChange={(e) => setTargetVehicle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946] focus:outline-none"
              >
                {MOCK_CLIENT_DATA.fleetVehicles.map((v) => (
                  <option key={v.reg} value={v.reg}>
                    {v.reg} — {v.model} ({v.status})
                  </option>
                ))}
                <option value="General Account (NX-884920)">
                  General Account / HQ (NX-884920)
                </option>
                <option value="__custom__">
                  + Other / Custom Vehicle Registration...
                </option>
              </select>

              {targetVehicle === '__custom__' && (
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter Registration No. (e.g. AGH-9021)"
                    value={customVehicle}
                    onChange={(e) => setCustomVehicle(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 uppercase font-mono font-bold focus:ring-2 focus:ring-[#E63946]/30 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Order Notes / Specifications */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Notes / Special Specifications
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Renewal for 12-month period, delivery address in Msasa, urgent processing..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946] focus:outline-none"
              />
            </div>

            {/* Target WhatsApp Line Selector */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Dispatch WhatsApp Number
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWhatsappLine('+263788172075')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    whatsappLine === '+263788172075'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/30'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-bold">Primary Support</div>
                    <div className="font-mono text-[10px]">+263 788 172 075</div>
                  </div>
                  {whatsappLine === '+263788172075' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                </button>

                <button
                  type="button"
                  onClick={() => setWhatsappLine('+263784559107')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    whatsappLine === '+263784559107'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/30'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-bold">Desk Operations</div>
                    <div className="font-mono text-[10px]">+263 784 559 107</div>
                  </div>
                  {whatsappLine === '+263784559107' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                </button>
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Generated WhatsApp Dispatch Preview:
              </span>
              <pre className="text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-tight bg-white p-2.5 rounded-xl border border-slate-200">
{`Hello Nexalink Team, I would like to place a new order:
- Client Account: ${MOCK_CLIENT_DATA.accountNumber}
- Service: ${service}
- Target Vehicle: ${targetVehicle === '__custom__' ? (customVehicle || 'Custom Vehicle') : targetVehicle}
- Notes: ${notes.trim() || 'Renewal for 12-month period'}`}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" /> Dispatch Order to WhatsApp
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
