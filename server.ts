import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {
  initNeonDatabase,
  checkNeonConnection,
  getNeonDatabaseInfo,
  dbGetProducts,
  dbSaveProduct,
  dbDeleteProduct,
  dbGetLeads,
  dbSaveLead,
  dbUpdateLeadStatus,
  dbDeleteLead,
  dbGetSettings,
  dbSaveSettings,
} from './src/db/neon';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoints for Neon Database

app.get('/api/health', async (_req, res) => {
  try {
    const dbStatus = await checkNeonConnection();
    res.json({ status: 'ok', neon: dbStatus });
  } catch (err: any) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

app.get('/api/neon/status', async (_req, res) => {
  try {
    const dbStatus = await checkNeonConnection();
    res.json(dbStatus);
  } catch (err: any) {
    res.status(500).json({ connected: false, configured: false, host: null, message: err.message });
  }
});

app.post('/api/neon/configure', async (req, res) => {
  try {
    const { connectionString } = req.body;
    if (!connectionString || typeof connectionString !== 'string' || !connectionString.trim()) {
      return res.status(400).json({ success: false, message: 'connectionString is required' });
    }
    const cleanUrl = connectionString.trim();

    // Test connection with Neon HTTP serverless driver
    const { neon } = await import('@neondatabase/serverless');
    const testSql = neon(cleanUrl);
    const testResult = (await testSql`SELECT 1 as connected;`) as any[];
    if (!testResult || !Array.isArray(testResult) || !testResult.length) {
      throw new Error('Connection verification query failed.');
    }

    // Set process env
    process.env.DATABASE_URL = cleanUrl;

    // Update .env file
    const envFilePath = path.resolve(__dirname, '.env');
    let envContent = '';
    if (fs.existsSync(envFilePath)) {
      envContent = fs.readFileSync(envFilePath, 'utf8');
      if (/^DATABASE_URL=.*$/m.test(envContent)) {
        envContent = envContent.replace(/^DATABASE_URL=.*$/m, `DATABASE_URL=${cleanUrl}`);
      } else {
        envContent += `\nDATABASE_URL=${cleanUrl}\n`;
      }
    } else {
      envContent = `DATABASE_URL=${cleanUrl}\nPORT=3000\n`;
    }
    fs.writeFileSync(envFilePath, envContent, 'utf8');

    // Run table initialization and migrations
    await initNeonDatabase();

    const info = getNeonDatabaseInfo();
    return res.json({
      success: true,
      message: 'Connected to Neon PostgreSQL database! All tables created & initialized.',
      host: info.host,
    });
  } catch (err: any) {
    console.error('[Neon DB Configure Error]', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to connect to Neon database',
    });
  }
});

app.post('/api/neon/init', async (_req, res) => {
  try {
    await initNeonDatabase();
    res.json({ success: true, message: 'Neon tables initialized successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/products', async (_req, res) => {
  try {
    const products = await dbGetProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await dbSaveProduct(req.body);
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await dbDeleteProduct(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/leads', async (_req, res) => {
  try {
    const leads = await dbGetLeads();
    res.json(leads);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const lead = await dbSaveLead(req.body);
    res.json(lead);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/leads/:id', async (req, res) => {
  try {
    await dbUpdateLeadStatus(req.params.id, req.body.status);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    await dbDeleteLead(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/settings', async (_req, res) => {
  try {
    const settings = await dbGetSettings();
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const settings = await dbSaveSettings(req.body);
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// In production, check if client dist exists, otherwise use Vite middleware
const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'dist');

if (isProduction && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`[Bika Bite] Full-stack Server listening on http://0.0.0.0:${PORT}`);
  // Initialize Neon database tables asynchronously
  try {
    await initNeonDatabase();
  } catch (err) {
    console.warn('[Bika Bite] Neon initialization notice:', err);
  }
});
