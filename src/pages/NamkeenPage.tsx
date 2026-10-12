import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Package, Building2, CheckCircle2 } from 'lucide-react';

export const NamkeenPage: React.FC = () => {
  const { products, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const namkeenProducts = products.filter((p) => p.vertical === 'namkeen');
  const categories = ['all', ...Array.from(new Set(namkeenProducts.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'all'
      ? namkeenProducts
      : namkeenProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
              <Package className="w-3.5 h-3.5" />
              <span>Packaged Savouries & Namkeen Range</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
              Discover the Bika Bite Namkeen Range.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore our packaged namkeen and snack offerings. Product information, pack sizes, prices and availability are displayed wherever confirmed. Customers and trade buyers can contact us directly for orders and supply enquiries.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-amber-200/90">
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                ✓ Authentic Dew Bean (Moth Dal)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                ✓ Sealed Airtight Packs
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                ✓ 6-Month Verified Shelf Life
              </span>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('namkeen-catalogue');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#c68a26] hover:bg-[#d8972e] text-[#2a0e13] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>Browse Namkeen Catalogue</span>
              </button>

              <button
                onClick={() => navigateTo('partner-with-us')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all"
              >
                <span>Wholesale & Trade Enquiries</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-black/40 group">
              <img
                src="/src/assets/images/bikaneri_bhujia_snack_1791745388994.jpg"
                alt="Bika Bite Authentic Bikaneri Bhujia"
                className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 sm:p-5">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-[#c68a26] text-[#2a0e13] font-bold text-[10px] uppercase tracking-wider mb-1">
                    Bikaner Heritage
                  </span>
                  <p className="font-serif font-bold text-white text-base sm:text-lg">
                    Authentic Bikaneri Bhujia
                  </p>
                  <p className="text-xs text-amber-200">
                    Handcrafted with moth dal flour, besan & freshly crushed peppercorns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills & Product Catalogue */}
      <section id="namkeen-catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#e8dfd1] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#781523] text-white shadow-xs'
                  : 'bg-white text-[#55463e] hover:bg-[#f6f1e7] border border-[#e8dfd1]'
              }`}
            >
              {cat === 'all' ? 'All Namkeen Products' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Retail & Wholesale Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              <span>Trade & B2B Distribution</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
              Looking for Namkeen for Your Business?
            </h2>
            <p className="text-sm sm:text-base text-[#63554e] leading-relaxed">
              Bika Bite welcomes enquiries from retailers, shop owners, wholesalers and distributors interested in our namkeen range. Share your business details and product requirements so our team can discuss availability, commercial terms and potential supply arrangements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#55463e]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom pack sizes & bulk corrugated packaging</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strict batch-level quality & shelf-life testing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <button
              onClick={() => navigateTo('partner-with-us')}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl shadow-md transition-colors"
            >
              Submit a Business Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
