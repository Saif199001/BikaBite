import React from 'react';
import { useApp } from '../context/AppContext';
import { buildWhatsAppLink, buildPhoneLink } from '../utils/whatsapp';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings } = useApp();
  const currentYear = new Date().getFullYear();

  const handleNav = (route: string) => {
    navigateTo(route);
  };

  const whatsappHref = buildWhatsAppLink(settings.whatsapp, { type: 'general' });
  const phoneHref = buildPhoneLink(settings.phone);

  return (
    <footer className="bg-[#2a0e13] text-[#ebdcd0] pt-16 pb-10 border-t-4 border-[#c68a26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#4d1f27]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#c68a26] border border-amber-300/40 shadow-xs shrink-0">
                <img
                  src="/src/assets/images/brand_logo_emblem_1791745376397.jpg"
                  alt="Bika Bite Royal Emblem"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-black tracking-tight text-white leading-none">
                  BIKA BITE
                </h3>
                <p className="text-xs tracking-widest text-[#d5af73] uppercase font-semibold mt-1">
                  {settings.brandLine}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#c9b3a3] max-w-sm leading-relaxed">
              Kitchen · Namkeen · Mithai. Discover the rich culinary craftsmanship of Bikaner. Direct orders and wholesale supply with verified authentic recipes.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#3d161d] text-[#e3cebe] border border-[#5a242c]">
                <Clock className="w-3.5 h-3.5 text-[#d5af73]" />
                <span>{settings.businessHours}</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#3d161d] text-[#e3cebe] border border-[#5a242c]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d5af73]" />
                <span>FSSAI Compliant Operations</span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#d5af73]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about-us')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('kitchen')} className="hover:text-white transition-colors">
                  Kitchen
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('namkeen')} className="hover:text-white transition-colors">
                  Namkeen
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mithai')} className="hover:text-white transition-colors">
                  Mithai
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('all-products')} className="hover:text-white transition-colors">
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#d5af73]">
              Customer Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('contact-us')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faqs')} className="hover:text-white transition-colors">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shipping-policy')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cancellation-policy')} className="hover:text-white transition-colors">
                  Cancellation & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms-conditions')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#d5af73]">
              Business & Contact
            </h4>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <button onClick={() => handleNav('bulk-orders')} className="hover:text-white transition-colors">
                  Bulk Orders & Gifting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partner-with-us')} className="hover:text-white transition-colors">
                  Partner With Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partner-with-us')} className="hover:text-white transition-colors">
                  Wholesale Enquiries
                </button>
              </li>
            </ul>

            <div className="pt-2 space-y-2 text-xs text-[#c9b3a3]">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#d5af73] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#d5af73] shrink-0" />
                <a href={phoneHref} className="hover:underline">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#d5af73] shrink-0" />
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  +{settings.whatsapp}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#d5af73] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:underline">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#a89080] gap-4">
          <p>
            Copyright © {currentYear} Bika Bite. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span>Direct Ordering via WhatsApp & Phone</span>
            <span>•</span>
            <span>No Online Payment Gateway Required</span>
            <span>•</span>
            <button onClick={() => handleNav('admin')} className="text-[#d5af73] hover:underline">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
