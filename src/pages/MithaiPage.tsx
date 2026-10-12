import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Gift, CheckCircle, Sparkles, Send } from 'lucide-react';

export const MithaiPage: React.FC = () => {
  const { products, submitLead } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Festival / Celebration',
    productPreference: 'Royal Festive Hamper',
    quantity: '25 Boxes',
    requiredDate: '',
    city: '',
    pincode: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mithaiProducts = products.filter((p) => p.vertical === 'mithai');
  const categories = ['all', ...Array.from(new Set(mithaiProducts.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'all'
      ? mithaiProducts
      : mithaiProducts.filter((p) => p.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name and phone number.');
      return;
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitLead({
        type: 'mithai_gifting',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        orderType: formData.occasion,
        productPreference: formData.productPreference,
        quantity: formData.quantity,
        requiredDate: formData.requiredDate,
        city: formData.city,
        pincode: formData.pincode,
        message: formData.message,
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        occasion: 'Festival / Celebration',
        productPreference: 'Royal Festive Hamper',
        quantity: '25 Boxes',
        requiredDate: '',
        city: '',
        pincode: '',
        message: '',
      });
    } catch {
      setErrorMessage('An error occurred submitting your enquiry. Please call or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('mithai-enquiry-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-400/20 border border-rose-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
              <Gift className="w-3.5 h-3.5" />
              <span>Pure Desi Ghee & Handcrafted Confections</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
              A Sweet Part of Every Celebration.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore the Bika Bite Mithai range for family occasions, festive celebrations, gifting and special gatherings. Contact us to check available varieties, box sizes, pricing and order requirements.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-amber-200/90">
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                ✓ 100% Pure Cow Desi Ghee
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                ✓ Handcrafted Shahi Kaju Katli
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                ✓ Festive Velvet Keepsake Boxes
              </span>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={scrollToEnquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#c68a26] hover:bg-[#d8972e] text-[#2a0e13] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>Enquire for Bulk Gifting</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('mithai-catalogue');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all"
              >
                <span>Browse Sweets & Hampers</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-black/40 group">
              <img
                src="/src/assets/images/kaju_katli_mithai_1791745401301.jpg"
                alt="Bika Bite Royal Shahi Kaju Katli Gift Box"
                className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 sm:p-5">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-[#c68a26] text-[#2a0e13] font-bold text-[10px] uppercase tracking-wider mb-1">
                    Festive Specialty
                  </span>
                  <p className="font-serif font-bold text-white text-base sm:text-lg">
                    Royal Shahi Kaju Katli Gift Box
                  </p>
                  <p className="text-xs text-amber-200">
                    Pure Goan cashews, edible silver foil & saffron strands
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid */}
      <section id="mithai-catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {cat === 'all' ? 'All Mithai Offerings' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Mithai Gifting Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#fbf4ea] to-[#f9ede0] border border-[#e8d5be] rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-rose-900 bg-rose-100 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customized Gift Presentation</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
              Gifts That Bring People Together.
            </h2>
            <p className="text-sm sm:text-base text-[#55463e] leading-relaxed">
              Looking for mithai for a festival, family function, wedding, celebration or business occasion? Contact our team to discuss available gift boxes, quantities, packaging options and delivery arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* Bulk Mithai Enquiry Form */}
      <section id="mithai-enquiry-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#781523]">
              Gifting Planning
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
              Bulk Mithai & Gifting Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#63554e] max-w-xl mx-auto">
              Tell us about your occasion and requirements. Our confection specialists will provide box options, pricing, and dispatch schedules.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-emerald-950">
                Enquiry Submitted Successfully
              </h3>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto">
                Thank you for contacting Bika Bite. Your enquiry has been submitted successfully. Our team will contact you using the details you provided.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200 font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. Ramesh Agrawal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. 9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Occasion / Event
                  </label>
                  <input
                    type="text"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. Diwali, Wedding, Corporate Milestone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Product / Gift Box Preference
                  </label>
                  <input
                    type="text"
                    value={formData.productPreference}
                    onChange={(e) => setFormData({ ...formData, productPreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. Royal Shahi Kaju Katli / Assorted Hamper"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Quantity Required
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. 50 boxes (500g each)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Required Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.requiredDate}
                    onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Delivery City or PIN Code
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. Bikaner, Jaipur, Delhi / 334001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                  Additional Requirements / Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                  placeholder="Tell us about custom packaging, branding cards, or delivery instructions..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Gifting Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
