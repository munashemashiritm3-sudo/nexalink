import React, { useState } from 'react';
import { INSIGHTS_ARTICLES } from '../data/mockData';
import { Search, User, ArrowRight } from 'lucide-react';

export default function Insights({ onOpenQuote }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'Connectivity', 'Vehicle Tech', 'Vehicle Admin'];

  const filteredArticles = INSIGHTS_ARTICLES.filter(a => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="bg-hero-glow py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">Knowledge Hub</span>
          <h1 className="text-4xl font-black text-[#0E2A47]">
            Insights & Thought Leadership
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Practical guides on satellite internet, vehicle licensing, and technology operations in Zimbabwe.
          </p>

          {/* Search & Category filter */}
          <div className="max-w-2xl mx-auto pt-4 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search articles (e.g. Starlink, ZINARA, Tracker)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-800 focus:border-[#E63946] focus:outline-none shadow-xs"
              />
            </div>
            <div className="flex gap-1.5 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold ${
                    selectedCategory === cat
                      ? 'bg-[#E63946] text-white shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal / Detail View */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 font-bold"
            >
              ✕ Close
            </button>
            <span className="text-xs font-extrabold text-[#0284C7] uppercase">{selectedArticle.category}</span>
            <h2 className="text-2xl font-black text-[#0E2A47]">{selectedArticle.title}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-2 font-medium">
              <span>By {selectedArticle.author}</span>
              <span>• {selectedArticle.date}</span>
              <span>• {selectedArticle.readTime}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {selectedArticle.summary}
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed font-normal">
              <p>
                In Zimbabwe, modern technology adoption is accelerating. Business owners who integrate high-speed satellite internet like <strong>Starlink Infinity Connect</strong> alongside real-time GPS tracking achieve 40% higher operational efficiency.
              </p>
              <p>
                To learn how Nexalink Solutions Pvt Ltd can implement these solutions for your enterprise, speak directly with Managing Director Moses Tadiwa Chikwature or Marketing Director Ashley Maria Machiridza.
              </p>
            </div>
            <button
              onClick={() => { setSelectedArticle(null); onOpenQuote(); }}
              className="w-full py-3 bg-[#E63946] text-white font-extrabold text-xs rounded-xl shadow"
            >
              Request Quote Related to This Topic
            </button>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div key={art.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284C7] font-bold border border-sky-200">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0E2A47] group-hover:text-[#E63946] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <User className="w-3.5 h-3.5 text-[#E63946]" />
                  <span>{art.author}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-bold text-[#0E2A47] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read Full Article <ArrowRight className="w-3.5 h-3.5 text-[#E63946]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
