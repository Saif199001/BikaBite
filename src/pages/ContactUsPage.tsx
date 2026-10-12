import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { buildWhatsAppLink, buildPhoneLink } from '../utils/whatsapp';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle, Navigation } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { settings, submitLead } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: 'General Product Enquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name and contact phone number.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitLead({
        type: 'contact',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        reason: formData.reason,
        message: formData.message,
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        reason: 'General Product Enquiry',
        message: '',
      });
    } catch {
      setErrorMessage('Submission failed. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappHref = buildWhatsAppLink(settings.whatsapp, { type: 'general' });
  const phoneHref = buildPhoneLink(settings.phone);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.address
  )}`;

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Customer Desk • Born in Bikaner</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            We’re Here to Help.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Have a question about our menu, products, availability, bulk orders or business partnerships? Contact Bika Bite using the details below or send us an enquiry.
          </p>
        </div>
      </section>

      {/* Direct Contact Action Bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={phoneHref}
            className="bg-white hover:bg-[#fbf4ea] border border-[#e8dfd1] p-6 rounded-2xl flex items-center space-x-4 shadow-2xs transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#781523] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7258] block">
                Direct Phone
              </span>
              <span className="font-bold text-sm text-[#2a0e13]">Call Bika Bite</span>
              <span className="text-xs text-[#8a7258] block">{settings.phone}</span>
            </div>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-emerald-50 border border-[#e8dfd1] p-6 rounded-2xl flex items-center space-x-4 shadow-2xs transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7258] block">
                Instant Chat
              </span>
              <span className="font-bold text-sm text-[#2a0e13]">WhatsApp Bika Bite</span>
              <span className="text-xs text-[#8a7258] block">+{settings.whatsapp}</span>
            </div>
          </a>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-amber-50 border border-[#e8dfd1] p-6 rounded-2xl flex items-center space-x-4 shadow-2xs transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#c68a26] text-[#2a0e13] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7258] block">
                Public Location
              </span>
              <span className="font-bold text-sm text-[#2a0e13]">Get Directions</span>
              <span className="text-xs text-[#8a7258] block">Bikaner, Rajasthan</span>
            </div>
          </a>
        </div>
      </section>

      {/* Main Details and Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#e8dfd1] p-6 sm:p-8 space-y-6 shadow-2xs">
              <h3 className="font-serif font-bold text-xl text-[#2a0e13]">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs text-[#55463e]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#781523] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2a0e13] block">Business Address:</span>
                    <p className="mt-0.5 leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#781523] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2a0e13] block">Business Hours:</span>
                    <p className="mt-0.5 leading-relaxed">{settings.businessHours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#781523] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2a0e13] block">Telephone:</span>
                    <p className="mt-0.5 font-medium">{settings.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2a0e13] block">WhatsApp:</span>
                    <p className="mt-0.5 font-medium">+{settings.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#781523] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2a0e13] block">Email:</span>
                    <p className="mt-0.5 font-medium">{settings.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 sm:p-10 shadow-sm space-y-6">
              <div className="border-b border-[#f0e9df] pb-4">
                <h2 className="font-serif text-2xl font-bold text-[#2a0e13]">
                  Send Us an Enquiry
                </h2>
                <p className="text-xs text-[#8a7258] mt-1">
                  We reply promptly to product queries, kitchen orders, and gifting requests.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-emerald-950">
                    Enquiry Submitted Successfully
                  </h3>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    Thank you for contacting Bika Bite. Your enquiry has been submitted successfully. Our team will contact you using the details you provided.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="Your full name"
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
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                        placeholder="name@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                        Reason for Contacting Us
                      </label>
                      <select
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                      >
                        <option value="General Product Enquiry">General Product Enquiry</option>
                        <option value="Kitchen Order Query">Kitchen Order Query</option>
                        <option value="Namkeen Wholesale">Namkeen Wholesale</option>
                        <option value="Mithai Gifting Box">Mithai Gifting Box</option>
                        <option value="Feedback / Other">Feedback / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#443831] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
                      placeholder="How can our team assist you today?"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#781523] hover:bg-[#5c131d] text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
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
