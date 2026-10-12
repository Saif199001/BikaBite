import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { buildPhoneLink, buildWhatsAppLink } from '../utils/whatsapp';
import { Phone, MessageCircle, CalendarClock, Utensils, Info } from 'lucide-react';

export const KitchenPage: React.FC = () => {
  const { products, settings, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const kitchenProducts = products.filter((p) => p.vertical === 'kitchen');

  // Dynamically obtain available categories
  const categories = ['all', ...Array.from(new Set(kitchenProducts.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'all'
      ? kitchenProducts
      : kitchenProducts.filter((p) => p.category === selectedCategory);

  const phoneHref = buildPhoneLink(settings.phone);
  const whatsappHref = buildWhatsAppLink(settings.whatsapp, {
    type: 'kitchen',
    itemName: 'Kitchen Menu Inquiry',
    location: 'Bikaner',
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner - Rich Attractive Hero */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
              <Utensils className="w-3.5 h-3.5" />
              <span>Bika Bite Kitchen • Freshly Prepared Daily</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
              Good Food, Just a Message Away.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore the Bika Bite Kitchen menu and contact us directly to place your order. Our team will confirm menu availability, pricing, order timing and delivery or collection options.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-amber-200/90">
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                📍 {settings.kitchenServiceArea}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                ⏱️ Fresh Hot Preparation
              </span>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href={phoneHref}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call to Order</span>
              </a>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-black/40 group">
              <img
                src="/src/assets/images/dal_baati_thali_1791745423556.jpg"
                alt="Bika Bite Royal Kitchen Rajasthani Thali"
                className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 sm:p-5">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-[#c68a26] text-[#2a0e13] font-bold text-[10px] uppercase tracking-wider mb-1">
                    Kitchen Signature
                  </span>
                  <p className="font-serif font-bold text-white text-base sm:text-lg">
                    Bikaner Special Dal Baati Churma Thali
                  </p>
                  <p className="text-xs text-amber-200">
                    Served with Panchmel dal, ghee churma & lahsun chutney
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Instructions Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fbf4ea] border border-[#ebd8c1] rounded-2xl p-6 sm:p-8">
          <h3 className="font-serif font-bold text-lg text-[#2a0e13] mb-4 flex items-center space-x-2">
            <Info className="w-5 h-5 text-[#c68a26]" />
            <span>How Kitchen Ordering Works</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#55463e]">
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-[#781523] text-white flex items-center justify-center font-bold shrink-0">
                1
              </span>
              <p>Browse our kitchen menu and select your preferred meals, combos, or snacks.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-[#781523] text-white flex items-center justify-center font-bold shrink-0">
                2
              </span>
              <p>Click "Order on WhatsApp" or "Call to Order" on any item.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-[#781523] text-white flex items-center justify-center font-bold shrink-0">
                3
              </span>
              <p>WhatsApp opens prefilled with the item name, or your phone dialler initiates the call.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-[#781523] text-white flex items-center justify-center font-bold shrink-0">
                4
              </span>
              <p>Our kitchen team confirms order availability, exact preparation timing, and delivery or pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories Filter & Items Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills */}
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
              {cat === 'all' ? 'All Kitchen Menu' : cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#e8dfd1]">
            <p className="text-sm text-[#8a7258]">No items found under this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Hungry Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fff9f2] border-2 border-dashed border-[#d8c3ad] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-[#2a0e13]">
              Hungry? Contact Bika Bite Kitchen to place your order.
            </h3>
            <p className="text-sm text-[#63554e]">
              Service area: {settings.kitchenServiceArea}
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Kitchen</span>
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center space-x-2 bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Kitchen</span>
            </a>
          </div>
        </div>
      </section>

      {/* Group and Event Orders */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#e8dfd1] p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-[#781523] mx-auto flex items-center justify-center">
            <CalendarClock className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
              Planning a Group Order?
            </h2>
            <p className="text-sm sm:text-base text-[#63554e] max-w-2xl mx-auto leading-relaxed">
              Contact us for group meals, gatherings and event requirements. Share the date, location, approximate quantity and type of order so our team can check feasibility.
            </p>
          </div>
          <button
            onClick={() => navigateTo('bulk-orders')}
            className="inline-flex items-center space-x-2 bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-lg transition-colors"
          >
            <span>Enquire for Group Orders</span>
          </button>
        </div>
      </section>
    </div>
  );
};
