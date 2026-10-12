import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { buildWhatsAppLink, buildPhoneLink } from '../utils/whatsapp';
import {
  MessageCircle,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, selectedProductId, settings, navigateTo } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const [selectedPackSize, setSelectedPackSize] = useState<string>(
    product?.packSizes[0] || 'Standard'
  );

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <p className="font-serif text-2xl font-bold text-[#2a0e13]">Product Not Found</p>
        <button
          onClick={() => navigateTo('all-products')}
          className="text-sm font-bold text-[#781523] underline"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const isKitchen = product.vertical === 'kitchen';

  const whatsappHref = buildWhatsAppLink(settings.whatsapp, {
    type: isKitchen ? 'kitchen' : product.vertical === 'mithai' ? 'mithai' : 'namkeen',
    itemName: product.name,
    packSize: selectedPackSize,
    quantity: '1',
    location: 'My Delivery City',
  });

  const phoneHref = buildPhoneLink(settings.phone);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <button
        onClick={() => navigateTo('all-products')}
        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#781523] hover:text-[#5c131d] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Products</span>
      </button>

      {/* Main Product Showcase */}
      <div className="bg-white rounded-3xl border border-[#e8dfd1] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-10">
        {/* Left: Product Image */}
        <div className="space-y-4">
          <div className="aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-[#f6f1e7] border border-[#ebd8c1] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#781523] text-amber-200">
                {product.vertical}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-xs">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Details & Direct CTAs */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Availability */}
            <div>
              {product.isAvailable ? (
                <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Available for Order</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
                  <AlertCircle className="w-4 h-4 text-stone-500" />
                  <span>Currently Unavailable / On Pre-Order</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a0e13] leading-tight">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline space-x-2 pt-1 pb-2 border-b border-[#f0e9df]">
              {product.price ? (
                <>
                  <span className="text-sm font-semibold text-[#8a7258]">Confirmed Price:</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#781523]">₹{product.price}</span>
                  {product.priceUnit && (
                    <span className="text-xs text-[#8a7258]">({product.priceUnit})</span>
                  )}
                </>
              ) : (
                <span className="text-sm italic text-[#8a7258]">Price confirmed upon order enquiry</span>
              )}
            </div>

            <p className="text-sm text-[#443831] leading-relaxed">
              {product.description}
            </p>

            {/* Pack Size / Serving Selection */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#443831]">
                {isKitchen ? 'Portion & Serving Size:' : 'Available Pack Sizes:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.packSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedPackSize(size)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedPackSize === size
                        ? 'bg-[#781523] text-white shadow-xs'
                        : 'bg-[#f6f1e7] text-[#443831] hover:bg-[#ede3d4] border border-[#d8c3ad]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {product.servingInfo && (
                <p className="text-xs text-[#8a7258] mt-1 italic">
                  Serving Note: {product.servingInfo}
                </p>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-[#f0e9df]">
            <p className="text-xs text-[#63554e]">
              Contact our team to confirm availability, exact pricing and delivery options for your selected product.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {product.isAvailable ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order This on WhatsApp</span>
                </a>
              ) : (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire for Next Batch</span>
                </a>
              )}

              <a
                href={phoneHref}
                className="inline-flex items-center justify-center space-x-2 bg-[#f6f1e7] hover:bg-[#ebdcd0] text-[#781523] border border-[#d8c3ad] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call to Order</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('bulk-orders')}
                className="w-full inline-flex items-center justify-center space-x-2 bg-white hover:bg-amber-50 text-[#8a7258] hover:text-[#781523] border border-[#e8dfd1] text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Enquire for Bulk / Wholesale Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications & Legal Compliance Information (Section 9 & 25) */}
      {!isKitchen && (
        <div className="bg-white rounded-3xl border border-[#e8dfd1] p-6 sm:p-10 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2a0e13]">
            Product Specifications & Declarations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#55463e]">
            {/* Ingredients & Allergens */}
            <div className="space-y-4">
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[#2a0e13] mb-1 text-[11px]">
                    Ingredients:
                  </h3>
                  <p className="leading-relaxed bg-[#fbf9f4] p-3 rounded-lg border border-[#e8dfd1]">
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              )}

              {product.allergens && (
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[#2a0e13] mb-1 text-[11px]">
                    Allergen Information:
                  </h3>
                  <p className="leading-relaxed bg-amber-50/70 p-3 rounded-lg border border-amber-200/80 text-amber-950">
                    {product.allergens}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {product.storageInstructions && (
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-[#2a0e13] mb-1 text-[11px]">
                      Storage Instructions:
                    </h3>
                    <p className="leading-relaxed bg-[#fbf9f4] p-3 rounded-lg border border-[#e8dfd1]">
                      {product.storageInstructions}
                    </p>
                  </div>
                )}
                {product.shelfLife && (
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-[#2a0e13] mb-1 text-[11px]">
                      Shelf Life:
                    </h3>
                    <p className="leading-relaxed bg-[#fbf9f4] p-3 rounded-lg border border-[#e8dfd1]">
                      {product.shelfLife}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Nutrition & Manufacturer Details */}
            <div className="space-y-4">
              {product.nutritionInfo && (
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-[#2a0e13] mb-1 text-[11px]">
                    Nutrition Information (Approx. Values):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#fbf9f4] p-3 rounded-lg border border-[#e8dfd1]">
                    <div className="text-center p-1.5 bg-white rounded-sm border border-[#e8dfd1]">
                      <span className="block text-[10px] text-[#8a7258] uppercase">Energy</span>
                      <span className="font-bold text-[#2a0e13]">{product.nutritionInfo.energy || '—'}</span>
                    </div>
                    <div className="text-center p-1.5 bg-white rounded-sm border border-[#e8dfd1]">
                      <span className="block text-[10px] text-[#8a7258] uppercase">Protein</span>
                      <span className="font-bold text-[#2a0e13]">{product.nutritionInfo.protein || '—'}</span>
                    </div>
                    <div className="text-center p-1.5 bg-white rounded-sm border border-[#e8dfd1]">
                      <span className="block text-[10px] text-[#8a7258] uppercase">Carbs</span>
                      <span className="font-bold text-[#2a0e13]">{product.nutritionInfo.carbohydrates || '—'}</span>
                    </div>
                    <div className="text-center p-1.5 bg-white rounded-sm border border-[#e8dfd1]">
                      <span className="block text-[10px] text-[#8a7258] uppercase">Total Fat</span>
                      <span className="font-bold text-[#2a0e13]">{product.nutritionInfo.fat || '—'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold uppercase tracking-wider text-[#2a0e13] mb-1 text-[11px]">
                  Manufactured & Marketed By:
                </h3>
                <div className="bg-[#fbf9f4] p-3 rounded-lg border border-[#e8dfd1] space-y-1">
                  <p className="font-bold text-[#2a0e13]">Bika Bite Confectioneries & Kitchens</p>
                  <p>{settings.address}</p>
                  <p className="text-[11px] text-[#8a7258]">
                    Food Safety Standards Authority of India (FSSAI) compliant facility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
