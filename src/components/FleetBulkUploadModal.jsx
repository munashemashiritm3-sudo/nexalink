import React, { useState, useRef } from 'react';
import { X, Upload, Download, CheckCircle2, AlertTriangle, Table2, ChevronRight, Car } from 'lucide-react';

// CSV template columns
const CSV_HEADERS = ['Registration_No', 'Vehicle_Make_Model', 'ZINARA_Expiry_Date', 'Insurance_Expiry_Date', 'Owner_Contact'];

const TEMPLATE_CSV = [
  CSV_HEADERS.join(','),
  'AEG-0001,Toyota Hilux,2027-03-15,2027-03-15,+263 77X XXX XXX',
  'AFB-0002,Ford Ranger,2026-12-01,2026-12-01,+263 78X XXX XXX',
].join('\n');

/** Determine compliance status from expiry date string */
function getStatus(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(dateStr);
  if (isNaN(expiry)) return 'Invalid Date';
  const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Overdue';
  if (diff <= 14) return 'Renewal Warning';
  return 'Compliant';
}

/** Parse a CSV string into row objects with validation */
function parseCSV(text) {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return { rows: [], errors: ['CSV file is empty or has no data rows.'] };

  const headers = lines[0].split(',').map((h) => h.trim());
  const missingCols = CSV_HEADERS.filter((h) => !headers.includes(h));
  if (missingCols.length) {
    return { rows: [], errors: [`Missing required columns: ${missingCols.join(', ')}`] };
  }

  const rows = [];
  const errors = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    const row = {};
    headers.forEach((h, idx) => { row[h] = values[idx] || ''; });

    const rowErrors = [];
    if (!row['Registration_No']) rowErrors.push('Missing Registration_No');
    if (!row['Vehicle_Make_Model']) rowErrors.push('Missing Vehicle_Make_Model');

    const zDate = new Date(row['ZINARA_Expiry_Date']);
    const iDate = new Date(row['Insurance_Expiry_Date']);
    if (isNaN(zDate)) rowErrors.push('Invalid ZINARA_Expiry_Date (use YYYY-MM-DD)');
    if (isNaN(iDate)) rowErrors.push('Invalid Insurance_Expiry_Date (use YYYY-MM-DD)');

    rows.push({
      reg: row['Registration_No'],
      model: row['Vehicle_Make_Model'],
      zinaraExpiry: row['ZINARA_Expiry_Date'],
      insuranceExpiry: row['Insurance_Expiry_Date'],
      ownerContact: row['Owner_Contact'] || '',
      trackerStatus: 'Active',
      status: rowErrors.length ? 'Error' : getStatus(row['ZINARA_Expiry_Date']),
      errors: rowErrors,
      isValid: rowErrors.length === 0,
    });

    if (rowErrors.length) errors.push(`Row ${i} (${row['Registration_No'] || 'unknown'}): ${rowErrors.join('; ')}`);
  }

  return { rows, errors };
}

export default function FleetBulkUploadModal({ isOpen, onClose, onVehiclesImported }) {
  const [stage, setStage] = useState('upload'); // upload | preview | success
  const [parsedRows, setParsedRows] = useState([]);
  const [parseErrors, setParseErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setStage('upload');
    setParsedRows([]);
    setParseErrors([]);
    setFileName('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([TEMPLATE_CSV], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexalink_fleet_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const processFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const { rows, errors } = parseCSV(e.target.result);
      setParsedRows(rows);
      setParseErrors(errors);
      setStage('preview');
    };
    reader.readAsText(file);
  };

  const handleFileInput = (e) => processFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const handleImport = () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    onVehiclesImported(validRows);
    setStage('success');
  };

  const validCount = parsedRows.filter((r) => r.isValid).length;
  const invalidCount = parsedRows.length - validCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0E2A47] to-[#163b61] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight">Bulk Upload Fleet Vehicles</h3>
              <p className="text-[11px] text-slate-300">Import via CSV — validates & previews before saving</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* ── STAGE 1: Upload ── */}
          {stage === 'upload' && (
            <div className="p-6 space-y-5">
              {/* Template download */}
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3">
                <Table2 className="w-5 h-5 text-[#0284C7] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0E2A47]">Step 1: Download the CSV Template</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Required columns: <code className="bg-white px-1 rounded border border-slate-200 text-[10px]">Registration_No</code>, <code className="bg-white px-1 rounded border border-slate-200 text-[10px]">Vehicle_Make_Model</code>, <code className="bg-white px-1 rounded border border-slate-200 text-[10px]">ZINARA_Expiry_Date</code>, <code className="bg-white px-1 rounded border border-slate-200 text-[10px]">Insurance_Expiry_Date</code>, <code className="bg-white px-1 rounded border border-slate-200 text-[10px]">Owner_Contact</code>
                  </p>
                </div>
                <button
                  onClick={handleDownloadTemplate}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0270b0] text-white text-xs font-extrabold shrink-0 shadow transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> Template CSV
                </button>
              </div>

              {/* Drag & drop zone */}
              <div>
                <p className="text-xs font-bold text-[#0E2A47] mb-2">Step 2: Upload your completed CSV file</p>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#E63946] bg-red-50'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                  }`}
                >
                  <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-[#E63946]' : 'text-slate-400'}`} />
                  <p className="text-sm font-bold text-[#0E2A47]">Drag & drop your CSV here</p>
                  <p className="text-xs text-slate-500 mt-1">or click to browse — .csv files supported</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 2: Preview ── */}
          {stage === 'preview' && (
            <div className="p-6 space-y-4">
              {/* Summary bar */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-slate-700">
                  File: <span className="font-mono text-[#0E2A47]">{fileName}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {validCount} valid
                </span>
                {invalidCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#E63946] text-[11px] font-bold">
                    {invalidCount} with errors
                  </span>
                )}
              </div>

              {/* Validation error list */}
              {parseErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1">
                  <p className="text-[11px] font-extrabold text-[#E63946] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Validation Issues (these rows will be skipped):
                  </p>
                  {parseErrors.map((err, i) => (
                    <p key={i} className="text-[11px] text-red-700 font-mono">{err}</p>
                  ))}
                </div>
              )}

              {/* Preview table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Reg No.</th>
                      <th className="p-3">Model</th>
                      <th className="p-3">ZINARA Expiry</th>
                      <th className="p-3">Insurance Expiry</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Valid?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedRows.map((row, idx) => (
                      <tr key={idx} className={`hover:bg-slate-50 ${!row.isValid ? 'bg-red-50' : ''}`}>
                        <td className="p-3 font-mono font-extrabold text-[#0E2A47]">{row.reg}</td>
                        <td className="p-3">{row.model}</td>
                        <td className="p-3 font-mono">{row.zinaraExpiry}</td>
                        <td className="p-3 font-mono">{row.insuranceExpiry}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' :
                            row.status === 'Renewal Warning' || row.status === 'Overdue' ? 'bg-red-100 text-[#E63946]' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {row.isValid
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            : <AlertTriangle className="w-4 h-4 text-[#E63946]" title={row.errors.join('; ')} />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  ← Upload Different File
                </button>
                <button
                  onClick={handleImport}
                  disabled={validCount === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E63946] hover:bg-[#D92638] text-white font-extrabold text-xs shadow disabled:opacity-40 transition-all"
                >
                  <Car className="w-4 h-4" /> Import {validCount} Vehicle{validCount !== 1 ? 's' : ''} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ── STAGE 3: Success ── */}
          {stage === 'success' && (
            <div className="p-10 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-4 border-emerald-50">
                <CheckCircle2 className="w-11 h-11" />
              </div>
              <h4 className="text-xl font-black text-[#0E2A47]">{validCount} Vehicles Imported!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Your fleet has been updated. ZINARA & Insurance expiry tracking is now active for all imported vehicles.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#0E2A47] text-white font-extrabold text-xs shadow hover:bg-[#163b61] transition-all"
              >
                Back to Fleet Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
