import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { initialProducts, initialBusinessSettings } from '../data/initialData';
import { Product, LeadSubmission, BusinessSettings } from '../types';

dotenv.config();

let currentDbUrl: string | undefined = process.env.DATABASE_URL;
let sqlClient: ReturnType<typeof neon> | null = null;
let isInitialized = false;

export function getSqlClient() {
  const envUrl = process.env.DATABASE_URL?.trim();
  if (envUrl && envUrl !== currentDbUrl) {
    currentDbUrl = envUrl;
    sqlClient = null;
    isInitialized = false;
  }

  if (!sqlClient && currentDbUrl && currentDbUrl !== '') {
    try {
      sqlClient = neon(currentDbUrl);
    } catch (err) {
      console.warn('[Neon DB] Could not initialize SQL client:', err);
    }
  }
  return sqlClient;
}

export function getNeonDatabaseInfo() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    return {
      configured: false,
      host: null,
      database: null,
    };
  }
  try {
    const parsed = new URL(url);
    return {
      configured: true,
      host: parsed.hostname,
      database: parsed.pathname.replace(/^\//, ''),
    };
  } catch {
    return {
      configured: true,
      host: 'Configured (custom format)',
      database: null,
    };
  }
}

export async function checkNeonConnection(): Promise<{
  connected: boolean;
  message: string;
  configured: boolean;
  host: string | null;
}> {
  const info = getNeonDatabaseInfo();
  const client = getSqlClient();
  if (!client) {
    return {
      connected: false,
      configured: false,
      host: null,
      message: 'DATABASE_URL not set in .env. Running with local storage fallback.',
    };
  }
  try {
    const result = (await client`SELECT 1 as connected;`) as any[];
    if (result && Array.isArray(result) && result.length > 0) {
      return {
        connected: true,
        configured: true,
        host: info.host,
        message: 'Successfully connected to Neon PostgreSQL over HTTP Serverless Driver.',
      };
    }
    return {
      connected: false,
      configured: true,
      host: info.host,
      message: 'Connected but received unexpected response from Neon.',
    };
  } catch (error: any) {
    console.error('[Neon DB] Connection check failed:', error.message);
    return {
      connected: false,
      configured: true,
      host: info.host,
      message: error.message || 'Connection failed',
    };
  }
}

export async function initNeonDatabase() {
  const client = getSqlClient();
  if (!client) {
    console.log('[Neon DB] Skipped database table initialization (DATABASE_URL is not set).');
    return;
  }

  if (isInitialized) return;

  try {
    console.log('[Neon DB] Initializing tables if they do not exist...');

    // 1. Products table
    await client`
      CREATE TABLE IF NOT EXISTS bika_products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        vertical VARCHAR(50) NOT NULL,
        category VARCHAR(100) NOT NULL,
        short_description TEXT,
        description TEXT,
        image TEXT NOT NULL,
        pack_sizes JSONB DEFAULT '[]'::jsonb,
        serving_info VARCHAR(255),
        price NUMERIC,
        price_unit VARCHAR(100),
        is_available BOOLEAN DEFAULT TRUE,
        is_featured BOOLEAN DEFAULT FALSE,
        ingredients JSONB DEFAULT '[]'::jsonb,
        allergens TEXT,
        storage_instructions TEXT,
        shelf_life VARCHAR(100),
        nutrition_info JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Leads / Enquiries table
    await client`
      CREATE TABLE IF NOT EXISTS bika_leads (
        id VARCHAR(100) PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        business_name VARCHAR(255),
        business_type VARCHAR(100),
        city VARCHAR(100),
        pincode VARCHAR(20),
        order_type VARCHAR(100),
        product_preference TEXT,
        quantity VARCHAR(100),
        required_date VARCHAR(100),
        budget VARCHAR(100),
        reason VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Settings table
    await client`
      CREATE TABLE IF NOT EXISTS bika_settings (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed products if table is empty
    const countResult = (await client`SELECT COUNT(*)::int as count FROM bika_products;`) as any[];
    if (countResult && countResult[0]?.count === 0) {
      console.log('[Neon DB] Seeding initial Bika Bite products into Neon...');
      for (const p of initialProducts) {
        await client`
          INSERT INTO bika_products (
            id, name, vertical, category, short_description, description,
            image, pack_sizes, serving_info, price, price_unit, is_available,
            is_featured, ingredients, allergens, storage_instructions, shelf_life, nutrition_info
          ) VALUES (
            ${p.id}, ${p.name}, ${p.vertical}, ${p.category}, ${p.shortDescription}, ${p.description},
            ${p.image}, ${JSON.stringify(p.packSizes)}, ${p.servingInfo || null}, ${p.price || null},
            ${p.priceUnit || null}, ${p.isAvailable}, ${p.isFeatured || false},
            ${JSON.stringify(p.ingredients || [])}, ${p.allergens || null},
            ${p.storageInstructions || null}, ${p.shelfLife || null}, ${JSON.stringify(p.nutritionInfo || {})}
          ) ON CONFLICT (id) DO NOTHING;
        `;
      }
    }

    // Seed settings if not present
    const settingsCheck = (await client`SELECT 1 FROM bika_settings WHERE key = 'site_settings';`) as any[];
    if (!settingsCheck || settingsCheck.length === 0) {
      await client`
        INSERT INTO bika_settings (key, value)
        VALUES ('site_settings', ${JSON.stringify(initialBusinessSettings)})
        ON CONFLICT (key) DO NOTHING;
      `;
    }

    isInitialized = true;
    console.log('[Neon DB] Database initialized and verified successfully!');
  } catch (error: any) {
    console.error('[Neon DB] Error initializing tables:', error.message);
  }
}

// Database Helpers

export async function dbGetProducts(): Promise<Product[]> {
  const client = getSqlClient();
  if (!client) return initialProducts;

  try {
    const rows = (await client`SELECT * FROM bika_products ORDER BY created_at ASC;`) as any[];
    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      vertical: r.vertical,
      category: r.category,
      shortDescription: r.short_description || '',
      description: r.description || '',
      image: r.image,
      packSizes: typeof r.pack_sizes === 'string' ? JSON.parse(r.pack_sizes) : r.pack_sizes || [],
      servingInfo: r.serving_info || undefined,
      price: r.price ? Number(r.price) : undefined,
      priceUnit: r.price_unit || undefined,
      isAvailable: Boolean(r.is_available),
      isFeatured: Boolean(r.is_featured),
      ingredients: typeof r.ingredients === 'string' ? JSON.parse(r.ingredients) : r.ingredients || [],
      allergens: r.allergens || undefined,
      storageInstructions: r.storage_instructions || undefined,
      shelfLife: r.shelf_life || undefined,
      nutritionInfo: typeof r.nutrition_info === 'string' ? JSON.parse(r.nutrition_info) : r.nutrition_info || undefined,
    }));
  } catch (err) {
    console.warn('[Neon DB] Failed to fetch products from Neon, using memory:', err);
    return initialProducts;
  }
}

export async function dbSaveProduct(product: Product) {
  const client = getSqlClient();
  if (!client) return product;

  try {
    await client`
      INSERT INTO bika_products (
        id, name, vertical, category, short_description, description,
        image, pack_sizes, serving_info, price, price_unit, is_available,
        is_featured, ingredients, allergens, storage_instructions, shelf_life, nutrition_info
      ) VALUES (
        ${product.id}, ${product.name}, ${product.vertical}, ${product.category},
        ${product.shortDescription}, ${product.description}, ${product.image},
        ${JSON.stringify(product.packSizes)}, ${product.servingInfo || null},
        ${product.price || null}, ${product.priceUnit || null}, ${product.isAvailable},
        ${product.isFeatured || false}, ${JSON.stringify(product.ingredients || [])},
        ${product.allergens || null}, ${product.storageInstructions || null},
        ${product.shelfLife || null}, ${JSON.stringify(product.nutritionInfo || {})}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        vertical = EXCLUDED.vertical,
        category = EXCLUDED.category,
        short_description = EXCLUDED.short_description,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        pack_sizes = EXCLUDED.pack_sizes,
        serving_info = EXCLUDED.serving_info,
        price = EXCLUDED.price,
        price_unit = EXCLUDED.price_unit,
        is_available = EXCLUDED.is_available,
        is_featured = EXCLUDED.is_featured,
        ingredients = EXCLUDED.ingredients,
        allergens = EXCLUDED.allergens,
        storage_instructions = EXCLUDED.storage_instructions,
        shelf_life = EXCLUDED.shelf_life,
        nutrition_info = EXCLUDED.nutrition_info;
    `;
    return product;
  } catch (err) {
    console.error('[Neon DB] Error saving product:', err);
    throw err;
  }
}

export async function dbDeleteProduct(id: string) {
  const client = getSqlClient();
  if (!client) return true;

  try {
    await client`DELETE FROM bika_products WHERE id = ${id};`;
    return true;
  } catch (err) {
    console.error('[Neon DB] Error deleting product:', err);
    throw err;
  }
}

export async function dbGetLeads(): Promise<LeadSubmission[]> {
  const client = getSqlClient();
  if (!client) return [];

  try {
    const rows = (await client`SELECT * FROM bika_leads ORDER BY timestamp DESC;`) as any[];
    return rows.map((r: any) => ({
      id: r.id,
      type: r.type,
      timestamp: new Date(r.timestamp).toISOString(),
      name: r.name,
      phone: r.phone,
      email: r.email || undefined,
      businessName: r.business_name || undefined,
      businessType: r.business_type || undefined,
      city: r.city || undefined,
      pincode: r.pincode || undefined,
      orderType: r.order_type || undefined,
      productPreference: r.product_preference || undefined,
      quantity: r.quantity || undefined,
      requiredDate: r.required_date || undefined,
      budget: r.budget || undefined,
      reason: r.reason || undefined,
      message: r.message || undefined,
      status: r.status || 'new',
    }));
  } catch (err) {
    console.warn('[Neon DB] Failed to fetch leads from Neon:', err);
    return [];
  }
}

export async function dbSaveLead(lead: LeadSubmission) {
  const client = getSqlClient();
  if (!client) return lead;

  try {
    await client`
      INSERT INTO bika_leads (
        id, type, name, phone, email, business_name, business_type,
        city, pincode, order_type, product_preference, quantity,
        required_date, budget, reason, message, status
      ) VALUES (
        ${lead.id}, ${lead.type}, ${lead.name}, ${lead.phone}, ${lead.email || null},
        ${lead.businessName || null}, ${lead.businessType || null}, ${lead.city || null},
        ${lead.pincode || null}, ${lead.orderType || null}, ${lead.productPreference || null},
        ${lead.quantity || null}, ${lead.requiredDate || null}, ${lead.budget || null},
        ${lead.reason || null}, ${lead.message || null}, ${lead.status || 'new'}
      );
    `;
    return lead;
  } catch (err) {
    console.error('[Neon DB] Error saving lead to Neon:', err);
    throw err;
  }
}

export async function dbUpdateLeadStatus(id: string, status: LeadSubmission['status']) {
  const client = getSqlClient();
  if (!client) return true;

  try {
    await client`UPDATE bika_leads SET status = ${status} WHERE id = ${id};`;
    return true;
  } catch (err) {
    console.error('[Neon DB] Error updating lead status:', err);
    throw err;
  }
}

export async function dbDeleteLead(id: string) {
  const client = getSqlClient();
  if (!client) return true;

  try {
    await client`DELETE FROM bika_leads WHERE id = ${id};`;
    return true;
  } catch (err) {
    console.error('[Neon DB] Error deleting lead:', err);
    throw err;
  }
}

export async function dbGetSettings(): Promise<BusinessSettings> {
  const client = getSqlClient();
  if (!client) return initialBusinessSettings;

  try {
    const rows = (await client`SELECT value FROM bika_settings WHERE key = 'site_settings';`) as any[];
    if (rows && rows.length && rows[0]?.value) {
      const val = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : rows[0].value;
      return { ...initialBusinessSettings, ...val };
    }
    return initialBusinessSettings;
  } catch (err) {
    console.warn('[Neon DB] Failed to fetch settings, using defaults:', err);
    return initialBusinessSettings;
  }
}

export async function dbSaveSettings(settings: BusinessSettings) {
  const client = getSqlClient();
  if (!client) return settings;

  try {
    await client`
      INSERT INTO bika_settings (key, value, updated_at)
      VALUES ('site_settings', ${JSON.stringify(settings)}, CURRENT_TIMESTAMP)
      ON CONFLICT (key) DO UPDATE SET
        value = EXCLUDED.value,
        updated_at = CURRENT_TIMESTAMP;
    `;
    return settings;
  } catch (err) {
    console.error('[Neon DB] Error saving settings:', err);
    throw err;
  }
}
