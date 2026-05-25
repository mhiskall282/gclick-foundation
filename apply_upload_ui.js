const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'frontend', 'src', 'components', 'admin');

function injectUploadLogic(filename, stateName, setterName) {
  const filePath = path.join(adminDir, filename);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add Upload icon
  if (!content.includes('Upload } from')) {
    content = content.replace(/} from 'lucide-react';/, ", Upload } from 'lucide-react';");
  }

  // Add upload state and handler right before fetch* function
  const fetchFnMatch = content.match(/const fetch[A-Z][a-zA-Z]+ = async/);
  if (fetchFnMatch && !content.includes('isUploading')) {
    const handler = `
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetchApi('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      ${setterName}({ ...${stateName}, image: data.url });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  `;
    content = content.replace(fetchFnMatch[0], handler + fetchFnMatch[0]);
  }

  // Replace text input with file input
  // E.g. <label className="...">Image URL</label> <input type="text" value={currentProgram.image} ... />
  // We can just look for `Image URL</label>` and replace it and the next line
  const imageRegex = /<label className="block text-xs font-semibold text-gray-400 mb-1">Image URL<\/label>\s*<input required type="text" value=\{[a-zA-Z.]+\} onChange=\{e => [a-zA-Z]+\(\{\.\.\.[a-zA-Z]+, image: e\.target\.value\}\)\} className="[^"]+" \/>/;
  
  if (imageRegex.test(content)) {
    const replacement = `<label className="block text-xs font-semibold text-gray-400 mb-1">Image Upload</label>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-brand-dark-obsidian border border-brand-dark-border rounded-lg px-3 py-2 text-sm focus:border-brand-pink outline-none" />
                {isUploading && <span className="text-xs text-brand-pink animate-pulse">Uploading...</span>}
              </div>
              {${stateName}.image && (
                <div className="mt-2 text-xs text-gray-400 truncate">
                  Current: <a href={${stateName}.image} target="_blank" rel="noreferrer" className="text-brand-pink hover:underline">{${stateName}.image}</a>
                </div>
              )}`;
    content = content.replace(imageRegex, replacement);
  } else {
    console.log('Regex not matched for ' + filename);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Updated ' + filename);
}

injectUploadLogic('AdminPrograms.tsx', 'currentProgram', 'setCurrentProgram');
injectUploadLogic('AdminBlog.tsx', 'currentPost', 'setCurrentPost');
injectUploadLogic('AdminLeadership.tsx', 'currentMember', 'setCurrentMember');
injectUploadLogic('AdminNews.tsx', 'currentNews', 'setCurrentNews');
