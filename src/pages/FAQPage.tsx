import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronDown, Search, ArrowRight } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { faqs, navigateTo } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Assistance & Clarifications</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Find quick answers about our three verticals, ordering via WhatsApp, payments, delivery, and trade opportunities.
          </p>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#8a7258] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. online payment, bulk, delivery)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d8c3ad] bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523] shadow-2xs"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#e8dfd1]">
              <p className="text-sm text-[#8a7258]">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
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
                    <div className="px-5 pb-6 text-sm text-[#55463e] leading-relaxed border-t border-[#f4ede3] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions? */}
        <div className="bg-[#fff9f2] border border-[#ebd8c1] rounded-2xl p-8 text-center space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#2a0e13]">
            Still have questions?
          </h3>
          <p className="text-xs sm:text-sm text-[#63554e] max-w-lg mx-auto">
            Our team is happy to guide you on menu orders, spice levels, shelf life, and customised gift boxes.
          </p>
          <button
            onClick={() => navigateTo('contact-us')}
            className="inline-flex items-center space-x-2 bg-[#781523] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-lg hover:bg-[#5c131d] transition-colors"
          >
            <span>Contact Us Directly</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
