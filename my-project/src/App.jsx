import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaUpload } from "react-icons/fa";
import Logo from "./assets/logoqna.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setError(""); // Reset error message
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data.qna);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setError("Failed to generate Q&A. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark" ? "bg-darkBg text-white" : "bg-lightBg text-black"
      } transition-all duration-500`}
    >
      {/* Logo AskVerse */}
      <div className="flex items-center justify-center">
        <img className="max-w-48 max-h-fit" src={Logo} alt="Logo AskVerse" />
      </div>

      {/* Theme Toggle Button */}
      <button
        className="absolute top-6 right-6 p-3 bg-primary text-white rounded-full shadow-md transition-transform transform hover:scale-110"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>

      <div className="flex items-center justify-center flex-col text-center m-14">
        <h2 className="m-2 font-extrabold font-serif text-4xl">
          Transform PDFs into <br />
          <span className="text-blue-500">Interactive Q&A </span>
        </h2>

        <p className="font-serif text-xl p-5">
          Unlock the power of your documents with our AI-powered question-answer system.
          Extract insights and generate precise answers instantly.
        </p>
        <span className="flex items-center gap-2">
          <IoMdArrowDroprightCircle style={{ color: "#404dde" }} /> AI-Powered
          <IoMdArrowDroprightCircle style={{ color: "#404dde" }} /> Instant Results
        </span>
      </div>

      {/* Card Container */}
      <motion.div
        className="p-8 rounded-2xl shadow-lg bg-glass backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          PDF Q&A Generator
        </h1>

        {/* File Upload */}
        <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-400 rounded-xl hover:border-primary transition-all cursor-pointer">
          <FaUpload size={30} className="mb-2 text-gray-500" />
          <span className="text-gray-500">
            {file ? file.name : "Upload PDF File"}
          </span>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 p-3 rounded-lg shadow-lg transition-all ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-primary text-white"
          }`}
        >
          {loading ? "Processing..." : "Generate Q&A"}
        </motion.button>
      </motion.div>

      {/* Display Generated Q&A */}
      {result && (
        <motion.div
          className="mt-6 p-6 max-w-lg bg-glass rounded-lg backdrop-blur-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold">Generated Q&A</h2>
          {result.length > 0 ? (
            result.map((qa, index) => (
              <div key={index} className="p-3 border-b">
                <p className="font-bold">{qa.question}</p>
                <p>{qa.answer}</p>
              </div>
            ))
          ) : (
            <p>No questions generated yet.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default App;
