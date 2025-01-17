// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { useEffect, useState } from "react";
import translations from "../components/translations"; // Import translations
import { usePageTracking } from "../hooks/usePageTracking";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

// Helper function to get language from localStorage
const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as 'English' | 'Traditional_Chinese' | 'Simplified_Chinese' || 'English'; // Default to English
  }
  return 'English'; // Fallback for SSR
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English'); // Default language

  usePageTracking('/quiz');  // This tracks the quiz page

  // Load language on component mount
  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    setLanguage(storedLanguage);
  }, []);

  const handleClick = () => {
    router.push("/question1"); // Navigates to /question1
  };

  const getUniqueUserId = () => {
    let userId = localStorage.getItem('uniqueUserId');
    return userId;
  };

  const userId = getUniqueUserId();  // Get or create a unique user ID

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
          page: 'Start Game Page',
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
          page: 'Start Game Page',
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
      <div onClick={handleClick} className="relative min-h-screen bg-green-500 flex items-center justify-center">
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          <div className="relative flex-grow">
            <img
              src="/images/quiz.png"
              alt="Start"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="text-center text-white space-y-6 pt-20">
                <h1 className={`text-5xl font-bold ${wendyone.className}`}>
                  {translations[language].quiz.title}
                </h1>
              </div>
              
              <div className="text-center text-white space-y-6 mt-32 mr-20">
                <h1 className={`text-3xl font-bold ${wendyone.className}`}>
                  {translations[language].quiz.questions}
                </h1>
              </div>
              <div className="text-center text-white space-y-6 mt-2">
                <h1 className={`text-8xl font-bold ${wendyone.className}`}>
                  {translations[language].quiz.totalQuestions}
                </h1>
              </div>
              <div className="text-center text-white space-y-6 mt-10">
                <h1 className={`text-3xl font-bold ${wendyone.className}`}>
                  {translations[language].quiz.startButton}
                </h1>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
