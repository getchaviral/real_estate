const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');
const { GOOGLE_IMG_SCRAP } = require('google-img-scrap');

const csvFiles = [
  path.join(__dirname, 'src', 'developer_projects_noida_greater_noida.csv'),
  path.join(__dirname, 'project-details.csv'),
];

async function processCSV(csvPath) {
  if (!fs.existsSync(csvPath)) {
    console.log(`CSV file not found: ${csvPath}`);
    return;
  }
  
  console.log(`\nProcessing ${csvPath}...`);
  const content = fs.readFileSync(csvPath, 'utf8');
  const records = parse(content, { columns: true, skip_empty_lines: true });

  if (records.length === 0) return;

  const headers = Object.keys(records[0]);
  if (!headers.includes('Image URL')) {
    headers.push('Image URL');
  }

  let modified = false;

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    
    const projectName = record['Project Name'] || '';
    const location = record['Location (Sector / Area)'] || '';
    const currentImg = record['Image URL'] || '';
    
    if (!projectName) continue;

    // Only process if the image is missing
    if (currentImg && currentImg.trim() !== '') {
       continue;
    }

    console.log(`[${i + 1}/${records.length}] Searching missing image for: ${projectName}`);
    
    try {
      // Much more lenient query to guarantee we find *something*
      const searchQuery = `${projectName} ${location} exterior`;

      let res = await GOOGLE_IMG_SCRAP({
        search: searchQuery,
        limit: 10
      });

      let imgUrl = null;
      
      const getValidUrl = (results) => {
        if (!results) return null;
        for (const img of results) {
           if (img.url) {
             // Basic filter to avoid completely broken links
             return img.url;
           }
        }
        return null;
      };

      imgUrl = getValidUrl(res.result);

      if (!imgUrl) {
        // Fallback search to just the location real estate
        res = await GOOGLE_IMG_SCRAP({
          search: `${location} luxury real estate`,
          limit: 5
        });
        imgUrl = getValidUrl(res.result);
      }

      if (imgUrl) {
        record['Image URL'] = imgUrl;
        modified = true;
        console.log(`Found image: ${imgUrl}`);
      } else {
        console.log(`STILL no image found.`);
      }

      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`Error searching image for ${projectName}:`, err.message);
    }
  }

  if (modified) {
    const newCsv = stringify(records, { header: true, columns: headers });
    fs.writeFileSync(csvPath, newCsv, 'utf8');
    console.log(`Updated ${csvPath} successfully.`);
  } else {
    console.log(`No updates needed for ${csvPath}.`);
  }
}

async function runAll() {
  for (const f of csvFiles) {
    await processCSV(f);
  }
}

runAll().catch(console.error);
