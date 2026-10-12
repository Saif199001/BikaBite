import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BusinessSettings, FAQItem, LeadSubmission } from '../types';
import { initialProducts, initialBusinessSettings, initialFAQs } from '../data/initialData';

export interface NeonStatus {
  connected: boolean;
  configured: boolean;
  host: string | null;
  message: string;
}

interface AppContextType {
  products: Product[];
  settings: BusinessSettings;
  faqs: FAQItem[];
  leads: LeadSubmission[];
  neonStatus: NeonStatus;
  currentRoute: string;
  selectedProductId: string | null;
  navigateTo: (route: string, productId?: string) => void;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<BusinessSettings>) => Promise<void>;
  submitLead: (lead: Omit<LeadSubmission, 'id' | 'timestamp' | 'status'>) => Promise<boolean>;
  updateLeadStatus: (id: string, status: LeadSubmission['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  refreshNeonStatus: () => Promise<void>;
  configureNeon: (connectionString: string) => Promise<{ success: boolean; message: string; host?: string }>;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bikabite_products');
      if (!saved) return initialProducts;
      const parsed: Product[] = JSON.parse(saved);
      return parsed.map((p) => {
        const found = initialProducts.find((ip) => ip.id === p.id);
        if (found && found.image.startsWith('/src/assets/images/')) {
          return { ...p, image: found.image };
        }
        return p;
      });
    } catch {
      return initialProducts;
    }
  });

  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem('bikabite_settings');
      return saved ? JSON.parse(saved) : initialBusinessSettings;
    } catch {
      return initialBusinessSettings;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('bikabite_faqs');
      return saved ? JSON.parse(saved) : initialFAQs;
    } catch {
      return initialFAQs;
    }
  });

  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('bikabite_leads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [neonStatus, setNeonStatus] = useState<NeonStatus>({
    connected: false,
    configured: false,
    host: null,
    message: 'Checking Neon Database connection...',
  });

  // Client-side route handling
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Sync state to backend & localStorage
  const refreshNeonStatus = async () => {
    try {
      const res = await fetch('/api/neon/status');
      if (res.ok) {
        const data = await res.json();
        setNeonStatus({
          connected: Boolean(data.connected),
          configured: Boolean(data.configured),
          host: data.host || null,
          message: data.message || 'Status retrieved',
        });
      }
    } catch {
      setNeonStatus({
        connected: false,
        configured: false,
        host: null,
        message: 'Backend server starting or offline.',
      });
    }
  };

  const configureNeon = async (connectionString: string): Promise<{ success: boolean; message: string; host?: string }> => {
    try {
      const res = await fetch('/api/neon/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionString }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await refreshNeonStatus();
        await loadBackendData();
        return { success: true, message: data.message, host: data.host };
      } else {
        return { success: false, message: data.message || 'Connection failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Network request failed' };
    }
  };

  const loadBackendData = async () => {
    try {
      await refreshNeonStatus();

      // Fetch products
      const pRes = await fetch('/api/products');
      if (pRes.ok) {
        const pData = await pRes.json();
        if (Array.isArray(pData) && pData.length > 0) {
          setProducts(pData);
          localStorage.setItem('bikabite_products', JSON.stringify(pData));
        }
      }

      // Fetch leads
      const lRes = await fetch('/api/leads');
      if (lRes.ok) {
        const lData = await lRes.json();
        if (Array.isArray(lData)) {
          setLeads(lData);
          localStorage.setItem('bikabite_leads', JSON.stringify(lData));
        }
      }

      // Fetch settings
      const sRes = await fetch('/api/settings');
      if (sRes.ok) {
        const sData = await sRes.json();
        if (sData && sData.brandName) {
          setSettings(sData);
          localStorage.setItem('bikabite_settings', JSON.stringify(sData));
        }
      }
    } catch (err) {
      console.warn('Initial data load from /api/ failed, using local fallback:', err);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('bikabite_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bikabite_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('bikabite_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('bikabite_leads', JSON.stringify(leads));
  }, [leads]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('product/')) {
        const id = hash.replace('product/', '');
        setSelectedProductId(id);
        setCurrentRoute('product-detail');
      } else {
        setCurrentRoute(hash);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (route: string, productId?: string) => {
    if (productId) {
      window.location.hash = `product/${productId}`;
    } else {
      window.location.hash = route;
    }
    window.scrollTo(0, 0);
  };

  const addProduct = async (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      });
    } catch (err) {
      console.warn('Failed to sync new product to backend:', err);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    let updatedProduct: Product | undefined;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updatedProduct = { ...p, ...updates };
          return updatedProduct;
        }
        return p;
      })
    );
    if (updatedProduct) {
      try {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        });
      } catch (err) {
        console.warn('Failed to sync updated product to backend:', err);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete product from backend:', err);
    }
  };

  const updateSettings = async (newSettings: Partial<BusinessSettings>) => {
    const full = { ...settings, ...newSettings };
    setSettings(full);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(full),
      });
    } catch (err) {
      console.warn('Failed to save settings to backend:', err);
    }
  };

  const submitLead = async (leadData: Omit<LeadSubmission, 'id' | 'timestamp' | 'status'>): Promise<boolean> => {
    const newLead: LeadSubmission = {
      ...leadData,
      id: 'lead-' + Date.now(),
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    setLeads((prev) => [newLead, ...prev]);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
    } catch (err) {
      console.warn('Failed to save lead to backend:', err);
    }
    return true;
  };

  const updateLeadStatus = async (id: string, status: LeadSubmission['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.warn('Failed to update lead status on backend:', err);
    }
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete lead on backend:', err);
    }
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setSettings(initialBusinessSettings);
    setFaqs(initialFAQs);
    localStorage.removeItem('bikabite_products');
    localStorage.removeItem('bikabite_settings');
    localStorage.removeItem('bikabite_faqs');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        settings,
        faqs,
        leads,
        neonStatus,
        currentRoute,
        selectedProductId,
        navigateTo,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        submitLead,
        updateLeadStatus,
        deleteLead,
        refreshNeonStatus,
        configureNeon,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
