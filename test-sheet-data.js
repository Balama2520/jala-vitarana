// Test script to verify Google Sheets data fetching
async function testSheetData() {
    const SPREADSHEET_ID = "1alWxQUJek4wzfSqe22Dx3yX--0Fmu2n2M5rTskkh3m8";
    const SPONSOR_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;
    const METRICS_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1054657188`;

    console.log("Testing direct fetch...");

    try {
        const response = await fetch(SPONSOR_SHEET_URL);
        const text = await response.text();
        console.log("Sponsor Sheet Data (first 500 chars):");
        console.log(text.substring(0, 500));
        console.log("\n\nRow count:", text.split("\n").length);
    } catch (error) {
        console.error("Direct fetch failed:", error);
    }

    console.log("\n\nTesting via proxy API route...");
    try {
        const proxyResponse = await fetch(`/api/sheet-proxy?url=${encodeURIComponent(SPONSOR_SHEET_URL)}&t=${Date.now()}`);
        const proxyText = await proxyResponse.text();
        console.log("Proxy Response (first 500 chars):");
        console.log(proxyText.substring(0, 500));
        console.log("\n\nRow count:", proxyText.split("\n").length);
    } catch (error) {
        console.error("Proxy fetch failed:", error);
    }
}

// Run test
testSheetData();
