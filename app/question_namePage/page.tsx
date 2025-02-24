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
  return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');  // State to store selected language
  const router = useRouter();

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  // Page view & response time tracking
  usePageTracking("Name Page")

  const handleOptionClick = (option: string) => {

    const nameInput = (document.getElementById("nameInput") as HTMLInputElement).value; // Get the input value
    localStorage.setItem('userName', nameInput); // Save the name to local storage
    
    // Send response to the backend
    // fetch('/api/question-response', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: getUniqueUserId(),
    //     questionId: 'If you have the opportunity to participate in an activity with your dog, what interests you the most?'
    //   }),
    // });


    router.push("/question_loadingPage");
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

      {/*Main Container*/}
      <div className="relative flex overflow-hidden flex-col mx-auto w-full max-w-[480px]">
        
        <div className="h-[100vh] flex items-center justify-center">
            
          <div className="absolute z-0">
            <img
              src="/images_perfume/namePage/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="relative z-10 px-8 py-6 mx-20 rounded-2xl border-2 border-purple-300 bg-purple-300 bg-opacity-40">

            <pre 
              className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
              {translations[language].namePage.prompt}
            </pre>

            <input
              id="nameInput"
              type="text"
              className="flex shrink-0 self-stretch mt-7 bg-white rounded-xl py-5 px-4"
              aria-label="Enter your name"
            />
            
            <div 
                onClick={() => handleOptionClick("Confirm")}
                className="mt-10 px-14 py-4 bg-purple-200 hover:bg-purple-400 rounded-[35px] cursor-pointer text-purple-700 text-2xl text-center transition-colors"
              >
                {translations[language].namePage.button}
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuizPage;
