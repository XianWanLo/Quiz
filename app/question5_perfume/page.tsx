// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations";  // Import translations


const getUniqueUserId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('uniqueUserId');
  }
  return null; // Return null or a default value if not in the browser
};

const userId = getUniqueUserId();  // Get or create a unique user ID

const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English'; 
  }
  return 'English';   
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');  // State to store selected language
  const router = useRouter();

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  usePageTracking('/question4');  // This tracks the question4 page

  const handleOptionClick = (option: string) => {
    
    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');

      // Update score according to user's choice 
      if (option === 'Option 1') {
        mbtiScores.N += 2;
      } else if (option === 'Option 2') {
        mbtiScores.S += 2;
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
        questionId: 'If the dog gradually becomes independent and no longer hides behind you when scared, how do you feel?',
        selectedAnswer: option
      }),
    });

    router.push("/question6_perfume");
  };

  // Page view tracking
  useEffect(() => {
    const userId = getUniqueUserId();  
    const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    
    // Measure page load response time
    const startTime = performance.now();

    const sendPageView = () => {
      const responseTime = performance.now() - startTime;  // Calculate response time
      fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Question 5 Page',
          deviceType,
          channel,
          responseTime,  // Include the response time
        }),
      });

      fetch('/api/page-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Question 5 Page',
          deviceType,
          channel,
          responseTime,  // Include the response time
        }),
      });
    };

    // Debounce the call to avoid multiple requests
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
            

          <div className="relative z-10 pt-5 pr-5 pl-2.5 mt-4">

            {/* Question at the top - added fixed width/height container */}
            <div className="w-[420px] h-[94px] mx-auto flex mb-10">
              <h1 className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].quiz5.question}
              </h1>
            </div>

            {/* Options container*/}
            <div className="flex flex-col item-center px-4 mb-10 w-full">
              
              {/* Option 1 */}
              <div className="relative flex h-[400px] justify-end items-center">
                
              <img
                  src="/images_perfume/question5/option1.png"
                  alt="Option 1"
                  className="z-10 absolute object-contain shrink-0 inset-x-0 w-[220px]"
                />

                <div 
                  onClick={() => handleOptionClick("Option 1")}
                  className="mt-10 px-12 py-8 bg-[#FCDDA6] hover:bg-[#FCDDA6] cursor-pointer transition-colors"
                >
                  <pre
                    className={`text-black text-center text-xl ${patrickhand.className}`}> 
                  {translations[language].quiz5.option1}
                  </pre>
                </div>
              </div>

              {/* Option 2 */}
              <div className="relative flex h-[400px] justify-start items-center">
                
              <img
                  src="/images_perfume/question5/option2.png"
                  alt="Option 2"
                  className="z-10 absolute mb-6 object-contain shrink-0 inset-x-1/2 w-[220px]"
                />

                <div 
                  onClick={() => handleOptionClick("Option 2")}
                  className="flex mt-20 px-12 py-8 bg-[#FCDDA6] hover:bg-[#FCDDA6] cursor-pointer transition-colors"
                >
                  <pre
                    className={`text-black text-center text-xl ${patrickhand.className}`}> 
                  {translations[language].quiz5.option2}
                  </pre>
                </div>
              </div>
            </div>

            {/* Question counter - aligned to bottom right */}
            <div className="flex justify-end text-7xl leading-none text-white">
                  <span className={`text-purple-300 ${stintultra.className}`}>5
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
