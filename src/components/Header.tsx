import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { buildWhatsAppLink, buildPhoneLink } from '../utils/whatsapp';
import { Phone, MessageCircle, Menu, X, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'namkeen', label: 'Namkeen' },
    { id: 'mithai', label: 'Mithai' },
    { id: 'all-products', label: 'All Products' },
    { id: 'bulk-orders', label: 'Bulk Orders & Gifting' },
    { id: 'partner-with-us', label: 'Partner With Us' },
    { id: 'about-us', label: 'About Us' },
    { id: 'contact-us', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  const whatsappHref = buildWhatsAppLink(settings.whatsapp, { type: 'general' });
  const phoneHref = buildPhoneLink(settings.phone);

  return (
    <header className="sticky top-0 z-50 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#e8dfd1] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#781523] text-amber-100 text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-between">
        <div className="hidden md:block w-24"></div>
        <div className="mx-auto flex items-center space-x-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>{settings.brandLine} Kitchen · Packaged Namkeen · Handcrafted Mithai</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => handleNavClick('admin')}
            className="hidden sm:inline-flex items-center space-x-1 opacity-80 hover:opacity-100 hover:text-white transition-opacity text-[11px]"
            title="Store Admin Panel"
          >
            <Settings className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left focus:outline-hidden group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#781523] border border-amber-300/40 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/src/assets/images/brand_logo_emblem_1791745376397.jpg"
                alt="Bika Bite Royal Emblem"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-2xl font-serif font-black tracking-tight text-[#781523] leading-none">
                BIKA BITE
              </div>
              <div className="text-[10px] tracking-widest text-[#8a7258] uppercase font-semibold mt-0.5">
                Born in Bikaner
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-[#781523] bg-[#f2e9dc] font-semibold'
                      : 'text-[#443831] hover:text-[#781523] hover:bg-[#f6f1e7]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-md shadow-xs transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-100/20" />
              <span>Order on WhatsApp</span>
            </a>

            <a
              href={phoneHref}
              className="inline-flex items-center space-x-2 bg-[#781523] hover:bg-[#5c131d] text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-md shadow-xs transition-all transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call to Order</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center space-x-2 xl:hidden">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-md bg-emerald-700 text-white"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#781523] hover:bg-[#f2e9dc] focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbf9f4] border-b border-[#e8dfd1] px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#781523] text-white font-semibold'
                      : 'text-[#443831] hover:bg-[#f2e9dc] hover:text-[#781523]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 flex items-center space-x-2 mt-2"
            >
              <Settings className="w-4 h-4" />
              <span>Website Admin Panel</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#e8dfd1] flex flex-col sm:flex-row gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-wider font-bold py-3 px-4 rounded-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
            <a
              href={phoneHref}
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#781523] hover:bg-[#5c131d] text-white text-xs uppercase tracking-wider font-bold py-3 px-4 rounded-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call to Order</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
