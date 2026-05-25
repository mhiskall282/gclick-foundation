const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.ts') && f !== 'auth.ts' && f !== 'upload.ts');

files.forEach(file => {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (!content.includes('verifyToken')) {
    // Add import after the last import statement
    const lines = content.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIdx = i;
      }
    }
    lines.splice(lastImportIdx + 1, 0, "import { verifyToken } from '../middleware/auth';");
    content = lines.join('\n');

    // Add verifyToken to POST, PUT, DELETE
    content = content.replace(/router\.post\('\/', async/g, "router.post('/', verifyToken, async");
    content = content.replace(/router\.post\('\/bulk', async/g, "router.post('/bulk', verifyToken, async");
    content = content.replace(/router\.put\('\/:id', async/g, "router.put('/:id', verifyToken, async");
    content = content.replace(/router\.delete\('\/:id', async/g, "router.delete('/:id', verifyToken, async");

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated ' + file);
  }
});
