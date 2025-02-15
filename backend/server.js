const express = require("express");
const multer = require("multer");
const { extractTextFromPDF } = require("./utils");
const { generateQnA } = require("./model");  // ✅ Ensure this is correct
const cors = require("cors");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
