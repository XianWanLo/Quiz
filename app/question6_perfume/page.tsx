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
  usePageTracking('/question6');  // This tracks the question6 page

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  const handleOptionClick = (option: string) => {
    
    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');

      // Update score according to user's choice 
      if (option === 'Option 1') {
        mbtiScores.F += 1;
      } else if (option === 'Option 2') {
        mbtiScores.T += 1;
      }

      // Update MBTI scores in localStorage
      localStorage.setItem('mbtiScores', JSON.stringify(mbtiScores));
    }
    
    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: getUniqueUserId(),
        questionId: 'When selecting toys for your dog, which type do you prefer?',
        selectedAnswer: option,
      }),
    });

    router.push("/question7_perfume");
  };

  // Page view tracking
  useEffect(() => {
    const userId = getUniqueUserId();
    const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    const channel = document.referrer.includes('google') ? 'organic' : 'direct';

    const startTime = performance.now();

    const sendPageView = () => {
      const responseTime = performance.now() - startTime;
      fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Question 6 Page',
          deviceType,
          channel,
          responseTime,
        }),
      });

      fetch('/api/page-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Question 6 Page',
          deviceType,
          channel,
          responseTime,
        }),
      });
    };

    const timeoutId = setTimeout(sendPageView, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Main container*/}
      <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
        {/* image */}
        <div className="h-[630px]">
          <img
            src="/images_perfume/question6/background.png"
            alt="Perfume quiz"
            className="object-cover w-full"
          />
        </div>
        
        {/* Question container\*/}
        <div className="relative pt-5 pr-5 pl-2.5 w-full bg-slate-900">

            {/* Question at the top - added fixed width/height container */}
            <div className="w-[420px] h-[94px] mx-auto flex items-center justify-center mb-12">
              <h1 className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].quiz6.question}
              </h1>
            </div>

            {/* Options container - side by side */}
            <div className="flex gap-8 mb-8">
              {/* Option 1 */}
              <div 
                onClick={() => handleOptionClick("Option 1")}
                className="flex items-center px-5 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer transition-colors w-1/2"
              >
                <h1 className={`text-white text-m text-center`}>
                {translations[language].quiz6.option1}
                </h1>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="flex items-center px-5 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-m text-center transition-colors w-1/2"
              >
               <h1 className={`text-white text-m text-center`}>
                  {translations[language].quiz6.option2}
                </h1>
              </div>
            </div>

            {/* Question counter - aligned to bottom right */}
            <div className="flex justify-end text-7xl leading-none text-white">
              <span className={`text-purple-300 ${stintultra.className}`}>6
              </span>
              <span className={` ${stintultra.className}`}>/8
              </span>
            </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;