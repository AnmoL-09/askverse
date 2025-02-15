const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        if (!data.text.trim()) {
            throw new Error("No extractable text found in PDF");
        }
        return data.text;
    } catch (error) {
        console.error("PDF Extraction Error:", error);
        throw new Error("Failed to extract text from PDF");
    }
}

module.exports = { extractTextFromPDF };
