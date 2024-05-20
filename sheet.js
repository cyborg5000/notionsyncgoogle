// Import necessary libraries
const { google } = require('googleapis');
require('dotenv').config();

// Get the Google Sheet ID from environment variables
const SHEET_ID = process.env.SHEET_ID;

// Function to authenticate with Google Sheets
const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", // Path to your service account key file
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
};

// Function to read data from Google Sheets
const readSheet = async () => {
    try {
        const sheets = await authentication();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A2:B' // Assuming data starts from row 2
        });
        return response.data.values.map(row => ({
            id: row[0], // Get the first column as ID
            name: row[1] // Get the second column as Name
        }));
    } catch (e) {
        console.log("Error reading the spreadsheet:", e);
    }
};

// Function to update Google Sheets with data from Notion
const updateSheet = async (data) => {
    try {
        const sheets = await authentication();
        const values = data.map(item => [item.id, item.name]);
        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A2',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values
            }
        });
        console.log("Google Sheet updated successfully");
    } catch (e) {
        console.log("Error updating the spreadsheet:", e);
    }
};

module.exports = {
    readSheet,
    updateSheet
};
