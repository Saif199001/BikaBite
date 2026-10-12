import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, CheckCircle, CalendarCheck, ShieldCheck, PhoneCall } from 'lucide-react';
import { buildPhoneLink } from '../utils/whatsapp';

export const BulkOrdersPage: React.FC = () => {
  const { submitLead, settings } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    enquiryType: 'Corporate Order / Gifting',
    estimatedQuantity: '',
    requiredDate: '',
    cityOrPincode: '',
    budgetRange: '',
    additionalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your full name and contact phone number.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitLead({
        type: 'bulk_order',
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        orderType: formData.enquiryType,
        quantity: formData.estimatedQuantity,
        requiredDate: formData.requiredDate,
        city: formData.cityOrPincode,
        budget: formData.budgetRange,
        message: formData.additionalDetails,
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        businessName: '',
        phone: '',
        email: '',
        enquiryType: 'Corporate Order / Gifting',
        estimatedQuantity: '',
        requiredDate: '',
        cityOrPincode: '',
        budgetRange: '',
        additionalDetails: '',
      });
    } catch {
      setErrorMessage('Failed to submit quote request. Please try contacting us directly via WhatsApp or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneHref = buildPhoneLink(settings.phone);

  return (
    <div className="space-y-16 pb-20">
      {/* Header - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/kaju_katli_mithai_1791745401301.jpg"
            alt="Bika Bite Bulk Orders & Hampers"
            className="w-full h-full object-cover opacity-20 scale-105 filter blur-xs"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#34050b] via-[#500e18]/90 to-[#781523]/80"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Event Catering • Corporate Gifting • Bulk Supply</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            Tell Us What You Need. We’ll Help You Plan.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
            Bika Bite accepts enquiries for suitable bulk food requirements, packaged products, mithai orders and gifting opportunities, subject to availability and business approval.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-amber-200/90">
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
              🎁 Custom Packaging & Inserts
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
              💼 Corporate & Festive Gifting
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
              🚚 Direct Scheduled Dispatches
            </span>
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-[#f0e9df] pb-6 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a0e13]">
              Request a Custom Quote
            </h2>
            <p className="text-sm text-[#63554e]">
              Share your requirements with our team so we can discuss the available products, quantities, pricing and delivery arrangements.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-emerald-950">
                Enquiry Submitted Successfully
              </h3>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                Thank you for contacting Bika Bite. Your enquiry has been submitted successfully. Our team will contact you using the details you provided.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. Vikramaditya Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Business / Organisation Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. Apex Hospitality Group"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    placeholder="e.g. 9829012345"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="vikram@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Enquiry Type *
                  </label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                  >
                    <option value="Food Order (Kitchen)">Kitchen Food Order / Gathering</option>
                    <option value="Packaged Namkeen Bulk">Packaged Namkeen Bulk Order</option>
                    <option value="Mithai Gifting">Mithai & Festive Sweets</option>
                    <option value="Corporate Order / Gifting">Corporate Order / Keepsake Boxes</option>
                    <option value="Wedding / Celebration">Wedding / Banquet Bulk Order</option>
                    <option value="Other">Other Requirement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Estimated Quantity *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. 100 kg / 150 Gift Hampers / 50 Thalis"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                    Required Delivery / Event Date
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
                    Delivery City or PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityOrPincode}
                    onChange={(e) => setFormData({ ...formData, cityOrPincode: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                    placeholder="e.g. Bikaner 334001, Jaipur, Delhi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                  Budget Range (Optional)
                </label>
                <input
                  type="text"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                  placeholder="e.g. ₹25,000 – ₹50,000 / ₹500 per gift box"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                  Additional Details / Products Requested
                </label>
                <textarea
                  rows={4}
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                  placeholder="Specify items of interest (e.g. Bikaneri Bhujia 400g, Kaju Katli boxes, custom ribbon printing, etc.)..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Details...' : 'Request a Quote'}</span>
                </button>
              </div>

              <div className="pt-3 border-t border-[#f0e9df] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a7258] gap-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confidential commercial discussion. No auto-quotations without review.</span>
                </div>
                <a href={phoneHref} className="text-[#781523] font-semibold hover:underline flex items-center space-x-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Need urgent assistance? Call us directly</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
