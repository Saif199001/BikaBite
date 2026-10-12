import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { buildWhatsAppLink, buildPhoneLink } from '../utils/whatsapp';
import { MessageCircle, Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { settings, navigateTo } = useApp();

  const primaryPackSize = product.packSizes[0] || 'Standard';

  const whatsappHref = buildWhatsAppLink(settings.whatsapp, {
    type: product.vertical === 'kitchen' ? 'kitchen' : product.vertical === 'mithai' ? 'mithai' : 'namkeen',
    itemName: product.name,
    packSize: primaryPackSize,
    quantity: '1',
    location: 'My Delivery City',
  });

  const phoneHref = buildPhoneLink(settings.phone);

  const verticalBadge = {
    kitchen: 'bg-amber-100 text-amber-900 border-amber-200',
    namkeen: 'bg-orange-100 text-orange-900 border-orange-200',
    mithai: 'bg-rose-100 text-rose-900 border-rose-200',
  }[product.vertical];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#e8dfd1] shadow-xs hover:shadow-md transition-all flex flex-col group h-full">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-[#f6f1e7] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Vertical and Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${verticalBadge}`}>
            {product.vertical}
          </span>
          <span className="text-[11px] font-medium bg-black/60 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {product.isAvailable ? (
            <span className="inline-flex items-center space-x-1 text-[11px] font-semibold bg-emerald-600/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
              <CheckCircle2 className="w-3 h-3" />
              <span>Available</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 text-[11px] font-semibold bg-stone-700/90 text-stone-200 px-2.5 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
              <AlertCircle className="w-3 h-3" />
              <span>Out of Stock</span>
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-serif font-bold text-lg text-[#2a0e13] group-hover:text-[#781523] transition-colors leading-snug">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-[#63554e] line-clamp-2 mb-3 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Sizes / Portion Information */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.packSizes.map((size, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-[#f8f5ee] text-[#55463e] px-2 py-0.5 rounded-sm border border-[#e8dfd1] font-medium"
              >
                {size}
              </span>
            ))}
            {product.servingInfo && (
              <span className="text-[11px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded-sm border border-amber-200 font-medium">
                {product.servingInfo}
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Price Tag if Confirmed */}
          <div className="pt-2 pb-3 border-t border-[#f0e9df] flex items-baseline justify-between">
            {product.price ? (
              <div className="flex items-baseline space-x-1">
                <span className="text-xs font-semibold text-[#8a7258]">Price:</span>
                <span className="text-lg font-bold text-[#781523]">₹{product.price}</span>
                {product.priceUnit && (
                  <span className="text-[11px] text-[#8a7258]">({product.priceUnit})</span>
                )}
              </div>
            ) : (
              <span className="text-xs italic text-[#8a7258]">Price confirmed upon enquiry</span>
            )}

            <button
              onClick={() => navigateTo('product-detail', product.id)}
              className="text-xs font-bold text-[#781523] hover:text-[#5c131d] flex items-center space-x-1 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {product.isAvailable ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 inline-flex items-center justify-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xs transition-colors"
                title={`Order ${product.name} on WhatsApp`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="truncate">Order WhatsApp</span>
              </a>
            ) : (
              <button
                disabled
                className="col-span-1 bg-stone-200 text-stone-500 text-xs font-medium py-2 px-3 rounded-lg cursor-not-allowed text-center"
              >
                Unavailable
              </button>
            )}

            <a
              href={phoneHref}
              className="col-span-1 inline-flex items-center justify-center space-x-1.5 bg-[#f6f1e7] hover:bg-[#ebdcd0] text-[#781523] border border-[#d8c3ad] text-xs font-bold py-2 px-3 rounded-lg transition-colors"
              title="Call to Order"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="truncate">Call Order</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
