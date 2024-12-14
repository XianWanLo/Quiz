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
  return localStorage.getItem('language') as 'English' | 'Chinese' || 'English';  // Default to English if not set
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');  // State to store selected language
  const router = useRouter();
  usePageTracking('/question8');  // This tracks the question8 page

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer = '';

    if (option === 'Option 1') {
      numbersToSave = [1, 3, 5];
      answer='Training courses';
    } else if (option === 'Option 2') {
      numbersToSave = [2, 8, 9];
      answer='Dog gatherings';
    } else if (option === 'Option 3') {
      numbersToSave = [2, 9];
      answer='Charity run';
    } else if (option === 'Option 4') {
      numbersToSave = [7, 8];
      answer='Adventure hiking';
    }

    localStorage.setItem('question8', JSON.stringify(numbersToSave));

    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: getUniqueUserId(),
        questionId: 'If you have the opportunity to participate in an activity with your dog, what interests you the most?',
        selectedAnswer: answer,
      }),
    });

    router.push("/output");
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
      <div className="flex overflow-hidden flex-col mx-auto w-full h-[1225px] bg-white max-w-[480px]">
        
        <div className="relative w-full h-full bg-slate-900">
            
          <div className="absolute z-0 w-full h-full">
            <img
              src="/images_perfume/question7/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="relative z-10 pt-5 pr-8 pl-8 inset-y-1/3">

            {/* Question at the top - added fixed width/height container */}
            <div className="mx-auto flex items-center justify-center mb-12">
              <h1 className={`text-7xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].cutscene.content1}
              </h1>
            </div>

            <div 
                onClick={() => handleOptionClick("Option")}
                className="ml-20 mr-20 px-14 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-2xl text-center transition-colors"
              >
                {translations[language].cutscene.content2}
              </div>

          </div>
        </div>
    </div>
    </>
  );
};

export default QuizPage;
