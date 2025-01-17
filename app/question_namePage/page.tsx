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
  usePageTracking('/question8');  // This tracks the question8 page

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  const handleOptionClick = (option: string) => {

    const nameInput = (document.getElementById("nameInput") as HTMLInputElement).value; // Get the input value
    localStorage.setItem('userName', nameInput); // Save the name to local storage
    
    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: getUniqueUserId(),
        questionId: 'If you have the opportunity to participate in an activity with your dog, what interests you the most?'
      }),
    });


    router.push("/question_loadingPage");
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
          page: 'Question 8 Page',
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
          page: 'Question 8 Page',
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
      {/*Main Container*/}
      <div className="flex overflow-hidden flex-col mx-auto w-full h-[1000px] bg-white max-w-[480px]">
        
        <div className="relative flex items-center justify-center w-full h-full bg-slate-900">
            
          <div className="absolute z-0 w-full h-full">
            <img
              src="/images_perfume/namePage/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="relative flex flex-col items-center justify-center px-8 py-6 mx-20 rounded-2xl border-2 border-purple-300 bg-purple-300 bg-opacity-40">

            <pre 
              className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
              {translations[language].namePage.prompt}
            </pre>

            <input
              id="nameInput"
              type="text"
              className="flex shrink-0 self-stretch mt-7 bg-white rounded-xl py-5 px-4"
              aria-label="Enter your name"
            />
            
            <div 
                onClick={() => handleOptionClick("Confirm")}
                className="mt-10 px-14 py-4 bg-purple-200 hover:bg-purple-400 rounded-[35px] cursor-pointer text-purple-700 text-2xl text-center transition-colors"
              >
                {translations[language].namePage.button}
            </div>

          </div>
        </div>
    </div>
    </>
  );
};

export default QuizPage;
