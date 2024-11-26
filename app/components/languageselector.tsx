import { useState, useEffect } from 'react';

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'English' | 'Chinese' | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: 'English' | 'Chinese') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);  // Store language in localStorage
    console.log("selected language: ",lang)
    window.dispatchEvent(new Event('languageChange'));  // Dispatch an event for language change
  };

  return (
    <div className="relative">
      <div className="flex bg-[#636247] border border-[#F4F2B9] rounded-full overflow-hidden">
        <button
          onClick={() => handleLanguageChange('English')}
          className={`flex-1 px-3 py-1 border-r border-[#F4F2B9] rounded-l-full ${
            language === 'English' ? 'text-white font-bold' : 'text-[#d1d1d1] font-normal'
          } hover:font-bold text-white`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('Chinese')}
          className={`flex-1 px-3 py-1 rounded-r-full ${
            language === 'Chinese' ? 'text-white font-bold' : 'text-[#d1d1d1] font-normal'
          } hover:font-bold text-white`}
        >
          CN
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
