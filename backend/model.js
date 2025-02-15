require("dotenv").config();
const axios = require("axios");

// Define the list of questions to generate answers for
const QUESTIONS = [
    "What is the main idea?",
    "Summarize the key points.",
    "What are the most important details?",
    "Who is mentioned in the document?",
    "What are the key topics covered?",
    "What conclusions are drawn?",
    "What problem is being addressed?",
    "What is the purpose of this document?",
    "What are the advantages and disadvantages mentioned?",
    "What are the main arguments presented?",
    "How does this document compare to similar ones?"
];


async function generateQnA(text) {
    try {
        console.log(`🤖 Sending text to Hugging Face API...`);

        let results = [];

        for (let question of QUESTIONS) {
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
                {
                    inputs: {
                        context: text,
                        question: question
                    }
                },
                {
                    headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }
                }
            );

            console.log(`🔍 API Response for Question "${question}":`, response.data);

            if (!response.data || !response.data.answer) {
                throw new Error(`No answer returned for question: ${question}`);
            }

            results.push({
                question: question,
                answer: response.data.answer
            });
        }

        return results;

    } catch (error) {
        console.error("❌ Hugging Face API Error:", error.response ? error.response.data : error.message);
        throw new Error("Error generating Q&A from Hugging Face API");
    }
}

module.exports = { generateQnA };
