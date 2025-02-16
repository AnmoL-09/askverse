const axios = require("axios");
require("dotenv").config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Set this in .env

async function simplifyText(text) {
    try {
        console.log("🔄 Sending text to Hugging Face for simplification...");

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            { inputs: `Explain this in a simple way for a 5-year-old: ${text}` },
            {
                headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }
            }
        );

        console.log("📜 Full API Response:", JSON.stringify(response.data, null, 2));

        if (!response.data || response.data.length === 0 || !response.data[0].summary_text) {
            throw new Error("No simplified text generated.");
        }

        return response.data[0].summary_text;
        

    } catch (error) {
        console.error("❌ Error simplifying text:", error);
        return "Simplification failed.";
    }
}




module.exports = { simplifyText };

