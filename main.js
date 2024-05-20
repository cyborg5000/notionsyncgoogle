// Import the necessary functions from other files
const { notionQuery, updateNotion } = require('./notion');
const { readSheet, updateSheet } = require('./sheet');

// Function to sync data from Notion to Google Sheets
const syncNotionToSheet = async () => {
    const notionData = await notionQuery(); // Get data from Notion
    console.log("Data from Notion:", notionData); // Print data to the console
    await updateSheet(notionData); // Update Google Sheets with Notion data
};

// Function to sync data from Google Sheets to Notion
const syncSheetToNotion = async () => {
    const sheetData = await readSheet(); // Get data from Google Sheets
    console.log("Data from Sheet:", sheetData); // Print data to the console
    // For each row in Google Sheets, update Notion
    for (const { id, name } of sheetData) {
        await updateNotion(id, name);
    }
};

// Main function to sync both ways
const syncBothWays = async () => {
    await syncNotionToSheet(); // Sync from Notion to Google Sheets
    await syncSheetToNotion(); // Sync from Google Sheets to Notion
};

// Run the main sync function
syncBothWays();
