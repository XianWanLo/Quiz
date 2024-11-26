// File: pages/start.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { useEffect, useState } from "react";
import translations from "../components/translations"; // Import translations
import "../globals.css";
import { usePageTracking } from "../hooks/usePageTracking";

// Font configuration
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

const getUniqueUserId = () => {
  let userId = localStorage.getItem('uniqueUserId');
  return userId;
};

const StartPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English'); // Default language
  const router = useRouter();

  usePageTracking('/onboarding');  // This tracks the quiz page


  // Load language on component mount
  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    setLanguage(storedLanguage);
  }, []);

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
          page: 'First Onboarding Page',
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
          page: 'First Onboarding Page',
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

  const handleClick = () => {
    router.push("/onboardingnext"); // Navigates to /onboardingnext
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div onClick={handleClick} className="relative min-h-screen bg-green-500 flex items-center justify-center">
        {/* Mobile frame */}
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          {/* Image Container */}
          <div className="relative flex-grow">
            <img
              src="/images/onboarding.png" // Maintain the same background image for consistency
              alt="Different Start"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 space-y-4">
              {/* Main Title positioned at the top */}
              <div className="absolute top-16">
                <h1 className={`text-3xl font-bold text-white poetsen-one-regular`}>
                  {translations[language].onboarding.title}
                </h1>
              </div>

              {/* Instruction Text with gaps between title and text */}
              <div className="mt-20 flex flex-col items-center space-y-6">
                <p className="text-md text-white text-center px-2">
                  {translations[language].onboarding.instruction}
                </p>

                {/* First SVG Image and text */}
                <img src="/images/top_onboard.png" alt="Instruction 1" className="w-50 h-56" />
                <p className="text-sm text-white -mt-20">{translations[language].onboarding.singleChoice}</p>

                {/* Second SVG Image and text */}
                <img src="/images/bottom_onboard.png" alt="Instruction 2" className="w-50 h-56 mt-10" />
                <p className="text-sm text-white mt-2">{translations[language].onboarding.multipleChoice}</p>
              </div>

              {/* Final SVG Image */}
              <div className="absolute bottom-5 w-full flex justify-center">
                <img src="/svg/onboarding.svg" alt="Instruction 3" className="w-20 h-20 mt-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;
