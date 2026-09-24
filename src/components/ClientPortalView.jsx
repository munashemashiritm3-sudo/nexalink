import React, { useState } from 'react';
import { MOCK_CLIENT_DATA, COMPANY_INFO } from '../data/mockData';
import { Wifi, Car, CreditCard, FileText, Download, Lock, LogOut, PlusCircle, Clock, Bell, Send, CheckCircle2, AlertTriangle, MessageSquare, ExternalLink, ShieldCheck, Play, Upload, CalendarDays } from 'lucide-react';
import PaymentModal from './PaymentModal';
import CreateOrderModal from './CreateOrderModal';
import FleetBulkUploadModal from './FleetBulkUploadModal';
import { getNotificationLogs, runScheduledAlertCheck } from '../services/alertNotificationService';
import { downloadCalendarICS } from '../services/calendarSyncService';

export default function ClientPortalView({ onOpenQuote }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // WhatsApp Order Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderPreselectedVehicle, setOrderPreselectedVehicle] = useState(null);
  const [orderPreselectedService, setOrderPreselectedService] = useState(null);

  // Fleet & Tickets State — mutable so bulk import can add vehicles
  const [fleet, setFleet] = useState(MOCK_CLIENT_DATA.fleetVehicles);
  const [tickets, setTickets] = useState(MOCK_CLIENT_DATA.tickets);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  // Fleet Bulk Upload & Calendar Sync State
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [calendarSyncNotice, setCalendarSyncNotice] = useState(null);

  // Automated Alerts State
  const [notificationLogs, setNotificationLogs] = useState(getNotificationLogs());
  const [isAlertRunning, setIsAlertRunning] = useState(false);
  const [alertNotice, setAlertNotice] = useState(null);
  const [previewLog, setPreviewLog] = useState(null);

  const handlePayInvoice = (inv) => {
    setSelectedInvoice(inv);
    setIsPayModalOpen(true);
  };

  const handleOpenOrder = (serviceName = null, vehicleReg = null) => {
    setOrderPreselectedService(serviceName);
    setOrderPreselectedVehicle(vehicleReg);
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmitted = (orderData) => {
    const newTck = {
      id: `ORD-${Math.floor(500 + Math.random() * 400)}`,
      subject: `WhatsApp Order: ${orderData.service} (${orderData.targetVehicle})`,
      date: new Date().toISOString().split('T')[0],
      status: 'In Progress',
      priority: 'High'
    };
    setTickets([newTck, ...tickets]);
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

  // Bulk Fleet Import handler
  const handleVehiclesImported = (newVehicles) => {
    setFleet((prev) => [
      ...prev,
      ...newVehicles.filter((nv) => !prev.some((pv) => pv.reg === nv.reg))
    ]);
    setIsBulkUploadOpen(false);
  };

  // Calendar Sync handler
  const handleCalendarSync = () => {
    const result = downloadCalendarICS(fleet, MOCK_CLIENT_DATA.accountNumber);
    setCalendarSyncNotice(`✅ Calendar file downloaded with ${result.eventCount} expiry event(s) — import into Apple/Google Calendar or Outlook.`);
    setTimeout(() => setCalendarSyncNotice(null), 6000);
  };

  // Trigger 08:00 AM Cron Alert Sweep simulation
  const handleTriggerAlertCheck = () => {
    setIsAlertRunning(true);
    setAlertNotice(null);

    setTimeout(() => {
      const result = runScheduledAlertCheck(MOCK_CLIENT_DATA);
      setNotificationLogs(result.allLogs);
      setIsAlertRunning(false);
      setAlertNotice({
        type: 'success',
        text: `08:00 AM Alert Sweep completed: ${result.dispatchedCount} new automated alerts evaluated and dispatched.`
      });
    }, 800);
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
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                08:00 AM Alert Daemon Active
              </span>
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
              <span className="text-[11px] text-slate-500 font-bold">Open Support / Orders</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#0E2A47] font-mono">{tickets.filter(t => t.status !== 'Resolved').length}</span>
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-[10px] text-slate-500 block font-bold pt-1">Active SLA Operations</span>
            </div>

          </div>

          {/* QUICK ACTIONS TOOLBAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0E2A47]">Quick Portal Actions:</span>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                Primary WhatsApp: <strong className="font-mono text-slate-800">+263 788 172 075</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {/* WhatsApp Order Button */}
              <button
                onClick={() => handleOpenOrder()}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Create New Order (WhatsApp)
              </button>

              <button
                onClick={() => handlePayInvoice(MOCK_CLIENT_DATA.invoices[0])}
                className="px-3.5 py-2 bg-[#E63946] hover:bg-[#D92638] text-white font-extrabold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
              >
                <CreditCard className="w-3.5 h-3.5" /> Pay US$77.00 Balance
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
          <div className="flex border-b border-slate-200 gap-4 text-xs font-bold overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              My Services & Fleet Table
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'invoices' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Invoices & Statements ({MOCK_CLIENT_DATA.invoices.length})
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'tickets' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Support Tickets & Orders ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'alerts' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>Automated Alerts & Dispatch Logs</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-extrabold">
                {notificationLogs.length}
              </span>
            </button>
          </div>

          {/* TAB 1: FLEET & IT TABLE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0E2A47] flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#E63946]" /> My Registered Vehicle Fleet
                    </h3>
                    <p className="text-xs text-slate-500">Automated ZINARA road license & insurance expiry tracking (14, 7, 1 day alert triggers)</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleOpenOrder('Motor Vehicle Tracker Full Package ($60)')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      + Order $60 GPS Tracker
                    </button>
                    <button
                      onClick={() => setIsBulkUploadOpen(true)}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" /> Bulk Upload Vehicles
                    </button>
                    <button
                      onClick={handleCalendarSync}
                      className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <CalendarDays className="w-3.5 h-3.5" /> Sync Expirations to Calendar
                    </button>
                    <button onClick={onOpenQuote} className="text-xs text-[#0284C7] hover:underline font-bold">
                      + Add Vehicle
                    </button>
                  </div>
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
                          <td className="p-3 font-mono">
                            <span className={v.status === 'Renewal Warning' ? 'text-[#E63946] font-bold' : ''}>
                              {v.zinaraExpiry}
                            </span>
                          </td>
                          <td className="p-3 font-mono">{v.insuranceExpiry}</td>
                          <td className="p-3">
                            {v.status === 'Renewal Warning' ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenOrder('ZINARA Road License Renewal', v.reg)}
                                  className="px-2.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-extrabold text-[10px] rounded-lg shadow flex items-center gap-1 animate-pulse"
                                >
                                  <Send className="w-3 h-3" /> Order via WhatsApp
                                </button>
                                <button
                                  onClick={() => handlePayInvoice({ id: `ZIN-${v.reg}`, description: `ZINARA License Renewal for ${v.reg}`, amount: 40.00 })}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded-lg"
                                >
                                  Pay $40
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleOpenOrder('Vehicle Insurance Renewal (Third-Party / Full)', v.reg)}
                                className="text-slate-500 hover:text-emerald-700 font-bold text-[11px] flex items-center gap-1"
                              >
                                ✓ Compliant • <span className="underline">Renew Early</span>
                              </button>
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
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#0E2A47] flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-[#0284C7]" /> Active Starlink & Connectivity Infrastructure
                  </h3>
                  <button
                    onClick={() => handleOpenOrder('Starlink Infinity Connect Satellite Internet ($77/mo)')}
                    className="text-xs text-emerald-600 hover:underline font-bold"
                  >
                    + Upgrade / Order Starlink Bundle
                  </button>
                </div>

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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#0E2A47]">Billing History & Statements</h3>
                  <p className="text-xs text-slate-500">Unpaid balance is automatically monitored by the 08:00 AM alert daemon</p>
                </div>
                <button
                  onClick={() => handlePayInvoice(MOCK_CLIENT_DATA.invoices[0])}
                  className="px-3.5 py-1.5 bg-[#E63946] text-white font-extrabold text-xs rounded-xl"
                >
                  Pay Outstanding US${MOCK_CLIENT_DATA.balance.toFixed(2)}
                </button>
              </div>

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

          {/* TAB 3: TICKETS & ORDERS */}
          {activeTab === 'tickets' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#0E2A47]">Support Tickets & WhatsApp Orders</h3>
                  <p className="text-xs text-slate-500">Live tracker for dispatched orders and technical tickets</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenOrder()}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Create Order
                  </button>
                  <button
                    onClick={() => setShowNewTicketModal(true)}
                    className="px-3 py-1.5 bg-[#E63946] text-white font-extrabold text-xs rounded-xl"
                  >
                    + Open Ticket
                  </button>
                </div>
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

          {/* TAB 4: AUTOMATED ALERTS & NOTIFICATIONS LOG */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              
              {/* Alert System Control Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#0E2A47]">
                          Automated 08:00 AM Alert Notification Daemon
                        </h3>
                        <p className="text-xs text-slate-500">
                          Automated client reminders for upcoming vehicle license renewals (14, 7, 1 day) and unpaid balances
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={handleTriggerAlertCheck}
                      disabled={isAlertRunning}
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs rounded-xl shadow flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {isAlertRunning ? 'Evaluating Thresholds...' : 'Run 08:00 AM Alert Check Now'}
                    </button>
                  </div>
                </div>

                {alertNotice && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{alertNotice.text}</span>
                  </div>
                )}

                {/* System Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Cron Schedule</span>
                    <div className="font-mono font-bold text-[#0E2A47]">0 8 * * * (Daily at 08:00 AM)</div>
                    <span className="text-[10px] text-emerald-600 font-semibold">Active & Healthy</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Renewal Thresholds</span>
                    <div className="font-mono font-bold text-[#0E2A47]">14 Days • 7 Days • 1 Day</div>
                    <span className="text-[10px] text-slate-500">ZINARA & Vehicle Insurance</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Billing Evaluation</span>
                    <div className="font-mono font-bold text-[#0E2A47]">Balance &gt; US$0.00 Overdue</div>
                    <span className="text-[10px] text-slate-500">EcoCash / InnBucks Links</span>
                  </div>
                </div>
              </div>

              {/* Dispatched Notifications Log Table */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0E2A47]">
                      Database Table: `notifications_log`
                    </h4>
                    <p className="text-xs text-slate-500">
                      Dispatched logs with timestamps to prevent duplicate alerts within 24 hours
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Total Records: {notificationLogs.length}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Log ID</th>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Alert Type</th>
                        <th className="p-3">Target Entity</th>
                        <th className="p-3">Channel</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Message Preview</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {notificationLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-[#0E2A47]">{log.id}</td>
                          <td className="p-3 font-mono text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                          <td className="p-3">
                            <span className="font-bold text-[#0E2A47]">{log.alertType}</span>
                          </td>
                          <td className="p-3 font-mono text-[#0284C7] font-semibold">{log.targetEntity}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              {log.channel}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              {log.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => setPreviewLog(log)}
                              className="text-[#0284C7] hover:underline font-bold text-[11px] flex items-center gap-1"
                            >
                              View Template →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* WhatsApp Create Order Modal */}
      <CreateOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedVehicle={orderPreselectedVehicle}
        preselectedService={orderPreselectedService}
        onOrderSubmitted={handleOrderSubmitted}
      />

      {/* Notification Message Preview Modal */}
      {previewLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-[#0284C7]">
                  {previewLog.channel}
                </span>
                <h4 className="text-base font-extrabold text-[#0E2A47] mt-1">{previewLog.alertType}</h4>
                <p className="text-xs text-slate-500 font-mono">Dispatched at {previewLog.timestamp} • {previewLog.targetEntity}</p>
              </div>
              <button
                onClick={() => setPreviewLog(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Delivered Notification Body:</label>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans leading-relaxed whitespace-pre-wrap">
                {previewLog.message}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Recipient: <strong className="text-slate-700">{previewLog.recipientName}</strong></span>
              <button
                onClick={() => setPreviewLog(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
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

      {/* Fleet Bulk Upload Modal */}
      <FleetBulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        onVehiclesImported={handleVehiclesImported}
      />

      {/* Calendar Sync Toast Notification */}
      {calendarSyncNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] max-w-md w-full mx-4 px-5 py-3.5 bg-violet-700 text-white rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CalendarDays className="w-4 h-4 shrink-0" />
          <span className="flex-1">{calendarSyncNotice}</span>
          <button onClick={() => setCalendarSyncNotice(null)} className="text-violet-300 hover:text-white font-bold text-sm">✕</button>
        </div>
      )}

    </div>
  );
}
