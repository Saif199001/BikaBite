import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Vertical } from '../types';
import {
  Settings,
  Package,
  Phone,
  Inbox,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Save,
  RotateCcw,
  Database,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Server,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    products,
    settings,
    leads,
    neonStatus,
    refreshNeonStatus,
    configureNeon,
    addProduct,
    updateProduct,
    deleteProduct,
    updateSettings,
    updateLeadStatus,
    deleteLead,
    resetToDefaults,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'leads' | 'database'>('products');
  const [neonConnectionString, setNeonConnectionString] = useState('');
  const [showDbPassword, setShowDbPassword] = useState(false);
  const [isDbConnecting, setIsDbConnecting] = useState(false);
  const [dbStatusFeedback, setDbStatusFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Product editing modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // New/Edit product form state
  const [prodForm, setProdForm] = useState<Partial<Product>>({
    name: '',
    vertical: 'namkeen',
    category: 'Snacks',
    shortDescription: '',
    description: '',
    image: '',
    packSizes: ['200g', '400g'],
    price: 120,
    priceUnit: 'per pack',
    isAvailable: true,
    isFeatured: false,
    ingredients: [],
    allergens: '',
    shelfLife: '',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProdForm(p);
    setIsCreatingProduct(false);
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setProdForm({
      id: 'prod-' + Date.now(),
      name: '',
      vertical: 'namkeen',
      category: 'Speciality',
      shortDescription: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      packSizes: ['250g', '500g'],
      price: 150,
      priceUnit: 'per 500g',
      isAvailable: true,
      isFeatured: false,
      ingredients: ['Flour', 'Spices', 'Pure Ghee'],
      allergens: '',
      shelfLife: '6 Months',
    });
    setIsCreatingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.image) return;

    if (isCreatingProduct) {
      addProduct({
        id: 'prod-' + Date.now(),
        name: prodForm.name,
        vertical: (prodForm.vertical as Vertical) || 'namkeen',
        category: prodForm.category || 'Speciality',
        shortDescription: prodForm.shortDescription || '',
        description: prodForm.description || '',
        image: prodForm.image,
        packSizes: Array.isArray(prodForm.packSizes) ? prodForm.packSizes : ['Standard'],
        price: Number(prodForm.price) || undefined,
        priceUnit: prodForm.priceUnit || '',
        isAvailable: Boolean(prodForm.isAvailable),
        isFeatured: Boolean(prodForm.isFeatured),
        ingredients: prodForm.ingredients,
        allergens: prodForm.allergens,
        shelfLife: prodForm.shelfLife,
      });
      setIsCreatingProduct(false);
    } else if (editingProduct) {
      updateProduct(editingProduct.id, prodForm);
      setEditingProduct(null);
    }
  };

  const handleConnectNeon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!neonConnectionString.trim()) return;
    setIsDbConnecting(true);
    setDbStatusFeedback(null);
    try {
      const result = await configureNeon(neonConnectionString.trim());
      if (result.success) {
        setDbStatusFeedback({
          type: 'success',
          message: result.message || 'Connected to Neon Database successfully!',
        });
        setNeonConnectionString('');
      } else {
        setDbStatusFeedback({
          type: 'error',
          message: result.message || 'Failed to connect to Neon. Please check credentials and endpoint.',
        });
      }
    } catch (err: any) {
      setDbStatusFeedback({
        type: 'error',
        message: err.message || 'Unexpected connection error',
      });
    } finally {
      setIsDbConnecting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e8dfd1] shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#781523] text-amber-200">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#2a0e13]">
              Bika Bite Management Panel
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <p className="text-xs text-[#8a7258]">
              Section 22 Admin Console: Configure catalogue items, prices, WhatsApp contacts, and incoming leads.
            </p>
            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-stone-200 bg-stone-50">
              <span
                className={`w-2 h-2 rounded-full ${
                  neonStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className={neonStatus.connected ? 'text-emerald-800' : 'text-amber-800'}>
                Neon DB: {neonStatus.connected ? 'Connected' : 'Local Fallback'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-bold text-[#781523] border border-[#d8c3ad] hover:bg-[#f6f1e7] px-3.5 py-2 rounded-lg transition-colors"
          >
            View Live Site
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset catalogue and settings back to original defaults?')) {
                resetToDefaults();
                setSettingsForm(settings);
              }
            }}
            className="text-xs font-bold text-stone-600 hover:text-red-700 border border-stone-200 hover:bg-red-50 px-3.5 py-2 rounded-lg transition-colors flex items-center space-x-1"
            title="Reset to factory brief defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e8dfd1] pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === 'products'
              ? 'bg-[#781523] text-white shadow-xs'
              : 'text-[#55463e] hover:bg-[#f2e9dc]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products & Menu ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === 'settings'
              ? 'bg-[#781523] text-white shadow-xs'
              : 'text-[#55463e] hover:bg-[#f2e9dc]'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Store & WhatsApp Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === 'leads'
              ? 'bg-[#781523] text-white shadow-xs'
              : 'text-[#55463e] hover:bg-[#f2e9dc]'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Enquiries & Leads ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === 'database'
              ? 'bg-[#781523] text-white shadow-xs'
              : 'text-[#55463e] hover:bg-[#f2e9dc]'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Neon Database ({neonStatus.connected ? 'Active' : 'Configure'})</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: PRODUCTS MANAGEMENT
      ======================================================== */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#2a0e13]">
              Product Catalogue Listing
            </h2>
            <button
              onClick={handleOpenCreate}
              className="bg-[#781523] hover:bg-[#5c131d] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#e8dfd1] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#443831]">
                <thead className="bg-[#fbf9f4] border-b border-[#e8dfd1] font-bold uppercase tracking-wider text-[11px] text-[#8a7258]">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Vertical</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f2ebd9]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#fdfbf7] transition-colors">
                      <td className="py-3 px-4 flex items-center space-x-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#e8dfd1]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-sm text-[#2a0e13]">{p.name}</div>
                          <div className="text-[11px] text-[#8a7258]">{p.packSizes.join(', ')}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize font-semibold">{p.vertical}</td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4 font-bold text-[#781523]">
                        {p.price ? `₹${p.price} ${p.priceUnit || ''}` : 'On Enquiry'}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => updateProduct(p.id, { isAvailable: !p.isAvailable })}
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-colors ${
                            p.isAvailable
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                          }`}
                        >
                          {p.isAvailable ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{p.isAvailable ? 'Available' : 'Unavailable'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-md hover:bg-amber-100 text-[#781523]"
                          title="Edit Item"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-md hover:bg-red-100 text-red-700"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit / Create Modal Form */}
      {(editingProduct || isCreatingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#e8dfd1] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#f0e9df] pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#2a0e13]">
                {isCreatingProduct ? 'Create New Product' : `Edit: ${editingProduct?.name}`}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsCreatingProduct(false);
                }}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#443831] uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#443831] uppercase mb-1">Business Vertical *</label>
                  <select
                    value={prodForm.vertical}
                    onChange={(e) => setProdForm({ ...prodForm, vertical: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                  >
                    <option value="kitchen">Kitchen</option>
                    <option value="namkeen">Namkeen</option>
                    <option value="mithai">Mithai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#443831] uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                    placeholder="e.g. Traditional Bhujia"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#443831] uppercase mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={prodForm.price || ''}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#443831] uppercase mb-1">Price Unit</label>
                  <input
                    type="text"
                    value={prodForm.priceUnit || ''}
                    onChange={(e) => setProdForm({ ...prodForm, priceUnit: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                    placeholder="e.g. per 500g"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#443831] uppercase mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={prodForm.image}
                  onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block font-bold text-[#443831] uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  value={prodForm.shortDescription}
                  onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-[#443831] uppercase mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#443831] uppercase mb-1">Pack Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={prodForm.packSizes?.join(', ')}
                    onChange={(e) =>
                      setProdForm({
                        ...prodForm,
                        packSizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#443831] uppercase mb-1">Shelf Life</label>
                  <input
                    type="text"
                    value={prodForm.shelfLife || ''}
                    onChange={(e) => setProdForm({ ...prodForm, shelfLife: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                    placeholder="e.g. 6 Months"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isAvailable}
                    onChange={(e) => setProdForm({ ...prodForm, isAvailable: e.target.checked })}
                    className="rounded text-[#781523]"
                  />
                  <span className="font-bold text-[#443831]">Product is Available</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                    className="rounded text-[#781523]"
                  />
                  <span className="font-bold text-[#443831]">Featured on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-[#f0e9df]">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreatingProduct(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#781523] text-white font-bold hover:bg-[#5c131d]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: STORE & WHATSAPP SETTINGS
      ======================================================== */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 sm:p-10 shadow-sm max-w-4xl space-y-6">
          <div className="border-b border-[#f0e9df] pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#2a0e13]">
              Store Contacts & Hero Customization
            </h2>
            <p className="text-xs text-[#8a7258] mt-1">
              Changes update immediately across the header, WhatsApp links, footer, and contact sections.
            </p>
          </div>

          {settingsSaved && (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 font-bold flex items-center space-x-2 animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Settings updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[#443831] mb-1">Official WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm font-mono"
                  placeholder="e.g. 919876543210 (with country code, no + or spaces)"
                />
                <span className="text-[10px] text-[#8a7258] mt-0.5 block">
                  Used for wa.me URL ordering links.
                </span>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#443831] mb-1">Official Phone Number *</label>
                <input
                  type="text"
                  required
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[#443831] mb-1">Official Business Email</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[#443831] mb-1">Business Hours</label>
                <input
                  type="text"
                  value={settingsForm.businessHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-[#443831] mb-1">Physical Business Address</label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-[#443831] mb-1">Kitchen Service Area</label>
                <input
                  type="text"
                  value={settingsForm.kitchenServiceArea}
                  onChange={(e) => setSettingsForm({ ...settingsForm, kitchenServiceArea: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[#443831] mb-1">Delivery Timelines Info</label>
                <input
                  type="text"
                  value={settingsForm.deliveryTimelines}
                  onChange={(e) => setSettingsForm({ ...settingsForm, deliveryTimelines: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-[#443831] mb-1">Homepage Hero Headline</label>
              <input
                type="text"
                value={settingsForm.heroHeadline}
                onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-[#d8c3ad] bg-[#fbf9f4] text-sm"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#781523] hover:bg-[#5c131d] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-xs transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Store Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          TAB 3: LEADS & ENQUIRIES
      ======================================================== */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#2a0e13]">
              Recorded Customer Enquiries ({leads.length})
            </h2>
            <span className="text-xs text-[#8a7258]">
              Leads received from Contact, Bulk Quote, Partnership, and Gifting forms.
            </span>
          </div>

          {leads.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e8dfd1] p-12 text-center text-xs text-[#8a7258]">
              No enquiries received yet. Try submitting a form on the Bulk Orders, Partner With Us, or Contact page.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl border border-[#e8dfd1] p-5 shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f2ebd9] pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#781523] font-bold text-[10px] uppercase">
                        {lead.type.replace('_', ' ')}
                      </span>
                      <span className="font-bold text-sm text-[#2a0e13]">{lead.name}</span>
                      {lead.businessName && (
                        <span className="text-xs text-[#8a7258]">({lead.businessName})</span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#8a7258]">
                      {new Date(lead.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#55463e]">
                    <div>
                      <span className="font-semibold text-[#8a7258] block">Contact:</span>
                      <span>Phone: {lead.phone}</span>
                      {lead.email && <span className="block">Email: {lead.email}</span>}
                    </div>

                    <div>
                      <span className="font-semibold text-[#8a7258] block">Details:</span>
                      {lead.city && <span>Location: {lead.city} {lead.pincode || ''}</span>}
                      {lead.quantity && <span className="block">Quantity: {lead.quantity}</span>}
                    </div>

                    <div>
                      <span className="font-semibold text-[#8a7258] block">Requirement:</span>
                      <span>{lead.orderType || lead.reason || lead.productPreference || 'General'}</span>
                    </div>
                  </div>

                  {lead.message && (
                    <div className="p-3 bg-[#fbf9f4] rounded-lg border border-[#e8dfd1] text-xs text-[#443831]">
                      "{lead.message}"
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#f2ebd9]">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-[11px] text-[#8a7258] font-bold">Status:</span>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="px-2 py-1 rounded-sm border border-[#d8c3ad] bg-white text-[11px]"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="fulfilled">Fulfilled</option>
                      </select>
                    </div>

                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="text-xs text-red-700 hover:text-red-900 font-bold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 4: NEON DATABASE (HTTP SERVERLESS DRIVER)
      ======================================================== */}
      {activeTab === 'database' && (
        <div className="space-y-6 max-w-4xl">
          {/* Status overview card */}
          <div className="bg-white rounded-3xl border border-[#e8dfd1] p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0e9df] pb-5">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
                    <Database className="w-5 h-5 text-teal-700" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#2a0e13]">
                      Neon PostgreSQL Serverless
                    </h2>
                    <p className="text-xs text-[#8a7258]">
                      Configured with @neondatabase/serverless HTTP query driver
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={async () => {
                    setIsDbConnecting(true);
                    await refreshNeonStatus();
                    setIsDbConnecting(false);
                  }}
                  disabled={isDbConnecting}
                  className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isDbConnecting ? 'animate-spin' : ''}`} />
                  <span>Check Status</span>
                </button>
              </div>
            </div>

            {/* Connection Banner */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                neonStatus.connected
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start space-x-3">
                {neonStatus.connected ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-sm">
                    {neonStatus.connected
                      ? 'Connected to Neon PostgreSQL'
                      : 'Neon Database Not Connected (Local Fallback Active)'}
                  </div>
                  <div className="text-xs opacity-90 mt-0.5">{neonStatus.message}</div>
                  {neonStatus.host && (
                    <div className="text-[11px] font-mono mt-1 opacity-75">
                      Host: {neonStatus.host}
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px] bg-white/80 shadow-2xs">
                {neonStatus.connected ? 'HTTP Serverless Active' : 'Standby Mode'}
              </div>
            </div>

            {/* Feedback message banner if user submitted */}
            {dbStatusFeedback && (
              <div
                className={`p-4 rounded-xl border text-xs font-bold flex items-center space-x-2 ${
                  dbStatusFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {dbStatusFeedback.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{dbStatusFeedback.message}</span>
              </div>
            )}

            {/* Form to enter Connection String */}
            <form onSubmit={handleConnectNeon} className="space-y-4 pt-2">
              <div>
                <label className="block font-bold uppercase text-xs text-[#443831] mb-1.5">
                  Neon Connection String (URL)
                </label>
                <div className="relative">
                  <input
                    type={showDbPassword ? 'text' : 'password'}
                    required
                    value={neonConnectionString}
                    onChange={(e) => setNeonConnectionString(e.target.value)}
                    placeholder="postgresql://neondb_owner:npg_xxxx@ep-cool-cloud-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
                    className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-[#d8c3ad] bg-[#fbf9f4] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#781523]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDbPassword(!showDbPassword)}
                    className="absolute right-3 top-3 text-stone-500 hover:text-stone-700"
                    title={showDbPassword ? 'Hide credentials' : 'Show credentials'}
                  >
                    {showDbPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-[#8a7258] mt-1.5 gap-2">
                  <span>
                    Format: <code>postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require</code>
                  </span>
                  <span>Connects over HTTPS via Neon Serverless Driver</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isDbConnecting || !neonConnectionString.trim()}
                  className="bg-[#781523] hover:bg-[#5c131d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl shadow-xs transition-colors flex items-center space-x-2"
                >
                  <Server className="w-4 h-4" />
                  <span>{isDbConnecting ? 'Connecting & Initializing...' : 'Save & Connect to Neon'}</span>
                </button>

                {neonStatus.connected && (
                  <button
                    type="button"
                    onClick={async () => {
                      setIsDbConnecting(true);
                      try {
                        const res = await fetch('/api/neon/init', { method: 'POST' });
                        const data = await res.json();
                        if (res.ok) {
                          setDbStatusFeedback({ type: 'success', message: 'Tables verified and re-initialized in Neon!' });
                        } else {
                          setDbStatusFeedback({ type: 'error', message: data.message || 'Initialization failed' });
                        }
                      } catch (err: any) {
                        setDbStatusFeedback({ type: 'error', message: err.message });
                      } finally {
                        setIsDbConnecting(false);
                      }
                    }}
                    disabled={isDbConnecting}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Re-sync Tables & Products</span>
                  </button>
                )}
              </div>
            </form>

            {/* Architecture Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#f0e9df]">
              <div className="p-4 rounded-xl bg-[#fbf9f4] border border-[#e8dfd1] space-y-1">
                <div className="flex items-center space-x-2 text-[#781523] font-bold text-xs uppercase">
                  <Package className="w-4 h-4" />
                  <span>bika_products</span>
                </div>
                <p className="text-[11px] text-[#8a7258]">
                  Persists all Namkeen, Mithai, Kitchen items, packs, prices & nutrition details.
                </p>
                <div className="text-xs font-bold text-[#2a0e13] pt-1">
                  {products.length} Products in catalog
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf9f4] border border-[#e8dfd1] space-y-1">
                <div className="flex items-center space-x-2 text-[#781523] font-bold text-xs uppercase">
                  <Inbox className="w-4 h-4" />
                  <span>bika_leads</span>
                </div>
                <p className="text-[11px] text-[#8a7258]">
                  Captures corporate gifting inquiries, catering quotes & partnership proposals.
                </p>
                <div className="text-xs font-bold text-[#2a0e13] pt-1">
                  {leads.length} Leads saved
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf9f4] border border-[#e8dfd1] space-y-1">
                <div className="flex items-center space-x-2 text-[#781523] font-bold text-xs uppercase">
                  <Settings className="w-4 h-4" />
                  <span>bika_settings</span>
                </div>
                <p className="text-[11px] text-[#8a7258]">
                  Holds official WhatsApp numbers, call lines, address, and headline copy.
                </p>
                <div className="text-xs font-bold text-[#2a0e13] pt-1">
                  Key: site_settings
                </div>
              </div>
            </div>

            {/* Neon Connection Guide */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs text-[#55463e] space-y-2">
              <div className="font-bold text-[#2a0e13] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>How to get your Neon Connection String (Neon Console Guide):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#6b5847] pl-1">
                <li>Log in to your <strong>Neon Console</strong> (console.neon.tech).</li>
                <li>Select your Bika Bite project, then navigate to <strong>Dashboard</strong>.</li>
                <li>Under <strong>Connection Details</strong>, choose <strong>Postgres / Node.js</strong> or <strong>Connection String</strong>.</li>
                <li>Ensure <strong>Connection string</strong> with <code>?sslmode=require</code> is copied.</li>
                <li>Paste it in the input above and click <strong>Save & Connect to Neon</strong> (or configure <code>DATABASE_URL=...</code> in <code>.env</code>).</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
