// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import translations from "../components/translations"; // Import translations
import { usePageTracking } from "../hooks/usePageTracking";



const getUniqueUserId = () => {
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('uniqueUserId');
    return userId;
  }
  return null;
};
const userId = getUniqueUserId();  // Get or create a unique user ID

const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English'); // State for language
  const router = useRouter();
  
  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage()); // Get the selected language from localStorage
  }, []);

  usePageTracking('/question3');  // This tracks the question3 page

  const handleOptionClick = (option: string) => {
    
    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');

      // Update score according to user's choice 
      if (option === 'Option 1') {
        mbtiScores.N += 1;
      } else if (option === 'Option 2') {
        mbtiScores.S += 1;
      }

      // Update MBTI scores in localStorage
      localStorage.setItem('mbtiScores', JSON.stringify(mbtiScores));
    }
    
    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,  
        questionId: 'You are ready to start training your dog. Which method do you prefer?',
        selectedAnswer: option,
      }),
    });

    router.push("/question4_perfume");
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
          page: 'Question 3 Page',
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
          page: 'Question 3 Page',
          deviceType,
          channel,
          responseTime, 
        }),
      });
    };

    const timeoutId = setTimeout(sendPageView, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/*Main Container*/}
      <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
        
        <div className="relative w-full bg-slate-900">
            
          <div className="absolute z-0 w-full">
            <img
              src="/images_perfume/question3/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="relative z-10 pt-5 pr-5 pl-2.5 mt-4">

            {/* Question at the top - added fixed width/height container */}
            <div className="w-[360px] h-[94px] mx-auto flex items-center justify-center mb-12">
              <h1 className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].quiz3.question}
              </h1>
            </div>

            {/* Options container*/}
            <div className="flex flex-col justify-center gap-8 mb-6">
              
              {/* Option 1 */}
              <div className="flex items-center justify-center">
                <img
                  src="/images_perfume/question3/option1.png"
                  alt="Option 1"
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 1")}
                className="px-14 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-sm text-center transition-colors"
              >
                {translations[language].quiz2.option1}
              </div>

              {/* Option 2 */}
              <div className="flex items-center justify-center mt-4">
                <img
                  src="/images_perfume/question3/option2.png"
                  alt="Option 2"
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="px-14 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-sm text-center transition-colors"
              >
                {translations[language].quiz2.option2}
              </div>
            </div>

            {/* Question counter - aligned to bottom right */}
            <div className="flex justify-end text-7xl leading-none text-white">
                  <span className={`text-purple-300 ${stintultra.className}`}>3
                  </span>
                  <span className={` ${stintultra.className}`}>/8
                  </span>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default QuizPage;
