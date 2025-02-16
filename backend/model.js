require("dotenv").config();
const axios = require("axios");

// Define the list of questions to generate answers for
const QUESTIONS = [
    "What is the main idea?",
    "Summarize the key points in detail.",
    "What are the most important details? Explain in depth.",
    "Who is mentioned in the document and what is their significance?",
    "What are the key topics covered? Provide a detailed explanation.",
    "What conclusions are drawn? Expand with supporting details.",
    "What problem is being addressed and how is it solved?",
    "What is the purpose of this document? Explain with context.",
    "What are the advantages and disadvantages mentioned? Provide examples.",
    "What are the main arguments presented? Elaborate with context.",
    "How does this document compare to similar ones? Provide a thorough analysis."
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
                    },
                    parameters: {
                        max_answer_length: 150, // Increase max length for detailed answers
                        min_answer_length: 50 // Ensure answers are at least a paragraph long
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
