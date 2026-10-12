import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { buildWhatsAppLink, buildPhoneLink } from '../utils/whatsapp';
import {
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
  Package,
  Gift,
  ChevronDown,
  Building2,
  CalendarCheck,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, settings, faqs, navigateTo } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Featured and available products
  const featuredProducts = products.filter((p) => p.isAvailable && p.isFeatured).slice(0, 6);

  const whatsappGeneralHref = buildWhatsAppLink(settings.whatsapp, { type: 'general' });
  const phoneHref = buildPhoneLink(settings.phone);

  const scrollToVerticals = () => {
    const el = document.getElementById('explore-verticals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* ========================================================
          SECTION 1 — HERO BANNER
      ======================================================== */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white pt-10 pb-16 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-xs shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{settings.brandLine} Kitchen · Namkeen · Mithai</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15] drop-shadow-md">
            {settings.heroHeadline}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
            {settings.heroSubheadline}
          </p>

          {/* Hero Action Buttons - Prominently Displayed */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <button
              onClick={scrollToVerticals}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#c68a26] hover:bg-[#d8972e] text-[#2a0e13] font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Explore Our Offerings</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappGeneralHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>

            <a
              href={phoneHref}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center space-x-2 backdrop-blur-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call to Order</span>
            </a>
          </div>

          {/* Panoramic Visual Banner Card */}
          <div className="pt-6 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-black/40 group">
              <img
                src="/src/assets/images/bika_hero_banner_1791745434314.jpg"
                alt="Bika Bite Royal Feast Spread"
                className="w-full aspect-21/9 sm:aspect-16/7 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4 sm:p-6 text-left">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-[#c68a26] text-[#2a0e13] font-bold text-[10px] uppercase tracking-wider mb-1">
                    Grand Bikaner Tradition
                  </span>
                  <p className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
                    Authentic recipes preserved across generations of desert craftsmanship
                  </p>
                  <p className="text-xs text-amber-200 mt-0.5 hidden sm:block">
                    Explore Kitchen meals, packaged namkeen & festive gift hampers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — EXPLORE BIKA BITE (THREE VERTICALS)
      ======================================================== */}
      <section id="explore-verticals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#781523]">
            Unified Culinary Legacy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a0e13]">
            Three Experiences. One Bika Bite.
          </h2>
          <div className="w-16 h-1 bg-[#c68a26] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Bika Bite Kitchen */}
          <div className="bg-white rounded-2xl border border-[#e8dfd1] p-8 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-amber-50 text-[#781523] border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2a0e13]">
                Bika Bite Kitchen
              </h3>
              <p className="text-sm text-[#63554e] leading-relaxed">
                Discover our food menu and connect with us for individual orders, family meals and group orders.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => navigateTo('kitchen')}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#fdf8f0] hover:bg-[#781523] text-[#781523] hover:text-white border border-[#e5d5be] hover:border-[#781523] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-colors"
              >
                <span>Explore Kitchen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Bika Bite Namkeen */}
          <div className="bg-white rounded-2xl border border-[#e8dfd1] p-8 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2a0e13]">
                Bika Bite Namkeen
              </h3>
              <p className="text-sm text-[#63554e] leading-relaxed">
                Explore our packaged namkeen and snack range. Contact us for product availability, pack sizes and retail or wholesale enquiries.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => navigateTo('namkeen')}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#fdf8f0] hover:bg-[#781523] text-[#781523] hover:text-white border border-[#e5d5be] hover:border-[#781523] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-colors"
              >
                <span>Explore Namkeen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Bika Bite Mithai */}
          <div className="bg-white rounded-2xl border border-[#e8dfd1] p-8 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2a0e13]">
                Bika Bite Mithai
              </h3>
              <p className="text-sm text-[#63554e] leading-relaxed">
                Discover our sweets and gifting options for celebrations, festivals, special occasions and bulk requirements.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => navigateTo('mithai')}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#fdf8f0] hover:bg-[#781523] text-[#781523] hover:text-white border border-[#e5d5be] hover:border-[#781523] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-colors"
              >
                <span>Explore Mithai</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — FEATURED PRODUCTS
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#781523]">
              Curated Favourites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a0e13]">
              Discover Our Favourites
            </h2>
            <p className="text-sm text-[#63554e] leading-relaxed">
              Explore selected products from the Bika Bite range. Find product details, available sizes and ordering information before contacting us directly.
            </p>
          </div>

          <button
            onClick={() => navigateTo('all-products')}
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#781523] hover:text-[#5c131d] transition-colors self-start md:self-auto"
          >
            <span>View All Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 4 — OUR STORY
      ======================================================== */}
      <section className="bg-[#f5eee3] border-y border-[#e2d5c4] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#e8dbcc] text-[#781523] text-xs font-bold uppercase tracking-wider">
            Heritage & Mission
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a0e13]">
            A Food Brand with Bikaner at Its Heart
          </h2>
          <div className="w-16 h-1 bg-[#c68a26] mx-auto rounded-full"></div>
          <p className="text-base text-[#4a3d36] leading-relaxed max-w-2xl mx-auto">
            Bika Bite brings Kitchen, Namkeen and Mithai together in one food brand. Our aim is to make it easy for customers to explore our offerings, discover products for everyday moments and special occasions, and connect with us for direct orders.
          </p>
          <p className="text-base text-[#4a3d36] leading-relaxed max-w-2xl mx-auto">
            From food orders to packaged snacks, sweets and gifting enquiries, Bika Bite offers a single place to discover our range and reach our team.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('about-us')}
              className="inline-flex items-center space-x-2 bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-colors shadow-xs"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 — BIKA BITE NAMKEEN HIGHLIGHT
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50 to-[#fdf9f2] rounded-3xl border border-[#ebdcc8] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-200/50 px-3 py-1 rounded-full">
              <Package className="w-3.5 h-3.5" />
              <span>Packaged Savouries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a0e13]">
              Find Your Kind of Crunch
            </h2>
            <p className="text-sm sm:text-base text-[#63554e] leading-relaxed">
              Explore our namkeen and snack collection. Whether you are looking for everyday snacks, products for your store or options for bulk supply, browse the range and contact us for current availability and pricing.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigateTo('namkeen')}
                className="bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
              >
                Explore Namkeen
              </button>
              <button
                onClick={() => navigateTo('partner-with-us')}
                className="bg-white hover:bg-amber-100 text-[#781523] border border-[#d8c3ad] font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
              >
                Enquire for Wholesale
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/src/assets/images/bikaneri_bhujia_snack_1791745388994.jpg"
              alt="Bika Bite Namkeen Collection"
              className="rounded-2xl shadow-lg w-full aspect-4/3 object-cover border border-[#ebdcc8]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6 — BIKA BITE MITHAI HIGHLIGHT
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-rose-50 to-[#fdf9f4] rounded-3xl border border-[#ebd8d8] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src="/src/assets/images/kaju_katli_mithai_1791745401301.jpg"
              alt="Bika Bite Mithai and Festive Hampers"
              className="rounded-2xl shadow-lg w-full aspect-4/3 object-cover border border-[#ebd8d8]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-rose-900 bg-rose-200/50 px-3 py-1 rounded-full">
              <Gift className="w-3.5 h-3.5" />
              <span>Festive Sweets & Gifting</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a0e13]">
              Make Every Occasion Sweeter
            </h2>
            <p className="text-sm sm:text-base text-[#63554e] leading-relaxed">
              Discover mithai for celebrations, family gatherings, festivals and gifting. For customised requirements, larger quantities and corporate gifting, contact our team to discuss available options.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigateTo('mithai')}
                className="bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
              >
                Explore Mithai
              </button>
              <button
                onClick={() => navigateTo('bulk-orders')}
                className="bg-white hover:bg-rose-100 text-[#781523] border border-[#d8c3ad] font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
              >
                Enquire for Gifting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7 — BIKA BITE KITCHEN HIGHLIGHT
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50 to-[#fffdf9] rounded-3xl border border-[#ede3d4] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-200/50 px-3 py-1 rounded-full">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Fresh Kitchen & Meals</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a0e13]">
              Something Good Is Cooking
            </h2>
            <p className="text-sm sm:text-base text-[#63554e] leading-relaxed">
              Explore the Bika Bite Kitchen menu and contact us to place an order. Menu availability, service locations, delivery options and order timings will be confirmed by our team.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigateTo('kitchen')}
                className="bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
              >
                View Kitchen Menu
              </button>
              <a
                href={phoneHref}
                className="inline-flex items-center space-x-2 bg-white hover:bg-amber-100 text-[#781523] border border-[#d8c3ad] font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call to Order</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="/src/assets/images/dal_baati_thali_1791745423556.jpg"
              alt="Bika Bite Kitchen Rajasthani Thali"
              className="rounded-2xl shadow-lg w-full aspect-4/3 object-cover border border-[#ede3d4]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8 & 9 — BUSINESS ENQUIRIES + BULK ORDERS
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 8: Business Enquiries */}
        <div className="bg-white rounded-2xl border border-[#e8dfd1] p-8 sm:p-10 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#781523] border border-amber-200 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2a0e13]">
              Let’s Grow Together
            </h3>
            <p className="text-sm text-[#63554e] leading-relaxed">
              Are you a retailer, wholesaler, distributor or business looking for food products and supply opportunities? Connect with Bika Bite to discuss our product range, commercial requirements and potential partnership opportunities.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => navigateTo('partner-with-us')}
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg transition-colors"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 9: Bulk Orders and Gifting */}
        <div className="bg-white rounded-2xl border border-[#e8dfd1] p-8 sm:p-10 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#781523] border border-rose-200 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2a0e13]">
              Bigger Celebrations. Better Planning.
            </h3>
            <p className="text-sm text-[#63554e] leading-relaxed">
              Planning a celebration, corporate event, festive gift or bulk food order? Tell us what you need, the quantity and your preferred delivery date. Our team will contact you to discuss availability and suitable options.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => navigateTo('bulk-orders')}
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#c68a26] hover:bg-[#d8972e] text-[#2a0e13] font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg transition-colors"
            >
              <span>Enquire for Bulk Orders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 10 — FREQUENTLY ASKED QUESTIONS (PREVIEW)
      ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#781523]">
            Common Queries
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#c68a26] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-3">
          {faqs.slice(0, 6).map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[#e8dfd1] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between font-serif font-bold text-base text-[#2a0e13] hover:text-[#781523] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8a7258] transition-transform duration-200 shrink-0 ml-3 ${
                      isOpen ? 'rotate-180 text-[#781523]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#55463e] leading-relaxed border-t border-[#f4ede3] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigateTo('faqs')}
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#781523] hover:text-[#5c131d] underline transition-colors"
          >
            <span>View All Questions on our FAQ Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================
          SECTION 11 — FINAL CALL TO ACTION
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#781523] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-lg space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-amber-100">
              Your Next Bika Bite Starts Here.
            </h2>
            <p className="text-[#f5dbce] text-base sm:text-lg leading-relaxed">
              Explore our offerings, discover your favourites and contact us directly for orders, gifting and business enquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-lg mx-auto">
            <button
              onClick={() => navigateTo('all-products')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#2a0e13] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Explore Products
            </button>
            <a
              href={whatsappGeneralHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={phoneHref}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
