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
    return localStorage.getItem('language') as 'English' | 'Chinese' || 'English'; // Default to English
  }
  return 'English'; // Fallback for SSR
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English'); // Default language

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
      <div className="flex overflow-hidden flex-col pb-32 mx-auto w-full text-white bg-white max-w-[480px]">
        <div className="flex relative flex-col w-full min-h-[805px] pt-[551px]">
            <img
              src="/images_perfume/quiz/background.png"
              alt="Start"
              className={`object-cover absolute inset-0 size-full`}
            />
            
            <div className="flex relative z-10 flex-col px-20 pt-14 pb-7 mb-0 w-full bg-slate-900">
              <h1 className={`text-5xl font-bold ${wendyone.className}`}>
                {translations[language].quiz.title}
              </h1>
              <button
                onClick={handleClick}
                className={`flex flex-col justify-center py-1 text-2xl leading-none text-center bg-purple-300 rounded-full text-slate-900 text-opacity-90 mt-10 mr-2.5 ml-3.5`}
                tabIndex={0}
                >
                <div className="px-14 py-8 rounded-full border border-purple-300 border-solid">
                  <p
                    onClick={handleClick}
                    className={`relative text-2xl text-black px-6 py-2 font-bold h-12 ${wendyone.className} hover:text-white hover:scale-110 transition-transform duration-200 cursor-pointer`}
                  >
                    {translations[language].quiz.startButton}
                  </p>
                </div>
              </button>
              <div className="mt-12 text-xs text-center">
                Copyright © {translations[language].quiz.copyright}. All rights reserved.
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
