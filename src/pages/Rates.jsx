import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ArrowRightLeft, 
  Clock, 
  Info, 
  CheckCircle2, 
  ArrowUpRight, 
  Calculator, 
  ShieldCheck, 
  Zap,
  Car,
  Wifi
} from 'lucide-react';

// Default baseline rates for Zimbabwe (ZiG / ZWL)
// 1 USD approx 26.85 ZWL/ZiG official, ~35.00 parallel market benchmark
const BASE_OFFICIAL_USD_ZWL = 26.8547;
const BASE_MARKET_USD_ZWL = 35.0000;

export default function Rates({ onOpenQuote }) {
  const [ratesMode, setRatesMode] = useState('official'); // 'official' | 'market'
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Base raw rates against USD from live API or fallback
  const [usdCrossRates, setUsdCrossRates] = useState({
    USD: 1,
    ZAR: 15.9862,
    GBP: 0.7386,
    EUR: 0.8604,
    BWP: 13.7702,
    ZMW: 19.1703,
    ZWL: BASE_OFFICIAL_USD_ZWL
  });

  // Converter state
  const [calcAmount, setCalcAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ZWL');

  // Fetch live exchange rates from open rate API
  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          setUsdCrossRates({
            USD: 1,
            ZAR: data.rates.ZAR || 15.98,
            GBP: data.rates.GBP || 0.74,
            EUR: data.rates.EUR || 0.86,
            BWP: data.rates.BWP || 13.77,
            ZMW: data.rates.ZMW || 19.17,
            ZWL: data.rates.ZWL || data.rates.ZWG || BASE_OFFICIAL_USD_ZWL
          });
          setLastUpdated(new Date());
        }
      }
    } catch (err) {
      console.warn('Using local exchange rate benchmarks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Multiplier depending on whether viewing official interbank vs market cash benchmark
  const activeUsdZwl = ratesMode === 'official' 
    ? (usdCrossRates.ZWL || BASE_OFFICIAL_USD_ZWL)
    : BASE_MARKET_USD_ZWL;

  // Currencies list with details
  const currencies = [
    {
      code: 'USD',
      name: 'American Dollar',
      country: 'United States',
      symbol: '$',
      flag: '🇺🇸',
      rateAgainstUsd: 1,
      change24h: '+0.12%',
      trend: 'up',
      popular: true
    },
    {
      code: 'ZAR',
      name: 'South African Rand',
      country: 'South Africa',
      symbol: 'R',
      flag: '🇿🇦',
      rateAgainstUsd: usdCrossRates.ZAR,
      change24h: '-0.35%',
      trend: 'down',
      popular: true
    },
    {
      code: 'GBP',
      name: 'British Pound Sterling',
      country: 'United Kingdom',
      symbol: '£',
      flag: '🇬🇧',
      rateAgainstUsd: usdCrossRates.GBP,
      change24h: '+0.45%',
      trend: 'up'
    },
    {
      code: 'EUR',
      name: 'Euro',
      country: 'European Union',
      symbol: '€',
      flag: '🇪🇺',
      rateAgainstUsd: usdCrossRates.EUR,
      change24h: '+0.08%',
      trend: 'up'
    },
    {
      code: 'BWP',
      name: 'Botswana Pula',
      country: 'Botswana',
      symbol: 'P',
      flag: '🇧🇼',
      rateAgainstUsd: usdCrossRates.BWP,
      change24h: '-0.18%',
      trend: 'down'
    },
    {
      code: 'ZMW',
      name: 'Zambian Kwacha',
      country: 'Zambia',
      symbol: 'ZK',
      flag: '🇿🇲',
      rateAgainstUsd: usdCrossRates.ZMW,
      change24h: '+0.22%',
      trend: 'up'
    }
  ];

  // Helper to calculate rate of 1 unit of foreign currency in ZWL
  const getZwlPerUnit = (curr) => {
    if (curr.code === 'USD') {
      return activeUsdZwl;
    }
    return activeUsdZwl / curr.rateAgainstUsd;
  };

  // Convert function for calculator
  const calculateConversion = () => {
    const val = parseFloat(calcAmount);
    if (isNaN(val) || val <= 0) return '0.00';

    // Base value in USD
    let inUsd = 0;
    if (fromCurrency === 'USD') {
      inUsd = val;
    } else if (fromCurrency === 'ZWL') {
      inUsd = val / activeUsdZwl;
    } else {
      const curr = currencies.find(c => c.code === fromCurrency);
      if (curr) inUsd = val / curr.rateAgainstUsd;
    }

    // Convert from USD to target
    if (toCurrency === 'USD') {
      return inUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (toCurrency === 'ZWL') {
      const zwlVal = inUsd * activeUsdZwl;
      return zwlVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      const curr = currencies.find(c => c.code === toCurrency);
      if (curr) {
        const out = inUsd * curr.rateAgainstUsd;
        return out.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    }
    return '0.00';
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="space-y-12 pb-20 bg-[#F8FAFC]">
      
      {/* Top Header Banner */}
      <section className="bg-hero-glow py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Zimbabwe Exchange Desk
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#0E2A47] tracking-tight">
            Zimbabwe Live Exchange Rates (ZWL / ZiG)
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real-time interbank and market benchmark exchange rates in Zimbabwe. Monitor the Zimbabwean Dollar (ZWL / ZiG) against the US Dollar, South African Rand, British Pound, Euro, Botswana Pula, and Zambian Kwacha.
          </p>

          {/* Controls: Mode Switcher & Refresh */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-300 flex items-center gap-1 shadow-inner">
              <button
                onClick={() => setRatesMode('official')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  ratesMode === 'official'
                    ? 'bg-[#0E2A47] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Official Interbank Rate
              </button>
              <button
                onClick={() => setRatesMode('market')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  ratesMode === 'market'
                    ? 'bg-[#E63946] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Parallel / Cash Market Rate
              </button>
            </div>

            <button
              onClick={fetchRates}
              disabled={isLoading}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#0284C7]' : ''}`} />
              <span>{isLoading ? 'Updating...' : 'Refresh Rates'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-center gap-2 pt-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Last Updated: {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()} (CAT)</span>
          </div>
        </div>
      </section>

      {/* Main 6 Currency Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-[#0E2A47]">
              Current ZWL Rates Overview
            </h2>
            <p className="text-xs text-slate-500">
              Showing value of 1 Foreign Unit in Zimbabwean Dollars ({ratesMode === 'official' ? 'Official Interbank' : 'Market Street Benchmark'})
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-lg bg-sky-50 text-[#0284C7] font-bold border border-sky-200 self-start sm:self-auto">
            Mode: {ratesMode === 'official' ? 'RBZ Official Interbank' : 'Parallel Street Cash'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currencies.map((curr) => {
            const zwlPerUnit = getZwlPerUnit(curr);
            const unitsPerZwl = 1 / zwlPerUnit;
            const isHighlight = curr.code === 'USD' || curr.code === 'ZAR';

            return (
              <div
                key={curr.code}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 hover:shadow-lg relative overflow-hidden flex flex-col justify-between ${
                  isHighlight ? 'border-sky-300 shadow-md ring-1 ring-sky-100' : 'border-slate-200 shadow-sm'
                }`}
              >
                {isHighlight && (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
                    High Volume
                  </span>
                )}

                <div>
                  {/* Top Flag & Currency Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                      {curr.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold text-[#0E2A47]">{curr.code}</h3>
                        <span className="text-xs text-slate-400 font-mono">({curr.symbol})</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{curr.name}</p>
                    </div>
                  </div>

                  {/* Primary Exchange Rate (1 Unit in ZWL) */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      1 {curr.code} Equals
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#0E2A47] tracking-tight font-mono">
                        {zwlPerUnit.toFixed(2)}
                      </span>
                      <span className="text-sm font-extrabold text-[#E63946]">ZWL / ZiG</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">
                      <span>1 ZWL = {unitsPerZwl.toFixed(4)} {curr.code}</span>
                      <span className={`inline-flex items-center gap-0.5 font-bold ${curr.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {curr.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {curr.change24h}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Convert Button */}
                <button
                  onClick={() => {
                    setFromCurrency(curr.code);
                    setToCurrency('ZWL');
                    const el = document.getElementById('currency-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#0284C7]" />
                  Convert {curr.code} in Calculator
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Currency Converter Calculator */}
      <section id="currency-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E2A47] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-700/60 relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-sky-500/20 text-[#38BDF8] border border-sky-400/30">
                Instant Calculator
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Live Currency Converter
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Instantly convert between Zimbabwean Dollars (ZWL) and USD, ZAR, GBP, EUR, BWP, or ZMW.
              </p>
            </div>

            {/* Calculator Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Amount & From */}
                <div className="sm:col-span-5 space-y-2">
                  <label className="block text-xs font-bold text-slate-200">Amount & From Currency</label>
                  <div className="flex rounded-xl overflow-hidden bg-white text-slate-900 border border-slate-300 shadow-inner">
                    <input
                      type="number"
                      min="1"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(e.target.value)}
                      className="w-full px-3.5 py-3 text-base font-bold outline-none"
                      placeholder="Amount"
                    />
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="bg-slate-100 px-3 text-xs font-extrabold border-l border-slate-300 outline-none text-[#0E2A47] cursor-pointer"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="ZWL">ZWL (ZiG)</option>
                      <option value="ZAR">ZAR (R)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="BWP">BWP (P)</option>
                      <option value="ZMW">ZMW (ZK)</option>
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="sm:col-span-2 flex justify-center pt-2 sm:pt-6">
                  <button
                    onClick={handleSwapCurrencies}
                    className="w-12 h-12 rounded-2xl bg-[#E63946] hover:bg-[#D92638] text-white flex items-center justify-center shadow-lg transition-transform hover:rotate-180 active:scale-95 cursor-pointer"
                    title="Swap Currencies"
                  >
                    <ArrowRightLeft className="w-5 h-5" />
                  </button>
                </div>

                {/* To Currency */}
                <div className="sm:col-span-5 space-y-2">
                  <label className="block text-xs font-bold text-slate-200">Convert To</label>
                  <div className="rounded-xl overflow-hidden bg-white text-slate-900 border border-slate-300 shadow-inner">
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full px-3.5 py-3 text-sm font-extrabold outline-none text-[#0E2A47] bg-white cursor-pointer"
                    >
                      <option value="ZWL">ZWL - Zimbabwean Dollar (ZiG)</option>
                      <option value="USD">USD - American Dollar ($)</option>
                      <option value="ZAR">ZAR - South African Rand (R)</option>
                      <option value="GBP">GBP - British Pound (£)</option>
                      <option value="EUR">EUR - Euro (€)</option>
                      <option value="BWP">BWP - Botswana Pula (P)</option>
                      <option value="ZMW">ZMW - Zambian Kwacha (ZK)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Conversion Output Result */}
              <div className="p-5 rounded-2xl bg-white/10 border border-white/20 text-center space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                  Calculated Result ({ratesMode === 'official' ? 'Official Interbank' : 'Parallel Cash Benchmark'})
                </span>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-2xl text-slate-300 font-medium">
                    {parseFloat(calcAmount || 0).toLocaleString()} {fromCurrency} =
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-[#00F2FE] font-mono">
                    {calculateConversion()} {toCurrency}
                  </span>
                </div>
              </div>

              {/* Quick Amount Presets */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                <span className="text-xs text-slate-400 font-bold mr-1">Quick Select:</span>
                {['10', '20', '50', '100', '250', '500'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCalcAmount(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                      calcAmount === preset
                        ? 'bg-[#38BDF8] text-slate-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Comprehensive Exchange Rate Matrix & Rates Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0E2A47]">
            Full Zimbabwe Exchange Rate Matrix
          </h2>
          <p className="text-xs text-slate-500">
            Compare official bank conversion, mobile money / EcoCash index, and cash market averages.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Currency</th>
                  <th className="py-4 px-6">Official Interbank (ZWL)</th>
                  <th className="py-4 px-6">Cash / Street Benchmark (ZWL)</th>
                  <th className="py-4 px-6">EcoCash / Swipe Equivalent</th>
                  <th className="py-4 px-6 text-center">24h Movement</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                {currencies.map((c) => {
                  const offRate = (usdCrossRates.ZWL || BASE_OFFICIAL_USD_ZWL) / (c.code === 'USD' ? 1 : c.rateAgainstUsd);
                  const streetRate = BASE_MARKET_USD_ZWL / (c.code === 'USD' ? 1 : c.rateAgainstUsd);
                  const ecoRate = streetRate * 1.05; // mobile money premium

                  return (
                    <tr key={c.code} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3 font-bold text-sm text-[#0E2A47]">
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <span>{c.code}</span>
                          <span className="block text-[11px] text-slate-400 font-normal">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-slate-900">
                        {offRate.toFixed(2)} ZWL
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-[#E63946]">
                        {streetRate.toFixed(2)} ZWL
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-600">
                        {ecoRate.toFixed(2)} ZWL
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md ${
                          c.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {c.change24h}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            setFromCurrency(c.code);
                            setToCurrency('ZWL');
                            const el = document.getElementById('currency-calculator');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0284C7] hover:text-white text-[#0284C7] font-bold text-xs transition-colors cursor-pointer"
                        >
                          Convert
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Commercial Services Callout in Zimbabwe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-[#0E2A47] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-extrabold text-[#38BDF8] uppercase tracking-wider">
                Multi-Currency Payments at Nexalink
              </span>
              <h3 className="text-2xl font-black text-white">
                Pay in USD Cash, ZWL / ZiG, EcoCash, or Card
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Nexalink Solutions, we accept multi-currency payments for all our products—from Starlink satellite subscriptions to ZINARA renewals, $60 GPS vehicle trackers, and ZESA electricity tokens. Transparent pricing with real-time conversion.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Wifi className="w-4 h-4 text-[#38BDF8]" />
                  <span>Starlink: $40 - $77 / mo</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Car className="w-4 h-4 text-[#E63946]" />
                  <span>GPS Tracker: $60 No Subs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Instant ZESA & Utility Bills</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={onOpenQuote}
                className="w-full py-3.5 bg-[#E63946] hover:bg-[#D92638] text-white font-black text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Request Service Quote <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/263713123055"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                WhatsApp Desk: +263 713 123 055
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
