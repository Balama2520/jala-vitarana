const SPONSOR_URL = "https://docs.google.com/spreadsheets/d/18ehjC2kKxmuiLmCn6FGMor4e-KZSNiOPMuf5HEyCXk8/export?format=csv&gid=0";
const METRIC_URL = "https://docs.google.com/spreadsheets/d/18ehjC2kKxmuiLmCn6FGMor4e-KZSNiOPMuf5HEyCXk8/export?format=csv&gid=1091623245";

// Helper to parse CSV line respecting quotes
const parseCSVLine = (row) => {
    const parts = [];
    let current = '';
    let inQuote = false;
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') { inQuote = !inQuote; }
        else if (char === ',' && !inQuote) { parts.push(current.trim()); current = ''; }
        else { current += char; }
    }
    parts.push(current.trim());
    return parts.map(p => p.replace(/^"|"$/g, '').trim());
};

async function checkSheet(name, url) {
    console.log(`\n--- Checking ${name} Sheet ---`);
    try {
        const res = await fetch(`${url}&t=${Date.now()}`);
        if (!res.ok) {
            console.error(`FAILED: HTTP ${res.status} ${res.statusText}`);
            return;
        }
        const text = await res.text();
        console.log("Raw Response Preview (First 3 lines):");
        console.log(text.split('\n').slice(0, 3).join('\n'));

        const rows = text.split("\n").slice(1);
        console.log(`Total Rows: ${rows.length}`);

        if (rows.length > 0) {
            console.log("Parsed First Row:", parseCSVLine(rows[0]));
        }
    } catch (e) {
        console.error("ERROR:", e.message);
    }
}

async function run() {
    await checkSheet("SPONSORS", SPONSOR_URL);
    await checkSheet("METRICS", METRIC_URL);
}

run();
