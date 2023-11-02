const express = require('express');
const axios = require('axios');
const { ElvClient } = require("@eluvio/elv-client-js");

const app = express();
const port = 3000;

// Vectara configuration
const VECTARA_CUSTOMER_ID = 1184233249; 
const VECTARA_API_KEY = "5ssn5dhb9imfte45agm959voes"; 
const VECTARA_BASE_URL = "https://api.vectara.io";

// Initialize ElvClient for storyOfTheDay module
let client;
async function initializeElvClient() {
    client = await ElvClient.FromConfigurationUrl({
        configUrl: "https://demov3.net955210.contentfabric.io/config"
    });
    const privateKey = "0x433299265d95754b301a967623cf3189b1b4a3c1";  
    const wallet = client.GenerateWallet();
    const signer = wallet.AddAccount({ privateKey });
    await client.SetSigner({ signer });
}
initializeElvClient();

// Function to fetch story of the day using Vectara
async function getStoryOfTheDay() {
    let query = "Story of the Day"; // Update this query as per your data structure

    let response = await axios.post(`${VECTARA_BASE_URL}/v1/query`, {
        query: [
            {
                query: query,
                start: 0,
                numResults: 1,
                corpusKey: [
                    {
                        customerId: VECTARA_CUSTOMER_ID,
                        corpusId: VECTARA_CORPUS_ID,
                        semantics: "DEFAULT"
                    }
                ]
            }
        ]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'customer-id': `${VECTARA_CUSTOMER_ID}`,
            'x-api-key': VECTARA_API_KEY
        }
    });

    if (response.data && response.data.result && response.data.result[0] && response.data.result[0].hits.length > 0) {
        let hit = response.data.result[0].hits[0];
        return {
            id: hit.id,
            content: hit.content 
        };
    } else {
        throw new Error("No story found for today.");
    }
}

// Function to get MindsDB prediction
async function getMindsDBPrediction() {
    const mindsDBServerURL = "http://localhost:47334";  
    const sqlQuery = "SELECT rental_price FROM home_rentals_model WHERE number_of_bathrooms = 2 AND sqft = 1000;"; // Replace with your SQL query

    try {
        let response = await axios.post(`${mindsDBServerURL}/api/predictors/home_rentals_model/predict`, {
            when_data: { number_of_bathrooms: 2, sqft: 1000 }
        });
        return response.data; 
    } catch (error) {
        console.error("Error querying MindsDB:", error);
        throw new Error("Failed to get prediction from MindsDB.");
    }
}

// Express routes
app.get('/of-the-day', async (req, res) => {
    try {
        let story = await getStoryOfTheDay();
        res.json({ success: true, storyId: story.id, storyContent: story.content });
    } catch (error) {
        console.error("Error retrieving story of the day:", error);
        res.status(500).send("Error retrieving story of the day.");
    }
});

app.get('/mindsdb-prediction', async (req, res) => {
    try {
        let prediction = await getMindsDBPrediction();
        res.json({ success: true, prediction });
    } catch (error) {
        console.error("Error getting MindsDB prediction:", error);
        res.status(500).send("Error retrieving prediction.");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
