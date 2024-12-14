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
  usePageTracking('/question7');  // This tracks the question7 page

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer = '';

    if (option === 'Option 1') {
      numbersToSave = [1, 6];
      answer='Always following the same route';
    } else if (option === 'Option 2') {
      numbersToSave = [5, 7, 8];
      answer='Finding new routes and environments';
    } else if (option === 'Option 3') {
      numbersToSave = [2, 9];
      answer='Prioritizing places where other dogs can be encountered';
    } else if (option === 'Option 4') {
      numbersToSave = [4, 6];
      answer='Choosing times and places with fewer people';
    }
    localStorage.setItem('question7', JSON.stringify(numbersToSave));

    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: getUniqueUserId(),
        questionId: 'Your habit when walking with your dog is?',
        selectedAnswer: answer,
      }),
    });

    router.push("/question8_cutscene");
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
          page: 'Question 7 Page',
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
          page: 'Question 7 Page',
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
      <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
        
        <div className="relative w-full bg-slate-900">
            
          <div className="absolute z-0 w-full">
            <img
              src="/images_perfume/question7/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="relative z-10 pt-5 pr-5 pl-2.5 mt-4">

            {/* Question at the top - added fixed width/height container */}
            <div className="w-[400px] h-[94px] mx-auto flex items-center justify-center mb-12">
              <h1 className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].quiz7.question}
              </h1>
            </div>

            {/* Options container*/}
            <div className="flex flex-col justify-center gap-8 mb-6">
              
              {/* Option 1 */}
              <div className="flex items-center justify-center">
                <img
                  src="/images_perfume/question7/option1.png"
                  alt="Option 1"
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 1")}
                className="px-14 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-sm text-center transition-colors"
              >
                {translations[language].quiz7.option1}
              </div>

              {/* Option 2 */}
              <div className="flex items-center justify-center mt-4">
                <img
                  src="/images_perfume/question7/option2.png"
                  alt="Option 2"
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="px-14 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-sm text-center transition-colors"
              >
                {translations[language].quiz7.option2}
              </div>
            </div>

            {/* Question counter - aligned to bottom right */}
            <div className="flex justify-end text-7xl leading-none text-white">
                  <span className={`text-purple-300 ${stintultra.className}`}>7
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
