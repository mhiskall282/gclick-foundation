const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'src', 'components', 'admin', 'AdminMembers.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

if (!content.includes('import jsPDF')) {
  // Add imports
  content = content.replace("import * as XLSX from 'xlsx';", "import * as XLSX from 'xlsx';\nimport jsPDF from 'jspdf';\nimport autoTable from 'jspdf-autotable';");
}

if (!content.includes('handleExportPDF')) {
  // Add handleExportPDF after handleExport
  const handleExportStr = `  const handleExport = () => {
    try {
      const exportData = members.map(m => ({
        ID: m.id,
        Name: m.name,
        Email: m.email,
        Phone: m.phone,
        Location: m.location,
        Address: m.address,
        Status: m.employment_status,
        Year: m.student_year,
        Motivation: m.background_info,
        'Joined At': new Date(m.joined_at).toLocaleString()
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Members");
      XLSX.writeFile(wb, "gclick_members.xlsx");
      setSuccess('Members exported successfully!');
    } catch (err: any) {
      setError('Failed to export members: ' + err.message);
    }
  };`;

  const handleExportPDFStr = `
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("G-Click Foundation - Members Directory", 14, 15);
      
      const tableColumn = ["Name", "Email", "Phone", "Location", "Status", "Joined"];
      const tableRows = members.map(m => [
        m.name,
        m.email,
        m.phone || 'N/A',
        m.location || 'N/A',
        m.employment_status || 'N/A',
        new Date(m.joined_at).toLocaleDateString()
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });

      doc.save("gclick_members.pdf");
      setSuccess("PDF exported successfully!");
    } catch (err: any) {
      setError('Failed to export PDF: ' + err.message);
    }
  };
`;

  content = content.replace(handleExportStr, handleExportStr + handleExportPDFStr);
}

// Replace buttons
const buttonsHTML = `<button 
            onClick={handleExport}
            className="px-4 py-2 bg-brand-pink text-white rounded-lg flex items-center text-sm font-semibold hover:bg-brand-pink/90 transition-colors shadow-lg shadow-brand-pink/20"
          >
            <Download className="h-4 w-4 mr-2" /> Export to Excel
          </button>`;

const newButtonsHTML = `<button 
            onClick={handleExport}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Download className="h-4 w-4 mr-2" /> Excel
          </button>
          <button 
            onClick={handleExportPDF}
            className="px-4 py-2 bg-brand-pink text-white rounded-lg flex items-center text-sm font-semibold hover:bg-brand-pink/90 transition-colors shadow-lg shadow-brand-pink/20"
          >
            <Download className="h-4 w-4 mr-2" /> PDF
          </button>`;

if (content.includes(buttonsHTML)) {
  content = content.replace(buttonsHTML, newButtonsHTML);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated AdminMembers.tsx for PDF support');
