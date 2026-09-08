import React, { useState } from 'react';
import { MOCK_CLIENT_DATA } from '../data/mockData';
import { Wifi, Car, CreditCard, FileText, Download, Lock, LogOut, PlusCircle, Clock } from 'lucide-react';
import PaymentModal from './PaymentModal';

export default function ClientPortalView({ onOpenQuote }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const [fleet] = useState(MOCK_CLIENT_DATA.fleetVehicles);
  const [tickets, setTickets] = useState(MOCK_CLIENT_DATA.tickets);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  const handlePayInvoice = (inv) => {
    setSelectedInvoice(inv);
    setIsPayModalOpen(true);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketSubject) return;
    const newTck = {
      id: `TCK-${Math.floor(400 + Math.random() * 900)}`,
      subject: newTicketSubject,
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      priority: 'High'
    };
    setTickets([newTck, ...tickets]);
    setNewTicketSubject('');
    setShowNewTicketModal(false);
  };

  return (
    <div className="space-y-8 pb-16 bg-[#F8FAFC]">
      
      {/* Top Banner with Auth Switcher */}
      <div className="bg-hero-glow py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-[#0284C7] border border-sky-200 uppercase">
                Enterprise Self-Service Hub
              </span>
              <span className="text-xs text-slate-500 font-mono">• Account: NX-884920</span>
            </div>
            <h1 className="text-3xl font-black text-[#0E2A47]">
              {isAuthenticated ? `Welcome back, ${MOCK_CLIENT_DATA.clientName}` : 'Nexalink Client Portal Access'}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {isAuthenticated ? `${MOCK_CLIENT_DATA.companyName} • Harare HQ SLA Account` : 'Log in to manage active Starlink subscriptions, fleet licenses & invoices.'}
            </p>
          </div>

          {/* Auth Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                isAuthenticated
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 shadow-xs'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="w-3.5 h-3.5 text-red-500" /> Simulate Guest Mode
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" /> Authenticate Client Session
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* GUEST LANDING PREVIEW */}
      {!isAuthenticated ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-6 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-[#0284C7]">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-[#0E2A47]">Client Portal Login</h2>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Enter your Nexalink Account ID (e.g. NX-884920) or registered email address to access active services and invoice portals.
            </p>
            <div className="space-y-3 text-xs text-left">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Account Number or Email</label>
                <input
                  type="text"
                  defaultValue="NX-884920"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Passcode / OTP</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(true)}
              className="w-full py-3 bg-[#E63946] hover:bg-[#D92638] text-white font-extrabold text-xs rounded-xl shadow"
            >
              Sign In to Dashboard
            </button>
          </div>
        </div>
      ) : (
        
        /* AUTHENTICATED DASHBOARD */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* METRICS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 font-bold">Active Services</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#0E2A47] font-mono">{MOCK_CLIENT_DATA.activeServices}</span>
                <Wifi className="w-5 h-5 text-[#0284C7]" />
              </div>
              <span className="text-[10px] text-emerald-600 block font-bold pt-1">Starlink + CCTV Online</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 font-bold">Fleet Vehicles</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#0E2A47] font-mono">{fleet.length}</span>
                <Car className="w-5 h-5 text-[#E63946]" />
              </div>
              <span className="text-[10px] text-amber-600 block font-bold pt-1">1 ZINARA Renewal Due</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 font-bold">Outstanding Balance</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#0284C7] font-mono">US${MOCK_CLIENT_DATA.balance.toFixed(2)}</span>
                <CreditCard className="w-5 h-5 text-[#0284C7]" />
              </div>
              <button 
                onClick={() => handlePayInvoice(MOCK_CLIENT_DATA.invoices[0])}
                className="text-[10px] text-[#E63946] hover:underline font-extrabold block pt-1"
              >
                Pay via EcoCash Now →
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] text-slate-500 font-bold">Open Support Tickets</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#0E2A47] font-mono">{tickets.filter(t => t.status !== 'Resolved').length}</span>
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-[10px] text-slate-500 block font-bold pt-1">1 SLA Ticket In Progress</span>
            </div>

          </div>

          {/* QUICK ACTIONS TOOLBAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#0E2A47]">Quick Portal Actions:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={onOpenQuote}
                className="px-3.5 py-2 bg-[#E63946] hover:bg-[#D92638] text-white font-extrabold rounded-xl shadow flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Request New Service
              </button>
              <button
                onClick={() => handlePayInvoice(MOCK_CLIENT_DATA.invoices[0])}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" /> Make a Payment
              </button>
              <button
                onClick={() => setShowNewTicketModal(true)}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#0E2A47] border border-slate-300 font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#0284C7]" /> Open Support Request
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'overview' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              My Services & Fleet Table
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'invoices' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Invoices & Billing Statements ({MOCK_CLIENT_DATA.invoices.length})
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'tickets' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Support Tickets ({tickets.length})
            </button>
          </div>

          {/* TAB 1: FLEET & IT TABLE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0E2A47] flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#E63946]" /> My Registered Vehicle Fleet
                    </h3>
                    <p className="text-xs text-slate-500">Automated ZINARA road license & insurance expiry tracking</p>
                  </div>
                  <button onClick={onOpenQuote} className="text-xs text-[#0284C7] hover:underline font-bold">
                    + Add Vehicle to Fleet
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Vehicle Reg</th>
                        <th className="p-3">Model</th>
                        <th className="p-3">GPS Tracker ($60)</th>
                        <th className="p-3">ZINARA Expiry</th>
                        <th className="p-3">Insurance Expiry</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {fleet.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-extrabold text-[#0E2A47]">{v.reg}</td>
                          <td className="p-3">{v.model}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {v.trackerStatus}
                            </span>
                          </td>
                          <td className="p-3 font-mono">{v.zinaraExpiry}</td>
                          <td className="p-3 font-mono">{v.insuranceExpiry}</td>
                          <td className="p-3">
                            {v.status === 'Renewal Warning' ? (
                              <button
                                onClick={() => handlePayInvoice({ id: `ZIN-${v.reg}`, description: `ZINARA License Renewal for ${v.reg}`, amount: 40.00 })}
                                className="px-2.5 py-1 bg-[#E63946] hover:bg-[#D92638] text-white font-extrabold text-[10px] rounded shadow animate-pulse"
                              >
                                Renew Disc Now
                              </button>
                            ) : (
                              <span className="text-emerald-600 font-bold text-[10px]">✓ Compliant</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active IT Services */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-extrabold text-[#0E2A47] flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-[#0284C7]" /> Active Starlink & Connectivity Infrastructure
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {MOCK_CLIENT_DATA.itServices.map((it, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0E2A47]">{it.service}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-100 text-[#0284C7] font-bold">
                          {it.status}
                        </span>
                      </div>
                      <p className="text-slate-600">Package: {it.package} • IP: <span className="font-mono text-slate-800">{it.ip}</span></p>
                      <p className="text-slate-600">Location: {it.location}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INVOICES */}
          {activeTab === 'invoices' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-[#0E2A47]">Billing History & PDF Statements</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Invoice ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {MOCK_CLIENT_DATA.invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-[#0E2A47]">{inv.id}</td>
                        <td className="p-3 font-mono">{inv.date}</td>
                        <td className="p-3">{inv.description}</td>
                        <td className="p-3 font-mono font-extrabold text-[#0284C7]">US${inv.amount.toFixed(2)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#E63946]'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {inv.status === 'Unpaid' ? (
                            <button
                              onClick={() => handlePayInvoice(inv)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] rounded"
                            >
                              Pay Now
                            </button>
                          ) : (
                            <button
                              onClick={() => alert(`Downloading PDF Statement for ${inv.id}...`)}
                              className="text-slate-600 hover:text-slate-900 flex items-center gap-1 text-[11px] font-bold"
                            >
                              <Download className="w-3.5 h-3.5" /> PDF
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TICKETS */}
          {activeTab === 'tickets' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0E2A47]">SLA Support Ticket Status Tracker</h3>
                <button
                  onClick={() => setShowNewTicketModal(true)}
                  className="px-3 py-1.5 bg-[#E63946] text-white font-extrabold text-xs rounded-xl"
                >
                  + New Ticket
                </button>
              </div>

              <div className="space-y-3">
                {tickets.map((t) => (
                  <div key={t.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#0E2A47]">{t.id} • {t.date}</span>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          t.status === 'Submitted' ? 'bg-amber-100 text-amber-800' : 'text-slate-400'
                        }`}>
                          1. Submitted
                        </span>
                        <span className="text-slate-400">➔</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          t.status === 'In Progress' ? 'bg-sky-100 text-[#0284C7]' : 'text-slate-400'
                        }`}>
                          2. In Progress
                        </span>
                        <span className="text-slate-400">➔</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400'
                        }`}>
                          3. Resolved
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-800 font-bold">{t.subject}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <h4 className="text-base font-extrabold text-[#0E2A47]">Open Support Ticket</h4>
            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Issue / Service Request Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Request Starlink Dish repositioning at Msasa depot..."
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E63946] text-white font-extrabold rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        invoice={selectedInvoice}
      />

    </div>
  );
}
