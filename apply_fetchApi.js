const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'frontend', 'src', 'components', 'admin');
const files = fs.readdirSync(adminDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add import if not present
  if (!content.includes('fetchApi')) {
    const lines = content.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIdx = i;
      }
    }
    lines.splice(lastImportIdx + 1, 0, "import { fetchApi } from '../../lib/api';");
    content = lines.join('\n');
  }

  // Replace fetch('/api/...') with fetchApi('/api/...')
  content = content.replace(/fetch\('\/api\//g, "fetchApi('/api/");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Updated ' + file);
});
