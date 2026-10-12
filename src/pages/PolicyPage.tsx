import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Truck, RotateCcw, FileText } from 'lucide-react';

interface PolicyPageProps {
  initialTab?: 'shipping' | 'cancellation' | 'privacy' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'shipping' }) => {
  const { currentRoute, navigateTo, settings } = useApp();

  let activeTab: 'shipping' | 'cancellation' | 'privacy' | 'terms' = initialTab;
  if (currentRoute === 'shipping-policy') activeTab = 'shipping';
  if (currentRoute === 'cancellation-policy') activeTab = 'cancellation';
  if (currentRoute === 'privacy-policy') activeTab = 'privacy';
  if (currentRoute === 'terms-conditions') activeTab = 'terms';

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5d58c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Transparency & Consumer Compliance</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            Policies & Terms
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Review our delivery guidelines, cancellation standards, privacy practices, and website conditions.
          </p>
        </div>
      </section>

      {/* Tabs navigation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#e8dfd1] pb-4">
          <button
            onClick={() => navigateTo('shipping-policy')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === 'shipping'
                ? 'bg-[#781523] text-white shadow-xs'
                : 'bg-white text-[#55463e] hover:bg-[#f6f1e7] border border-[#e8dfd1]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping & Delivery</span>
          </button>

          <button
            onClick={() => navigateTo('cancellation-policy')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === 'cancellation'
                ? 'bg-[#781523] text-white shadow-xs'
                : 'bg-white text-[#55463e] hover:bg-[#f6f1e7] border border-[#e8dfd1]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Cancellation & Refund</span>
          </button>

          <button
            onClick={() => navigateTo('privacy-policy')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#781523] text-white shadow-xs'
                : 'bg-white text-[#55463e] hover:bg-[#f6f1e7] border border-[#e8dfd1]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => navigateTo('terms-conditions')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === 'terms'
                ? 'bg-[#781523] text-white shadow-xs'
                : 'bg-white text-[#55463e] hover:bg-[#f6f1e7] border border-[#e8dfd1]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 sm:p-14 shadow-sm text-sm text-[#443831] leading-relaxed space-y-6">
          {/* TAB: SHIPPING & DELIVERY */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
                Shipping and Delivery Policy
              </h2>
              <p>
                Delivery arrangements depend on the product category, destination, order size and confirmed availability.
              </p>
              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">1. Kitchen Orders</h3>
                <p>
                  For Kitchen orders, customers should confirm the service area ({settings.kitchenServiceArea}), estimated preparation time and delivery or collection options directly with our team.
                </p>
              </div>

              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">2. Packaged Namkeen and Mithai Orders</h3>
                <p>
                  For packaged Namkeen and Mithai orders, customers should confirm shipping availability, applicable charges, dispatch timelines and estimated delivery with Bika Bite before placing an order.
                </p>
                <p>
                  Delivery timelines are estimates unless expressly confirmed otherwise. Standard domestic surface transit for sealed packaged goods takes between 2 to 5 business days depending on location.
                </p>
              </div>

              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">3. Questions Regarding Delivery</h3>
                <p>
                  For delivery questions, updates, or special dispatch instructions, contact us at {settings.email} or call {settings.phone}.
                </p>
              </div>
            </div>
          )}

          {/* TAB: CANCELLATION & REFUND */}
          {activeTab === 'cancellation' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
                Cancellation and Refund Policy
              </h2>
              <p>
                Orders are handled directly by the Bika Bite team. Customers should contact the team as soon as possible if they need to request a change or cancellation.
              </p>
              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">1. Change or Cancellation Eligibility</h3>
                <p>
                  Whether an order can be changed or cancelled depends on its status, preparation or dispatch stage and the applicable product requirements. For freshly made kitchen meals, cancellations must be requested prior to preparation commencement.
                </p>
              </div>

              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">2. Damaged or Problematic Orders</h3>
                <p>
                  If a customer receives a damaged, incorrect or otherwise problematic order, they should contact Bika Bite promptly within 24 hours of delivery and provide the order details and relevant photographs.
                </p>
              </div>

              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">3. Resolution and Assessment</h3>
                <p>
                  Any refund, replacement or other resolution will be assessed under the business’s verified standards and applicable consumer law. Approved refunds are processed to the original payment source within 3–5 working days.
                </p>
              </div>
            </div>
          )}

          {/* TAB: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
                Privacy Policy
              </h2>
              <p>
                Bika Bite may collect information that customers provide through contact forms, WhatsApp conversations, telephone enquiries and business enquiry forms.
              </p>
              <p>
                Depending on the interaction, this information may include a name, phone number, email address, business details, delivery location and order requirements.
              </p>
              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">Purpose of Data Collection</h3>
                <p>
                  The information should be used only for appropriate purposes, such as responding to enquiries, confirming orders, arranging fulfilment, handling complaints and managing business relationships.
                </p>
              </div>
              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">Data Safeguards & Contact</h3>
                <p>
                  Information should be accessible only to authorised people and service providers who need it for legitimate business purposes. For privacy questions, please contact our team at {settings.email}.
                </p>
              </div>
            </div>
          )}

          {/* TAB: TERMS AND CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#2a0e13]">
                Website Terms and Conditions
              </h2>
              <p>
                This website is intended to provide information about Bika Bite, its Kitchen, Namkeen and Mithai offerings, and ways to contact the business.
              </p>
              <p>
                Product images, descriptions, prices and availability should be accurate to the extent reasonably possible. Some products may be subject to availability, location and confirmation by the Bika Bite team.
              </p>
              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">Direct Enquiry Nature</h3>
                <p>
                  Submitting a WhatsApp message or contact form is an enquiry and does not automatically guarantee product availability, order acceptance, delivery or a confirmed price. Any order or business arrangement will be subject to the terms communicated and agreed directly with the customer.
                </p>
              </div>
              <div className="space-y-3 bg-[#fbf9f4] p-6 rounded-2xl border border-[#e8dfd1]">
                <h3 className="font-bold text-base text-[#2a0e13]">Customer Responsibility</h3>
                <p>
                  Customers should provide accurate contact and delivery information. Website users must not misuse the website, submit unlawful content or attempt to interfere with its operation.
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-[#f0e9df] flex justify-between items-center text-xs text-[#8a7258]">
            <span>Official Policy Document • Bika Bite</span>
            <button onClick={() => navigateTo('contact-us')} className="text-[#781523] font-bold hover:underline">
              Contact Compliance Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
