const INVESTOR_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-MHKocKYrzYC_JvjR-DYyfc29Bmjw7XjlSu42F6vTrbXWf6iB8x7rDf7QVeUVMoV6XFzAr5LXR2og/pub?output=csv";

async function testFetch() {
    console.log("Fetching from:", INVESTOR_SHEET_URL);
    try {
        const response = await fetch(`${INVESTOR_SHEET_URL}&t=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);

        const csvText = await response.text();
        console.log("\n--- Raw CSV Start ---");
        console.log(csvText.slice(0, 500));
        console.log("--- Raw CSV End ---\n");

        const rows = csvText.split("\n").slice(1);
        console.log(`Found ${rows.length} rows (excluding header).`);

        const parsed = rows.map((row, index) => {
            // Simple robust parse for this specific single line:
            const parts = [];
            let current = '';
            let inQuote = false;
            for (let i = 0; i < row.length; i++) {
                const char = row[i];
                if (char === '"') {
                    inQuote = !inQuote;
                } else if (char === ',' && !inQuote) {
                    parts.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            if (current) parts.push(current.trim()); // Push last part

            const [name, amount, location, message, logo] = parts.map(p => p && p.replace(/^"|"$/g, '').trim());

            if (!name) return null;
            return { index, name, amount, location, message, logo };
        }).filter(Boolean);

        console.log("\n--- Parsed Data ---");
        console.log(JSON.stringify(parsed, null, 2));

    } catch (error) {
        console.error("Error:", error);
    }
}

testFetch();
