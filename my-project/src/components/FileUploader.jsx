import { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import axios from "axios";

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      onUploadSuccess(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 border-dashed border-2 border-gray-400 rounded-lg text-center"
    >
      <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
      <label htmlFor="fileInput" className="cursor-pointer">
        <FiUpload size={40} className="text-gray-500 mx-auto" />
        <p className="text-gray-600">Click to upload PDF</p>
      </label>
      {file && <p className="mt-2 text-sm text-gray-700">{file.name}</p>}
      <button
        onClick={handleUpload}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </motion.div>
  );
};

export default FileUploader;
