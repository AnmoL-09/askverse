const express = require("express");
const multer = require("multer");
const { extractTextFromPDF } = require("./utils");
const { generateQnA } = require("./model");  // ✅ Ensure this is correct
const cors = require("cors");
const { summarizeText } = require("./summarizer"); // Import summarization function


const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) {
            console.error("🚨 No file uploaded!");
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log(`✅ File received: ${req.file.filename}`);

        const filePath = req.file.path;
        const text = await extractTextFromPDF(filePath);
        console.log(`📄 Extracted Text: ${text.substring(0, 200)}...`);

        const qna = await generateQnA(text);  // ✅ Call the function correctly
        console.log(`💡 Q&A Generated:`, qna);

        res.json({ qna });

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});



app.post("/generateQnA", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const filePath = req.file.path;
        const text = await extractTextFromPDF(filePath);
        const qna = await generateQnA(text);

        res.json({ qna });
    } catch (error) {
        console.error("❌ Q&A Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});


app.post("/summarize", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const filePath = req.file.path;
        const text = await extractTextFromPDF(filePath);
        const summary = await summarizeText(text);

        res.json({ summary });
    } catch (error) {
        console.error("❌ Summarization Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
