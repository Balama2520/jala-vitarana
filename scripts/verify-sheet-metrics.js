const SHEET_ID = "2PACX-1vS-MHKocKYrzYC_JvjR-DYyfc29Bmjw7XjlSu42F6vTrbXWf6iB8x7rDf7QVeUVMoV6XFzAr5LXR2og";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

async function verifySheet() {
    try {
        console.log("Fetching sheet from:", SHEET_URL);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to fetch");

        const csvText = await response.text();
        console.log("\n--- RAW CSV PREVIEW (First 5 lines) ---");
        console.log(csvText.split('\n').slice(0, 5).join('\n'));

        const rows = csvText.split("\n").slice(1); // Skip header
        const sponsors = [];
        const stats = {
            dailyGoal: 0,
            totalDistributed: 0,
            totalRevenue: 0,
            activeCities: []
        };

        rows.forEach(row => {
            // Regex to handle quoted CSV values
            const regex = /(?:,|\n|^)("(?:(?!"").)*"|[^",\n]*|(?:\n|$))/g;
            const parts = [];

            // Simple robust parse (mimicking component logic)
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
            parts.push(current.trim());

            const cols = parts.map(p => p.replace(/^"|"$/g, '').trim());
            if (!cols[0]) return;

            if (cols[0].startsWith('METRIC')) {
                console.log("\nFound METRIC row:", cols);
                const key = cols[1];
                const val = cols[2];
                if (key === 'DailyGoal') stats.dailyGoal = parseInt(val.replace(/,/g, '')) || 0;
                if (key === 'TotalDistributed') stats.totalDistributed = parseInt(val.replace(/,/g, '')) || 0;
                if (key === 'TotalRevenue') stats.totalRevenue = parseInt(val.replace(/,/g, '')) || 0;
                if (key === 'ActiveCities') stats.activeCities = val.split(';').map(c => c.trim());
            } else {
                // Sponsor Row
                sponsors.push({
                    name: cols[0],
                    bottles: cols[1],
                    cities: cols[2],
                    message: cols[3],
                    logo: cols[4]
                });
            }
        });

        console.log("\n--- PARSED RESULTS ---");
        console.log("Stats:", JSON.stringify(stats, null, 2));
        console.log("Sponsors Count:", sponsors.length);
        if (sponsors.length > 0) console.log("First Sponsor:", sponsors[0]);

        if (stats.dailyGoal === 0 && sponsors.length > 0) {
            console.log("\n[WARNING] No Metrics found (dailyGoal is 0). This is expected if the user hasn't added METRIC rows yet.");
        } else if (stats.dailyGoal > 0) {
            console.log("\n[SUCCESS] Metrics found and parsed!");
        }

    } catch (err) {
        console.error("Error:", err);
    }
}

verifySheet();
