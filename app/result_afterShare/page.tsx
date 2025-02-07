"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations"; // Import translations
import {imageMapAfterShare} from "../components/perfumes_info";


const getUniqueUserId = () => {
  let userId = localStorage.getItem('uniqueUserId');
  return userId;
};

const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
};


const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<"English" | "Traditional_Chinese" | "Simplified_Chinese">('English');  // State to store selected language
  const [MBTI, setMBTI] = useState<string | null>(null);
  const [nameID, setNameID] = useState<string | null>(null); 
  const router = useRouter();
  usePageTracking('/question8');  // This tracks the question8 page

  const userFirstName = localStorage.getItem('userName')?.split(' ')[0] || ''; // Save the name to local storage
  // Determine the result image based on the highest occurrence number and language
  const imageSrc = MBTI
  ? imageMapAfterShare[language][MBTI]
  : "/images_perfume/result/result_en/ESFP_after_en.png"; // Default fallback


  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
    setMBTI(localStorage.getItem('MBTI'));
    setNameID(userFirstName + "0001");

  }, []);

  const handleOptionClick = async () => {
    
    const email = (document.getElementById("emailInput") as HTMLInputElement)?.value;

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

      // Send the email to the backend for processing
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
              email, 
              userFirstName, 
              imageSrc 
        }),
      });

      if (response.ok) {
        alert("An email has been sent to your address.");
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again.");
    }

    router.push("/result");
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
      <div className="flex overflow-hidden flex-col mx-auto h-[1000px] bg-[#EAEEFF] max-w-[480px]">
        
        {/* Top section */}
        <div className="relative flex w-full items-center justify-between">
          <h1
            className="mt-4 ml-8 text-l text-gray-500 hover:bg-gray-200"
          >
            No. {nameID}
          </h1>

          <h1
            className="mt-4 mr-8 text-l text-gray-500 font-bold hover:bg-gray-200"
          >
           {translations[language].resultPage.prompt}
          </h1>
        </div>

        <div className="relative flex items-center justify-center w-full h-full">
            
          <div className="mt-5 absolute z-0 w-full h-full">
            <img
              src={imageSrc}
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="relative flex flex-col items-center justify-center px-4 py-4 mx-10 rounded-2xl border-2 border-purple-300 bg-purple-300 bg-opacity-60">

            <div 
              className={`mt-4 ${language=='English' ?'text-4xl':'text-3xl'} font-bold text-center text-white ${patrickhand.className}`}>
              {translations[language].afterSharePage.prompt}
            </div>

            <input
              id="emailInput"
              type="text"
              className="flex shrink-0 self-stretch mx-5 my-5 bg-white rounded-xl py-5 px-4"
              aria-label="Enter your email"
            />
            
            <div 
                onClick={() => handleOptionClick()}
                className={`px-10 py-4 bg-purple-200 hover:bg-purple-400 rounded-[35px] cursor-pointer text-purple-700 ${language=='English' ?'text-3xl':'text-2xl'} text-center transition-colors ${patrickhand.className}`}
              >
                {translations[language].afterSharePage.button}
            </div>

          </div>
        </div>

        {/* Bottom section with buttons */}
        <div className="relative w-full flex justify-around items-center p-5 bg-[#EAEEFF]">
          <button
            onClick={() => router.push("/result")}
            className="border border-gray-300 text-l text-gray-500 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            {translations[language].afterSharePage.returnButton}
          </button>

        </div>
    </div>
    </>
  );
};

export default QuizPage;
