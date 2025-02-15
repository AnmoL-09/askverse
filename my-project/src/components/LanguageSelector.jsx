const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
    const languages = [
      { code: "en", label: "English" },
      { code: "es", label: "Spanish" },
      { code: "fr", label: "French" },
      { code: "de", label: "German" },
      { code: "hi", label: "Hindi" },
    ];
  
    return (
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="p-2 border rounded-lg"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    );
  };
  
  export default LanguageSelector;
  