// Script to clean up project images: remove duplicate URLs and images that likely contain people
// Usage: node clean-images.js

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');
const { getFallbackImage } = require('./src/lib/fallback-images');

// Paths to CSV files (adjust if needed)
const csvFiles = [
  path.join('src', 'developer_projects_noida_greater_noida.csv'),
  path.join('src', 'project-details.csv'),
];// Helper to detect if an image URL likely contains a person
function isPersonImage(url) {
  const lowered = (url || '').toLowerCase();
  const personKeywords = ['people', 'person', 'portrait', 'model', 'woman', 'man', 'family', 'group'];
  return personKeywords.some((kw) => lowered.includes(kw));
}

// Helper to detect if an image URL likely contains a watermark or overlaid text/logo
function isWatermarkImage(url) {
  const lowered = (url || '').toLowerCase();
  const watermarkKeywords = ['watermark', 'logo', 'text', 'branding', 'overlay', 'stamp'];
  return watermarkKeywords.some((kw) => lowered.includes(kw));
}
// Process each CSV file
csvFiles.forEach((csvPath) => {
  if (!fs.existsSync(csvPath)) {
    console.warn(`File not found: ${csvPath}`);
    return;
  }
  const raw = fs.readFileSync(csvPath, 'utf8');
  const records = parse(raw, { columns: true, skip_empty_lines: true });

  const seenUrls = new Set();
  for (const rec of records) {
    const originalUrl = rec['Image URL'] || rec['image url'] || rec['image'];
    if (originalUrl) {
      const url = originalUrl.trim();
      // Duplicate detection
      const isDuplicate = seenUrls.has(url);
      // Person detection
      const hasPerson = isPersonImage(url);
      if (isDuplicate || hasPerson) {
        // Replace with a deterministic fallback based on project slug or name
        const slug = rec['Slug'] || rec['slug'] || rec['Project Name'] || rec['project name'] || '';
        rec['Image URL'] = getFallbackImage(slug);
      } else {
        seenUrls.add(url);
      }
    } else {
      // No image at all – assign fallback
      const slug = rec['Slug'] || rec['slug'] || rec['Project Name'] || rec['project name'] || '';
      rec['Image URL'] = getFallbackImage(slug);
    }
  }

  // Write back to CSV (preserve original order of columns)
  const columns = Object.keys(records[0] || {});
  const output = stringify(records, { header: true, columns });
  fs.writeFileSync(csvPath, output, 'utf8');
  console.log(`Cleaned images in ${csvPath}`);
});
