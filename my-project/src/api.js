import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change this if deployed

// Function to upload PDF
export const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading PDF:", error);
        return { error: "Failed to upload PDF" };
    }
};
