import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Handshake, Send, CheckCircle, ShieldCheck, Building, TrendingUp } from 'lucide-react';

export const PartnerWithUsPage: React.FC = () => {
  const { submitLead } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: 'Retailer',
    cityAndState: '',
    pincode: '',
    productsOfInterest: 'Bikaneri Bhujia & Namkeen Range',
    existingBusinessDetails: '',
    expectedRequirement: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.businessName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name, business name, and phone number.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitLead({
        type: 'partnership',
        name: formData.fullName,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        businessType: formData.businessType,
        city: formData.cityAndState,
        pincode: formData.pincode,
        productPreference: formData.productsOfInterest,
        quantity: formData.expectedRequirement,
        message: `${formData.existingBusinessDetails ? 'Existing: ' + formData.existingBusinessDetails + '. ' : ''}${formData.message}`,
      });

      setIsSubmitted(true);
      setFormData({
        fullName: '',
        businessName: '',
        phone: '',
        email: '',
        businessType: 'Retailer',
        cityAndState: '',
        pincode: '',
        productsOfInterest: 'Bikaneri Bhujia & Namkeen Range',
        existingBusinessDetails: '',
        expectedRequirement: '',
        message: '',
      });
    } catch {
      setErrorMessage('Submission failed. Please check your network or call our business desk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/bikaneri_bhujia_snack_1791745388994.jpg"
            alt="Bika Bite Distribution Trade"
            className="w-full h-full object-cover opacity-20 scale-105 filter blur-xs"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#34050b] via-[#500e18]/90 to-[#781523]/80"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            <Handshake className="w-3.5 h-3.5" />
            <span>Retail, Wholesale & Distribution Partnerships</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            Build a Business Connection with Bika Bite.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
            Are you a retailer, wholesaler, distributor or business interested in exploring Bika Bite products? Connect with our team to discuss our available product range, supply requirements and potential partnership opportunities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-amber-200/90">
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
              🤝 Verified Batch Supply
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
              📦 FSSAI Compliant Packaging
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
              📈 Direct Commercial Support
            </span>
          </div>
        </div>
      </section>

      {/* Key Information & Form Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Partnership Principles */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#fffbf5] border border-[#e8dfd1] rounded-2xl p-6 space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#2a0e13] flex items-center space-x-2">
                <Building className="w-5 h-5 text-[#c68a26]" />
                <span>Trade Channels</span>
              </h3>
              <p className="text-xs text-[#63554e] leading-relaxed">
                We work with reputable retail stores, supermarkets, regional wholesalers, and hospitality distributors across India.
              </p>
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent batch margins & reliable dispatch schedules.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Submitting an enquiry does not automatically create a distribution agreement or commercial commitment.</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e8dfd1] rounded-2xl p-6 space-y-2 text-xs text-[#63554e]">
              <span className="font-bold text-[#2a0e13] uppercase tracking-wider block">Response Timeline:</span>
              <p>Trade enquiries are typically reviewed within 24 to 48 business hours by our commercial partnerships desk.</p>
            </div>
          </div>

          {/* Right Column: Partnership Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 sm:p-10 shadow-sm space-y-6">
              <div className="border-b border-[#f0e9df] pb-4">
                <h2 className="font-serif text-2xl font-bold text-[#2a0e13]">
                  Partner Enquiry Form
                </h2>
                <p className="text-xs text-[#8a7258] mt-1">
                  Fill in your commercial details to initiate a discussion with our trade team.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-emerald-950">
                    Enquiry Submitted Successfully
                  </h3>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    Thank you for contacting Bika Bite. Your partnership enquiry has been submitted successfully. Our trade team will review your details and connect with you.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="e.g. Anil Maheshwari"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="e.g. Maheshwari Traders"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="e.g. 9829123456"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="anil@maheshwaritraders.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Business Type *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                      >
                        <option value="Retailer">Retail Store</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Distributor">Regional Distributor</option>
                        <option value="Super Stockist">Super Stockist</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        City & State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cityAndState}
                        onChange={(e) => setFormData({ ...formData, cityAndState: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="e.g. Jaipur, Rajasthan"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="e.g. 302001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                      Products of Interest
                    </label>
                    <input
                      type="text"
                      value={formData.productsOfInterest}
                      onChange={(e) => setFormData({ ...formData, productsOfInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                      placeholder="e.g. Bikaneri Bhujia, Ratlami Sev, Packaged Sweets"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Existing Business Details (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.existingBusinessDetails}
                        onChange={(e) => setFormData({ ...formData, existingBusinessDetails: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="e.g. Operating 3 FMCG retail outlets since 2012"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Expected Monthly Requirement (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.expectedRequirement}
                        onChange={(e) => setFormData({ ...formData, expectedRequirement: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="e.g. ~500 kg per month"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                      Message / Additional Information
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                      placeholder="Share details regarding your distribution territory, retail footprint, or specific requirements..."
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting Details...' : 'Submit Partnership Enquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
