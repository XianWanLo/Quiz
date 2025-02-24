// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, waterfall } from "../components/font";
import { useEffect, useState } from "react";
import translations from "../components/translations"; // Import translations
import { usePageTracking } from "../hooks/usePageTracking";
import LanguageSelector from "../components/languageselector";


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

  // Page view & response time tracking
  usePageTracking("Start Page")

  // Language components
  useEffect(() => {
    //setLanguage(getLanguageFromLocalStorage()); // Get the selected language from localStorage

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

  // Initialise MBTI Scores for each player
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
  }, []);

  // Audio Components
  useEffect(() => {
    localStorage.setItem('audioPlaying', 'false'); // Update local storage
    localStorage.setItem('audioCurrentTime',JSON.stringify(0)); // Update local storage
  }, []);

  const handleClick = () => {
      
    // Save the audio current time to localStorage
    const audioRef = document.querySelector('audio'); // Get the audio element
    if (audioRef) {
      localStorage.setItem('audioCurrentTime', JSON.stringify(audioRef.currentTime));
    }
    router.push("/question1_perfume"); // Navigates to /question1
  };


  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-slate-900">

      <div className="relative overflow-hidden flex flex-col mx-auto w-full max-w-[480px]">
       
        <div className="relative h-[60vh]">
        {/* image */}
          <div className="absolute z-0">
            <img
              src="/images_perfume/quiz/valentine_background.png"
              alt="Perfume quiz"
              className="object-cover"
            />
          </div>

          <div className="relative z-10">

            {/* Language Selector */}
            <div className="relative h-[10vh] flex justify-start">
                <LanguageSelector/>
            </div>

            <div className="relative h-[50vh] flex flex-col justify-end items-center font-bold text-white">
              <pre className={`text-7xl ${waterfall.className}`}>
              {translations[language].quiz.valentine}
              </pre>
              <pre className={`text-3xl ${waterfall.className}`}>
              {translations[language].quiz.year}
              </pre>
            </div>

          </div>
          
        </div>


        <div className="relative h-[40vh] bg-slate-900">
          
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
          <div className="relative z-10 mx-14">
            
            <div className="h-[20vh] flex flex-col items-center justify-center text-center font-bold text-white">
              {/* Question */}
              <h1 className={`${language=='English' ?'text-4xl':'text-6xl'} ${wendyone.className}`}>
                {translations[language].quiz.title}
              </h1>

              <h1 className={`text-xl ${wendyone.className}`}>
                {translations[language].quiz.subtitle}
              </h1>
            </div>

            {/* Start button with background */}
            <div className="h-[15vh] flex justify-center items-center ">
                
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

              {/* Copyright */}  
              <div className="h-[5vh] flex items-end justify-center">
                  <h1 className="mb-2 text-xs opacity-75 text-white">
                    Copyright © {translations[language].quiz.copyright}. All rights reserved.
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
