import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { KitchenPage } from './pages/KitchenPage';
import { NamkeenPage } from './pages/NamkeenPage';
import { MithaiPage } from './pages/MithaiPage';
import { AllProductsPage } from './pages/AllProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BulkOrdersPage } from './pages/BulkOrdersPage';
import { PartnerWithUsPage } from './pages/PartnerWithUsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FAQPage } from './pages/FAQPage';
import { PolicyPage } from './pages/PolicyPage';
import { AdminPage } from './pages/AdminPage';
import { buildWhatsAppLink } from './utils/whatsapp';
import { MessageCircle } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentRoute, settings } = useApp();

  // Dynamically update document title based on Section 24 SEO Requirements
  useEffect(() => {
    switch (currentRoute) {
      case 'kitchen':
        document.title = 'Bika Bite Kitchen | Menu and Direct Orders';
        break;
      case 'namkeen':
        document.title = 'Bika Bite Namkeen | Products and Wholesale Enquiries';
        break;
      case 'mithai':
        document.title = 'Bika Bite Mithai | Sweets and Gifting Enquiries';
        break;
      case 'all-products':
        document.title = 'Explore All Bika Bite Products | Kitchen, Namkeen & Mithai';
        break;
      case 'bulk-orders':
        document.title = 'Bika Bite | Bulk Orders, Gifting and Business Enquiries';
        break;
      case 'partner-with-us':
        document.title = 'Partner With Us | Bika Bite Wholesale & Distribution';
        break;
      case 'about-us':
        document.title = 'About Bika Bite | Born in Bikaner. Built Around Food.';
        break;
      case 'contact-us':
        document.title = 'Contact Bika Bite | WhatsApp, Call & Store Desk';
        break;
      case 'faqs':
        document.title = 'Frequently Asked Questions | Bika Bite';
        break;
      case 'shipping-policy':
        document.title = 'Shipping and Delivery Policy | Bika Bite';
        break;
      case 'cancellation-policy':
        document.title = 'Cancellation and Refund Policy | Bika Bite';
        break;
      case 'privacy-policy':
        document.title = 'Privacy Policy | Bika Bite';
        break;
      case 'terms-conditions':
        document.title = 'Website Terms and Conditions | Bika Bite';
        break;
      case 'admin':
        document.title = 'Store Admin Console | Bika Bite';
        break;
      default:
        document.title = 'Bika Bite | Born in Bikaner — Kitchen, Namkeen & Mithai';
        break;
    }
  }, [currentRoute]);

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'kitchen':
        return <KitchenPage />;
      case 'namkeen':
        return <NamkeenPage />;
      case 'mithai':
        return <MithaiPage />;
      case 'all-products':
        return <AllProductsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'bulk-orders':
        return <BulkOrdersPage />;
      case 'partner-with-us':
        return <PartnerWithUsPage />;
      case 'about-us':
        return <AboutUsPage />;
      case 'contact-us':
        return <ContactUsPage />;
      case 'faqs':
        return <FAQPage />;
      case 'shipping-policy':
      case 'cancellation-policy':
      case 'privacy-policy':
      case 'terms-conditions':
        return <PolicyPage />;
      case 'admin':
        return <AdminPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  const whatsappFloatingHref = buildWhatsAppLink(settings.whatsapp, {
    type: 'general',
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#241c19]">
      <Header />
      <main className="flex-1">{renderCurrentView()}</main>
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappFloatingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center space-x-2 border-2 border-white/80 group"
        title="Direct WhatsApp Support & Orders"
      >
        <MessageCircle className="w-6 h-6 fill-white/20" />
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
