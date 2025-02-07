"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand, whisper } from "../components/font";
import { useEffect, useState } from "react";
//import { usePageTracking } from "../hooks/usePageTracking";
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
  
  
  // Page view tracking
  useEffect(() => {
    
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
    const timer = setTimeout(() => {
      router.push('/result');  // Change '/nextPage' to your desired route
    }, 3000);  // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);  // Cleanup the timer on component unmount
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
        
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-slate-900">

              <div className="z-0 inset-y-1/2">
                <img
                  src="/images_perfume/loadingPage/background.png"
                  className="object-cover"
                  alt="Loading background"
                />
              </div>

              <div
                className="mt-5 text-center text-xl text-white cursor-pointer">
                <pre className={`text-4xl font-bold text-center text-white ${whisper.className}`}>
                {translations[language].loadingPage.prompt}
                </pre>
              </div>

          
        </div>
    </div>
    </>
  );
};

export default QuizPage;
