import { useEffect, useState } from "react";
import i18next from "i18next";
import { languageOptions } from "../../constant";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("");
  const currLang = i18next.language;

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    i18next.changeLanguage(e.target.value);
  };

  useEffect(() => {
    if (currLang) {
      const selectedLangCode = languageOptions.find(
        ({ code }) => code === currLang,
      )?.code;
      setLanguage(selectedLangCode);
    }
  }, [currLang]);

  return (
    <div>
      <select
        id="language"
        value={language}
        onChange={handleLanguageChange}
        className="bg-[#B88E2F] text-white px-5 py-2 rounded-lg
               flex justify-between items-center font-semibold focus:outline-none"
      >
        {languageOptions.map(({ language, code }, key) => (
          <option value={code} key={key}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
