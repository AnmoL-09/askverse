const axios = require("axios");
require("dotenv").config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Ensure this is set in your .env file

async function summarizeText(text) {
    try {
        console.log("🔄 Summarizing text using Hugging Face...");

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            { inputs: text },
            {
                headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` }
            }
        );

        console.log("📜 Summary Response:", response.data);

        if (!response.data || response.data.length === 0 || response.data[0].summary_text === undefined) {
            throw new Error("No summary generated.");
        }

        return response.data[0].summary_text;
    } catch (error) {
        console.error("❌ Error generating summary:", error);
        return "Summarization failed.";
    }
}

module.exports = { summarizeText };
