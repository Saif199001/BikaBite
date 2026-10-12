import React from 'react';
import { useApp } from '../context/AppContext';
import { UtensilsCrossed, Package, Gift, Sparkles } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-6 text-center relative z-10">
          {/* Royal Logo Emblem in Hero */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl overflow-hidden border-2 border-amber-300/50 shadow-xl bg-black/30">
            <img
              src="/src/assets/images/brand_logo_emblem_1791745376397.jpg"
              alt="Bika Bite Royal Emblem"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Heritage & Culinary Philosophy</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            Born in Bikaner. Built Around Food.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            A food brand uniting three authentic culinary experiences — Kitchen, Namkeen and Mithai — under one trusted Rajasthan name.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 sm:p-14 shadow-sm space-y-8">
          <div className="space-y-6 text-[#443831] leading-relaxed text-base sm:text-lg">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2a0e13] leading-snug">
              Bika Bite is a food brand bringing together three distinct offerings: Kitchen, Namkeen and Mithai.
            </p>

            <p>
              Each vertical serves a different customer need. <strong>Bika Bite Kitchen</strong> focuses on food orders and menu discovery. <strong>Bika Bite Namkeen</strong> presents our packaged snacks and supports enquiries from individual buyers and trade customers. <strong>Bika Bite Mithai</strong> brings sweets and gifting options together for celebrations, festivals and special occasions.
            </p>

            <p>
              Our website makes it easier for customers and business buyers to explore our offerings and connect directly with our team.
            </p>

            <p>
              We believe a good food brand should be easy to discover, simple to contact and clear about what it offers. That is the experience we want Bika Bite to deliver.
            </p>
          </div>

          {/* Our Purpose Box */}
          <div className="bg-[#fbf4ea] border-l-4 border-[#c68a26] p-6 sm:p-8 rounded-r-2xl space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2a0e13]">
              Our Purpose
            </h3>
            <p className="text-sm sm:text-base text-[#55463e] leading-relaxed">
              To bring our food offerings together under one recognisable brand and make ordering and business enquiries straightforward.
            </p>
          </div>

          {/* Three Verticals Breakdown */}
          <div className="space-y-4 pt-4">
            <h3 className="font-serif text-xl font-bold text-[#2a0e13]">
              Our Three Verticals
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#fdfaf5] border border-[#ebd8c1] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-[#781523] flex items-center justify-center mb-3">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#2a0e13]">
                  Bika Bite Kitchen
                </h4>
                <p className="text-xs text-[#63554e] leading-relaxed">
                  Food and menu orders, daily fresh meals, snacks and family gatherings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#fdfaf5] border border-[#ebd8c1] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-900 flex items-center justify-center mb-3">
                  <Package className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#2a0e13]">
                  Bika Bite Namkeen
                </h4>
                <p className="text-xs text-[#63554e] leading-relaxed">
                  Packaged snacks, Bikaneri Bhujia, and trade and wholesale enquiries.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#fdfaf5] border border-[#ebd8c1] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-900 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#2a0e13]">
                  Bika Bite Mithai
                </h4>
                <p className="text-xs text-[#63554e] leading-relaxed">
                  Sweets, celebrations, festive keepsakes and corporate gifting.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Line per brief */}
          <div className="pt-8 text-center border-t border-[#f0e9df]">
            <p className="font-serif text-2xl font-bold text-[#781523]">
              Bika Bite. Born in Bikaner.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Offerings CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <button
          onClick={() => navigateTo('all-products')}
          className="bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl shadow-md transition-colors"
        >
          Explore Complete Product Range
        </button>
      </section>
    </div>
  );
};
