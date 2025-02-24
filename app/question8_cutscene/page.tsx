"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations"; // Import translations


const getUniqueUserId = () => {
  let userId = localStorage.getItem('uniqueUserId');
  return userId;
};

const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');  // State to store selected language
  const router = useRouter();

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  const wordFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';

  // Page view & response time tracking
  usePageTracking("Cut Scene between 7 & 8")

  const handleOptionClick = () => {
    router.push("/question8_perfume");
  };
  
  
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-slate-900">

      {/*Main Container*/}
      <div className="relative flex overflow-hidden flex-col mx-auto w-full max-w-[480px]">
        
        <div className="h-[100vh]">
            
          <div className="absolute z-0 w-full">
            <img
              src="/images_perfume/question7/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="relative z-10 flex-col flex items-center justify-center mx-4 inset-y-1/4">

            {/* Question at the top - added fixed width/height container */}
            <div className="mb-10">
              <h1 className={`text-6xl font-bold text-center text-white ${wordFont}`}>
                {translations[language].cutscene.content1}
              </h1>
            </div>

            <div 
                onClick={() => handleOptionClick()}
                className="vertical-option-button text-3xl"
              >
                {translations[language].cutscene.content2}
            </div>

          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default QuizPage;
