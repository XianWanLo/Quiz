// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, waterfall } from "../components/font";
import { useEffect, useState } from "react";
import translations from "../components/translations"; // Import translations
//import { usePageTracking } from "../hooks/usePageTracking";
import LanguageSelector from "../components/languageselector";
import AudioPlayer from '../components/audioPlayer';


// Utility to get or generate a unique user ID
function getUniqueUserId() {
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('uniqueUserId');
  
    if (!userId) {
      userId = crypto.randomUUID();  // Generate a new UUID if it doesn't exist
      localStorage.setItem('uniqueUserId', userId);
    }
  
    return userId;
  }
  return null; // Default to null for SSR
}

// Helper function to get language from localStorage
function getLanguageFromLocalStorage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English'; 
  }
  return 'English'; // Fallback for SSR
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English'); // Default language

  //usePageTracking('/quiz');  // This tracks the quiz page

  useEffect(() => {
  
    const initialScores = {
      E: 0, // Extraversion
      I: 0, // Introversion
      S: 0, // Sensing
      N: 0, // Intuition
      T: 0, // Thinking
      F: 0, // Feeling
      J: 0, // Judging
      P: 0  // Perceiving
    };
    localStorage.setItem('mbtiScores', JSON.stringify(initialScores));
    
    localStorage.setItem('audioPlaying', 'false'); // Update local storage
    localStorage.setItem('audioCurrentTime',JSON.stringify(0)); // Update local storage
   
    // Only access localStorage after the component has mounted
    if (typeof window !== 'undefined') {
      const storedLanguage = getLanguageFromLocalStorage();
      setLanguage(storedLanguage);
    }

    // Listen for language change events
    const handleLanguageChange = () => {
      const selectedLanguage = getLanguageFromLocalStorage();
      setLanguage(selectedLanguage);
    };

    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };

  }, []);


  const handleClick = () => {
    
    // Save the audio current time to localStorage
    const audioRef = document.querySelector('audio'); // Get the audio element
    if (audioRef) {
      localStorage.setItem('audioCurrentTime', JSON.stringify(audioRef.currentTime));
    }

    router.push("/question1_perfume"); // Navigates to /question1
  };

  // useEffect(() => {
  //   const userId = getUniqueUserId();  // Get or create a unique user ID

  //   if (userId) {
  //     // Track game start
  //     const startTime = new Date().toISOString();
  //     localStorage.setItem('gameStartTime', startTime);  // Save the game start time in localStorage
  //   }

  //   const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
  //   const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    
  //   // Measure page load response time
  //   const startTime = performance.now();

  //   const sendPageView = () => {
  //     const responseTime = performance.now() - startTime; // Calculate response time
  //     fetch('/api/page-views', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId,
  //         page: 'Start Game Page',
  //         deviceType,
  //         channel,
  //         responseTime, // Include the response time
  //       }),
  //     });

  //     fetch('/api/page-response', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId,
  //         page: 'Start Game Page',
  //         deviceType,
  //         channel,
  //         responseTime, // Include the response time
  //       }),
  //     });
  //   };

  //   // Debounce the call to avoid multiple requests
  //   const timeoutId = setTimeout(sendPageView, 300);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative flex overflow-hidden flex-col mx-auto w-full min-h-screen bg-slate-900 max-w-[480px]">
        
        {/* Language Selector */}
        <div className="absolute flex z-10 mt-4 ml-4 justify-between">
            <LanguageSelector />
        </div>
       
        <div className="relative h-[550px] w-full">
        {/* image */}
          <div className="absolute">
            <img
              src="/images_perfume/quiz/valentine_background.png"
              alt="Perfume quiz"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-5 left-0 right-0 text-center font-bold text-white">
            <pre className={`text-7xl ${waterfall.className}`}>
            {translations[language].quiz.valentine}
            </pre>
            <pre className={`text-3xl ${waterfall.className}`}>
            {translations[language].quiz.year}
            </pre>
          </div>
          
        </div>


        <div className="relative w-full bg-slate-900">
          
          {/* Layer 1 */}
          {/* Background image 1 */}
          <div className="absolute top-4 right-0">
            <img
              src="/images_perfume/quiz/image 17.png"
              className="object-cover"
              alt="Option background"
            />
            
          </div>

          {/* Background image 2 */}
          <div className="absolute top-20 right-24">
            <img
              src="/images_perfume/quiz/image 18.png"
              className="object-cover"
              alt="Option background"
            />
          </div>

          {/* Background image 3 */}
          <div className="absolute bottom-30 left-10">
            <img
              src="/images_perfume/quiz/image 19.png"
              className="object-cover"
              alt="Option background"
            />
          </div>

          {/* Background image 4 */}
          <div className="absolute top-20">
            <img
              src="/images_perfume/quiz/image 20.png"
              className="object-cover"
              alt="Option background"
            />
          </div>


          {/* Layer 2: Question Container */}
          <div className="relative z-10 px-10 pt-14 pb-4">
            
            {/* Question */}
            <h1 className={`${language=='English' ?'text-5xl':'text-7xl'} text-center font-bold text-white ${wendyone.className}`}>
              {translations[language].quiz.title}
            </h1>

            <h1 className={`mt-2 mb-14 text-xl text-center font-bold text-white ${wendyone.className}`}>
              {translations[language].quiz.subtitle}
            </h1>

            {/* Start button with background */}
            <div className="relative flex justify-center items-center ">
                
                {/* Button background*/}
                <img
                  src="/images_perfume/quiz/Ellipse 1.png"
                  alt="Ellipse Background"
                  className="w-60 h-auto transform absolute"
                />
                <img
                  src="/images_perfume/quiz/Ellipse 2.png"
                  alt="Ellipse Background"
                  className="w-60 h-auto transform absolute opacity-80"
                />
                {/* Let's Start Button */}
                <p
                  onClick={handleClick}
                  className={`relative text-3xl text-black px-6 py-2 font-bold h-12 ${wendyone.className} hover:text-white hover:scale-110 transition-transform duration-200 cursor-pointer`}
                >
                  {translations[language].quiz.startButton}
                </p>
              </div>
          </div>

          {/* Copyright */}  
          <div className="mt-14 mb-6 text-xs opacity-75 text-center text-white">
              Copyright © {translations[language].quiz.copyright}. All rights reserved.
          </div>
        </div> 
      </div>
    </>
  );
};

export default QuizPage;
