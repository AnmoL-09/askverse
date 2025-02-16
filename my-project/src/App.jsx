import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaUpload } from "react-icons/fa";
import Logo from "./assets/logoqna.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { Bar } from "react-chartjs-2";


const API_BASE_URL = "http://localhost:5000";

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null); // Add summary state
  const [simplified, setSimplified] = useState(null);

const handleSummarize = async () => {
    if (!file) {
        setError("Please upload a PDF file.");
        return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
        setLoading(true);
        setError("");

        const response = await axios.post(`${API_BASE_URL}/summarize`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("🔍 Summary API Response:", response.data);
        setSummary(response.data.summary);

    } catch (error) {
        console.error("❌ Error generating Summary:", error);
        setError("Failed to generate Summary. Please try again.");
    } finally {
        setLoading(false);
    }
};

const handleSimplify = async () => {
  if (!file) {
      setError("Please upload a PDF file.");
      return;
  }

  const formData = new FormData();
  formData.append("pdf", file);

  try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${API_BASE_URL}/simplify`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("🔍 Simplification API Response:", response.data);
      setSimplified(response.data.simplified);

  } catch (error) {
      console.error("❌ Error simplifying text:", error);
      setError("Failed to simplify text. Please try again.");
  } finally {
      setLoading(false);
  }
};

const chartData = {
  labels: ["History", "Science", "Business", "Technology"],
  datasets: [{ label: "Topic Importance", data: [4, 8, 5, 7], backgroundColor: ["blue", "green", "orange", "red"] }]
};

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setError("");
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
      console.log("Response Data:", response.data);
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
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-300 text-black"
      }`}
    >
      
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-30 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Logo and Header */}
      <div className="flex items-center justify-center mb-10">
        <img className="w-44 h-44" src={Logo} alt="AskVerse Logo" />
      </div>

      {/* Theme Toggle Button */}
      <button
        className="absolute top-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>

      {/* Intro Section */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-5xl font-bold mb-4">
          Transform PDFs into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Interactive Q&amp;A
            </span>
            
        </h2>
        <p className="text-xl font-light">
          Unlock the power of your documents with our AI-powered system.
          Extract insights and generate precise answers instantly.
        </p>
        <span className="flex items-center gap-2 justify-center mt-12 font-serif">
          <IoMdArrowDroprightCircle style={{ color: "#404dde" }} /> AI-Powered
          <IoMdArrowDroprightCircle style={{ color: "#404dde" }} /> Instant Results
        </span>
      </div>

      {/* Main Card Container */}
      <motion.div
        className="p-10 rounded-3xl shadow-2xl bg-white bg-opacity-10 backdrop-blur-md w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          PDF Q&amp;A Generator
        </h1>

        {/* File Upload */} 
        <label className="w-full flex flex-col items-center justify-center p-6 border-4 border-dashed border-gray-400 rounded-2xl cursor-pointer hover:border-primary transition-all bg-white bg-opacity-10 hover:bg-opacity-20">
          <FaUpload size={40} className="mb-3 text-primary" />
          <span className="text-lg text-gray-300">
            {file ? file.name : "Click to Upload PDF File"}
          </span>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>

        {error && (
          <p className="mt-4 text-red-500 font-semibold">{error}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-xl shadow-xl transition-all hover:shadow-2xl ${
            loading ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Generate Analysis"}
        </motion.button>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSummarize}
        disabled={loading}
        className="w-full mt-4 p-3 bg-yellow-500 text-white rounded-lg shadow-lg transition-all"
    >
        {loading ? "Summarizing..." : "Summarize PDF"}
    </motion.button>

    <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={handleSimplify}
    disabled={loading}
    className="w-full mt-4 p-3 bg-orange-500 text-white rounded-lg shadow-lg transition-all"
>
    {loading ? "Simplifying..." : "Explain To a Kid"}
</motion.button>
      </motion.div>
      {/* Input Question By user */}
      

      {/* Display Generated Q&A */}
      {result && (
        <motion.div
          className="mt-8 p-8 max-w-2xl bg-white bg-opacity-20 rounded-2xl backdrop-blur-md shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Generated Ananlysis</h2>
          {result.length > 0 ? (
            result.map((qa, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-400 mb-4 last:border-0"
              >
                <p className="text-xl font-bold">{qa.question}</p>
                <p className="mt-2">{qa.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-lg">No questions generated yet.</p>
          )}
        </motion.div>
      )}

{summary && (
    <motion.div
        className="mt-6 p-6 max-w-lg  bg-purple-600 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <h2 className="text-xl font-semibold">PDF Summary</h2>
        <p>{summary}</p>
    </motion.div>
)}

{simplified && (
    <motion.div
        className="mt-6 p-6 max-w-lg bg-orange-100 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <h2 className="text-xl font-semibold text-black">Simplified Explanation</h2>
        <p className="text-black">{simplified}</p>
    </motion.div>
)}

      <div className="absolute bottom-4 text-gray-400 text-sm">
        Made with ❤️ by Optimal_AC
      </div>
    </div>
  );
};

export default App;
