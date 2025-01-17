import { useState, useEffect } from 'react';

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'English' | 'Traditional_Chinese' | 'Simplified_Chinese' | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: 'English' | 'Traditional_Chinese' | 'Simplified_Chinese') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);  // Store language in localStorage
    console.log("selected language: ",lang)
    window.dispatchEvent(new Event('languageChange'));  // Dispatch an event for language change
  };

  return (
    <div className="relative">
      <div className="flex bg-[#E2B9F4] bg-opacity-46 border border-[#E2B9F4] rounded-full overflow-hidden text-sm">
        <button
          onClick={() => handleLanguageChange('English')}
          className={`flex-1 px-3 py-1 border-r rounded-l-full ${
            language === 'English' ? 'text-black font-bold' : 'text-[#d1d1d1] font-normal'
          } hover:font-bold text-black`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('Traditional_Chinese')}
          className={`flex-2 px-3 py-1 border-r  ${
            language === 'Traditional_Chinese' ? 'text-black font-bold' : 'text-[#d1d1d1] font-normal'
          } hover:font-bold text-black`}
        >
          繁体中文
        </button>
        <button
          onClick={() => handleLanguageChange('Simplified_Chinese')}
          className={`flex-2 px-3 py-1 rounded-r-full ${
            language === 'Simplified_Chinese' ? 'text-black font-bold' : 'text-[#d1d1d1] font-normal'
          } hover:font-bold text-black`}
        >
          简体中文
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
