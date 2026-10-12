import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Vertical } from '../types';
import { Search, Filter, Layers, UtensilsCrossed, Package, Gift } from 'lucide-react';

export const AllProductsPage: React.FC = () => {
  const { products } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<'all' | Vertical>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available_only'>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Vertical filter
      if (selectedVertical !== 'all' && p.vertical !== selectedVertical) {
        return false;
      }

      // Availability filter
      if (availabilityFilter === 'available_only' && !p.isAvailable) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedVertical, availabilityFilter, searchQuery]);

  return (
    <div className="space-y-12 pb-20">
      {/* Header - Rich Attractive Banner */}
      <section className="relative bg-[#34050b] bg-gradient-to-br from-[#260408] via-[#500e18] to-[#781523] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#c68a26]">
        {/* Background panoramic culinary photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/bika_hero_banner_1791745434314.jpg"
            alt="Bika Bite Complete Range"
            className="w-full h-full object-cover opacity-20 scale-105 filter blur-xs"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#34050b] via-[#500e18]/90 to-[#781523]/80"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Kitchen • Namkeen • Mithai</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            Explore All Bika Bite Products
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Discover products from Bika Bite Kitchen, Bika Bite Namkeen and Bika Bite Mithai in one place. Browse the catalogue and contact us directly for orders and product enquiries.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#e8dfd1] p-6 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="w-4 h-4 text-[#8a7258] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, spice, or category..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#781523]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a7258] hover:text-[#781523]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Vertical Toggle Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => setSelectedVertical('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  selectedVertical === 'all'
                    ? 'bg-[#781523] text-white shadow-xs'
                    : 'bg-[#f6f1e7] text-[#443831] hover:bg-[#ede3d4]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Verticals</span>
              </button>

              <button
                onClick={() => setSelectedVertical('kitchen')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  selectedVertical === 'kitchen'
                    ? 'bg-[#781523] text-white shadow-xs'
                    : 'bg-[#f6f1e7] text-[#443831] hover:bg-[#ede3d4]'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Kitchen</span>
              </button>

              <button
                onClick={() => setSelectedVertical('namkeen')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  selectedVertical === 'namkeen'
                    ? 'bg-[#781523] text-white shadow-xs'
                    : 'bg-[#f6f1e7] text-[#443831] hover:bg-[#ede3d4]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Namkeen</span>
              </button>

              <button
                onClick={() => setSelectedVertical('mithai')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  selectedVertical === 'mithai'
                    ? 'bg-[#781523] text-white shadow-xs'
                    : 'bg-[#f6f1e7] text-[#443831] hover:bg-[#ede3d4]'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Mithai</span>
              </button>
            </div>

            {/* Availability Filter */}
            <div className="flex items-center space-x-2 w-full lg:w-auto justify-end">
              <Filter className="w-4 h-4 text-[#8a7258]" />
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                className="px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-xs font-semibold text-[#443831] focus:outline-hidden"
              >
                <option value="all">All Availability Status</option>
                <option value="available_only">Available Only</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8a7258]">
            Showing {filteredProducts.length} Product{filteredProducts.length === 1 ? '' : 's'}
          </p>
          <span className="text-xs text-[#8a7258] italic hidden sm:inline">
            Direct ordering via WhatsApp & Phone • Non-transactional catalogue
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#e8dfd1] space-y-3">
            <p className="font-serif text-xl font-bold text-[#2a0e13]">No matching products found</p>
            <p className="text-xs text-[#8a7258] max-w-sm mx-auto">
              Try adjusting your search terms or filter settings to browse our catalogue.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedVertical('all');
                setAvailabilityFilter('all');
              }}
              className="text-xs font-bold text-[#781523] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
