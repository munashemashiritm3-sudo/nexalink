import React, { useState } from 'react';
import { SOLUTIONS_CATEGORIES } from '../data/mockData';
import { X, Check, ArrowRight, ArrowLeft, Upload, ShieldCheck, CheckCircle2, Copy, FileText, Send } from 'lucide-react';

export default function QuoteWizardModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerType: 'Business',
    categories: ['Connectivity & IT Solutions'],
    name: '',
    company: '',
    email: '',
    phone: '',
    location: 'Harare',
    unitsCount: '1-5',
    details: '',
    files: null
  });

  const [submittedPayload, setSubmittedPayload] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const customerTypes = [
    { id: 'Individual', label: 'Individual / Personal', desc: 'Vehicle licensing, home internet, tracker, utility bills' },
    { id: 'Business', label: 'Business / SME', desc: 'Commercial IT, fleet tracking, Starlink, company cars' },
    { id: 'Organisation', label: 'Enterprise / NGO / Gov', desc: 'Multi-branch setups, institutional logistics & IT SLA' }
  ];

  const categoryOptions = SOLUTIONS_CATEGORIES.map(c => c.title);

  const toggleCategory = (cat) => {
    setFormData(prev => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        if (prev.categories.length === 1) return prev;
        return { ...prev, categories: prev.categories.filter(c => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  const handleNext = () => {
    if (step === 3 && (!formData.name || !formData.email || !formData.phone)) {
      alert("Please fill in your Name, Email, and Phone number.");
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const refId = `NX-LEAD-${Math.floor(100000 + Math.random() * 900000)}`;
    const payload = {
      leadReference: refId,
      timestamp: new Date().toISOString(),
      customerType: formData.customerType,
      requestedServices: formData.categories,
      contact: {
        name: formData.name || "Client",
        company: formData.company || "N/A",
        email: formData.email,
        phone: formData.phone,
        location: formData.location
      },
      projectSpecs: {
        unitsOrVehicles: formData.unitsCount,
        details: formData.details || "Standard service request",
        attachedFilesCount: formData.files ? formData.files.length : 0
      },
      status: "NEW_LEAD_DISPATCHED",
      assignedManager: "Moses Tadiwa Chikwature (MD)"
    };

    setSubmittedPayload(payload);
    setStep(5);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(submittedPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sendToWhatsApp = () => {
    if (!submittedPayload) return;
    const msg = `*Nexalink Quote Request (${submittedPayload.leadReference})*\n` +
      `Type: ${submittedPayload.customerType}\n` +
      `Name: ${submittedPayload.contact.name}\n` +
      `Company: ${submittedPayload.contact.company}\n` +
      `Phone: ${submittedPayload.contact.phone}\n` +
      `Services: ${submittedPayload.requestedServices.join(', ')}\n` +
      `Units: ${submittedPayload.projectSpecs.unitsOrVehicles}\n` +
      `Details: ${submittedPayload.projectSpecs.details}`;
    
    window.open(`https://wa.me/263713123055?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0E2A47] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Nexalink" className="h-9 w-auto bg-white rounded p-1" />
            <div>
              <h3 className="text-base font-extrabold text-white">Nexalink Quote Wizard</h3>
              <p className="text-xs text-slate-300">Step {step} of 5 • Dynamic Proposal Generator</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div 
            className="bg-[#E63946] h-2 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* STEP 1: Customer Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-black text-[#0E2A47]">1. Select Your Account Type</h4>
                <p className="text-xs text-slate-500">Help us tailor pricing and compliance models for your entity.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {customerTypes.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setFormData({ ...formData, customerType: t.id })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                      formData.customerType === t.id
                        ? 'bg-red-50/60 border-[#E63946] shadow-sm ring-1 ring-[#E63946]'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.customerType === t.id ? 'border-[#E63946] bg-[#E63946]' : 'border-slate-300'
                    }`}>
                      {formData.customerType === t.id && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#0E2A47]">{t.label}</h5>
                      <p className="text-xs text-slate-600 mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Service Categories */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-black text-[#0E2A47]">2. Which Services Do You Require?</h4>
                <p className="text-xs text-slate-500">Select all that apply to your current project or operational needs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryOptions.map((cat) => {
                  const selected = formData.categories.includes(cat);
                  return (
                    <div
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selected
                          ? 'bg-sky-50 border-[#0284C7] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#0E2A47]">{cat}</span>
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        selected ? 'bg-[#0284C7] border-[#0284C7]' : 'border-slate-300'
                      }`}>
                        {selected && <Check className="w-3.5 h-3.5 text-white font-bold" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Contact Info */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-black text-[#0E2A47]">3. Contact & Business Details</h4>
                <p className="text-xs text-slate-500">Where should our Zimbabwean support manager reach you?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tendai Musarurwa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#E63946] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company / Org Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Zim Logistics Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#E63946] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.co.zw"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#E63946] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+263 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#E63946] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">City / Region in Zimbabwe</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#E63946] focus:outline-none"
                  >
                    <option value="Harare">Harare (Shop 33 Island Mall)</option>
                    <option value="Bulawayo">Bulawayo</option>
                    <option value="Gweru">Gweru</option>
                    <option value="Mutare">Mutare</option>
                    <option value="Masvingo">Masvingo</option>
                    <option value="Kwekwe">Kwekwe</option>
                    <option value="Other">Other Region / International</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Project Specs & Upload */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-black text-[#0E2A47]">4. Requirements & Specifications</h4>
                <p className="text-xs text-slate-500">Specify quantity, vehicle count, or custom requests.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Estimated Units / Vehicles / Devices</label>
                  <select
                    value={formData.unitsCount}
                    onChange={(e) => setFormData({ ...formData, unitsCount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#E63946] focus:outline-none"
                  >
                    <option value="1">1 Unit / Single Vehicle</option>
                    <option value="2-5">2 - 5 Units (Small Fleet / Office)</option>
                    <option value="6-20">6 - 20 Units (Medium Enterprise)</option>
                    <option value="20+">20+ Units (Large Institutional SLA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Detailed Description of Requirement</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need 3x $60 Vehicle Trackers installed in Msasa + 1x Starlink Infinity Connect Unlimited set up at Harare HQ..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#E63946] focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Upload Documents / Fleet Specs (Optional)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-slate-400 transition-colors bg-slate-50">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xs text-slate-600 font-medium">Drag & drop fleet list, registration book copies, or floor plans</p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports PDF, PNG, JPG up to 10MB</p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFormData({ ...formData, files: e.target.files })}
                      className="hidden"
                      id="quote-file-upload-light"
                    />
                    <label htmlFor="quote-file-upload-light" className="inline-block mt-2 px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded cursor-pointer shadow-xs">
                      Select Files
                    </label>
                    {formData.files && (
                      <p className="text-xs text-[#0284C7] font-bold mt-2">
                        Attached {formData.files.length} file(s)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation Payload */}
          {step === 5 && submittedPayload && (
            <div className="space-y-4 text-center sm:text-left">
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-base font-extrabold text-[#0E2A47]">Quote Request Successfully Submitted!</h4>
                  <p className="text-xs text-emerald-800 font-medium">
                    Reference: <span className="font-mono font-bold text-[#0E2A47]">{submittedPayload.leadReference}</span> • Assigned Manager: Moses Tadiwa Chikwature (MD)
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold text-[#0E2A47] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#0284C7]" /> Generated Lead Payload JSON:
                  </span>
                  <button
                    onClick={handleCopyPayload}
                    className="text-xs text-[#0284C7] hover:underline flex items-center gap-1 font-mono font-bold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied to Clipboard!" : "Copy JSON"}
                  </button>
                </div>

                <pre className="bg-slate-900 p-3.5 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto text-left max-h-44 border border-slate-800">
                  {JSON.stringify(submittedPayload, null, 2)}
                </pre>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-[#0E2A47]">Want faster response on WhatsApp?</p>
                  <p className="text-slate-600">Directly dispatch your quote reference to our Harare desk (+263 713 123 055).</p>
                </div>
                <button
                  onClick={sendToWhatsApp}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-4 h-4" /> Send via WhatsApp
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 5 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl bg-white shadow-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 && (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#E63946] hover:bg-[#D92638] rounded-xl shadow flex items-center gap-1.5"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow flex items-center gap-1.5"
            >
              Submit Quote Request <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          {step === 5 && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-extrabold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 shadow-xs"
            >
              Done & Close
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
