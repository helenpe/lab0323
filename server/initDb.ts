import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PLATFORM_PAGE_CONFIG } from '../src/context/platform/platform-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db.json');

// Convert products record to an array of objects or keep it as an object
// We will store it as an array to make standard REST CRUD easier
const solutionsArray = Object.entries(PLATFORM_PAGE_CONFIG.products).map(([key, value]) => ({
  id: key, // Use key as ID (e.g., "AI Portal")
  ...value
}));

const initialData = {
  solutions: solutionsArray
};

fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
console.log('db.json has been initialized at', dbPath);
