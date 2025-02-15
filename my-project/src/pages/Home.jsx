import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import FileUploader from "../components/FileUploader";
import LanguageSelector from "../components/LanguageSelector";
import QnADisplay from "../components/QnADisplay";

const Home = () => {
  const [qna, setQna] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <div className="min-h-screen flex flex-col items-center p-5 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between w-full max-w-3xl">
        <h1 className="text-2xl font-bold">QnA Generator</h1>
        <ThemeToggle />
      </div>

      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      <FileUploader onUploadSuccess={(data) => setQna(data.qna)} />
      <QnADisplay qna={qna} />
    </div>
  );
};

export default Home;
