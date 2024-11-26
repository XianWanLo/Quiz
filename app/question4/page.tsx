// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations";  // Import translations

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const getUniqueUserId = () => {
  let userId = localStorage.getItem('uniqueUserId');
  return userId;
};
const userId = getUniqueUserId();  // Get or create a unique user ID

const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') as 'English' | 'Chinese' || 'English';  // Default to English if not set
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');  // State to store selected language
  const router = useRouter();

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  usePageTracking('/question4');  // This tracks the question4 page

  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer = '';

    if (option === 'Option 1') {
      numbersToSave = [5, 7];
      answer='The emotional expression of the poetry';
    } else if (option === 'Option 2') {
      numbersToSave = [2, 4, 6, 8];
      answer='The emotional expression of the poetry';
        }
    
    // Store the selected numbers in localStorage
    localStorage.setItem('question4', JSON.stringify(numbersToSave));

    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        questionId: 'If the dog gradually becomes independent and no longer hides behind you when scared, how do you feel?',
        selectedAnswer: answer
      }),
    });

    router.push("/question5");
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
          page: 'Question 4 Page',
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
          page: 'Question 4 Page',
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
      <div className="relative min-h-screen bg-green-500 flex items-center justify-center">
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          <div className="relative flex-grow">
            <img
              src="/images/quiz4.png"  // Make sure this image exists in your public folder
              alt="Quiz"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 mt-60">
              <div className="text-center text-white space-y-6 pt-20">
                {/* You can add any additional content here */}
              </div>
              
              <div className="text-center text-white space-y-6 -mt-20">
                <h2 className={`text-2xl font-bold poetsen-one-regular`} style={{ fontSize: '1.4rem', }}>
                  {translations[language].quiz4.question}  {/* Display translated question */}
                </h2>
              </div>

              {/* Options */}
              <div className="absolute inset-x-0 bottom-20 flex flex-col justify-end items-center space-y-6 mb-6">
                <div className="flex justify-between items-center w-full px-6">
                  <div
                    onClick={() => handleOptionClick("Option 1")}
                    className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                  >
                    <p>{translations[language].quiz4.option1}</p>  {/* Display translated option 1 */}
                  </div>
                  <div
                    onClick={() => handleOptionClick("Option 2")}
                    className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                  >
                    <p>{translations[language].quiz4.option2}</p>  {/* Display translated option 2 */}
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
