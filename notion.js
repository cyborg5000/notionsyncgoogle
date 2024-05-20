// Import necessary libraries
require('dotenv').config();
const { Client } = require('@notionhq/client');

// Initialize the Notion client with your API key
const notion = new Client({ auth: process.env.NOTION_KEY });

// Your Notion database ID
const databaseId = 'Your-Notion-Database-ID'; // Replace with your actual Notion database ID

// Function to query data from Notion
const notionQuery = async () => {
    const response = await notion.databases.query({ database_id: databaseId });
    return response.results.map(page => ({
        id: page.id, // Get the page ID
        name: page.properties.Name.title[0].plain_text // Get the page name
    }));
};

// Function to update a Notion page with new data
const updateNotion = async (pageId, newName) => {
    try {
        await notion.pages.update({
            page_id: pageId,
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: newName // Set the new name
                            }
                        }
                    ]
                }
            }
        });
        console.log(`Notion page ${pageId} updated successfully`);
    } catch (e) {
        console.log("Error updating Notion:", e);
    }
};

module.exports = {
    notionQuery,
    updateNotion
};
