// File: app/question5/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations"; // Import translations

// Define the Wendy One font
const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

// Utility to get unique user ID from localStorage
const getUniqueUserId = () => {
  let userId = localStorage.getItem('uniqueUserId');
  return userId;
};
const userId = getUniqueUserId();  // Get or create a unique user ID

// Utility to get language from localStorage
const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') as 'English' | 'Chinese' || 'English';  // Default to English if not set
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');  // State to store selected language
  const router = useRouter();
  usePageTracking('/question5');  // This tracks the question5 page

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer = '';

    if (option === "Option 1") {
      numbersToSave = [1, 3, 6, 8];
      answer='Able to obey commands';
    } else if (option === "Option 2") {
      numbersToSave = [4, 5, 7];
      answer='Freely exploring the surroundings';
    }
    localStorage.setItem("question5", JSON.stringify(numbersToSave));

   // Send response to the backend
   fetch('/api/question-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      questionId: 'When you want to take your dog for a walk and play outside together, what condition do you prefer?',
      selectedAnswer: answer
    }),
  });

  router.push("/question6");
};

// Page view tracking
useEffect(() => {
  const userId = getUniqueUserId();  // Get or create a unique user ID
  const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
  const channel = document.referrer.includes('google') ? 'organic' : 'direct';
  
  // Measure page load response time
  const startTime = performance.now();

  const sendPageView = () => {
    const responseTime = performance.now() - startTime; // Calculate response time
    fetch('/api/page-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        page: 'Question 5 Page',
        deviceType,
        channel,
        responseTime, // Include the response time
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
        responseTime, // Include the response time
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
              src="/images/quiz5.png" // Make sure this image exists in your public folder
              alt="Quiz"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 mt-60">
              <div className="text-center text-white space-y-6 pt-20">
                {/* You can add any additional content here */}
              </div>
              
              <div className="text-center text-white space-y-6 -mt-20">
                <h2 className={`text-2xl font-bold poetsen-one-regular`} style={{ fontSize: '1.4rem', }}>
                  {translations[language].quiz5.question}  {/* Display translated question */}
                </h2>
              </div>

              {/* Options */}
              <div className="absolute inset-x-0 bottom-20 flex flex-col justify-end items-center space-y-6 mb-6">
                <div className="flex justify-between items-center w-full px-6">
                  <div
                    onClick={() => handleOptionClick("Option 1")}
                    className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                  >
                    <p>{translations[language].quiz5.option1}</p>  {/* Display translated option 1 */}
                  </div>
                  <div
                    onClick={() => handleOptionClick("Option 2")}
                    className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                  >
                    <p>{translations[language].quiz5.option2}</p>  {/* Display translated option 2 */}
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
