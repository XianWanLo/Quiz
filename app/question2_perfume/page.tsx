// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import { wendyone, stintultra, patrickhand } from "../components/font";
import Head from "next/head";
import { useEffect, useState } from "react";
import translations from "../components/translations";
//import { usePageTracking } from "../hooks/usePageTracking";


const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    setLanguage(storedLanguage);
  }, []);

  const handleOptionClick = (option: string) => {
    
    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');

      // Update score according to user's choice 
      if (option === 'Option 1') {
        mbtiScores.F += 1;
      } else if (option === 'Option 2') {
        mbtiScores.T += 1;
      }

      // Update MBTI scores in localStorage
      localStorage.setItem('mbtiScores', JSON.stringify(mbtiScores));
    }

    // fetch('/api/question-response', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: localStorage.getItem('uniqueUserId'),
    //     questionId: translations[language].quiz2.question,
    //     selectedAnswer: option,
    //   }),
    // });

    setTimeout(() => {
      router.push("/question3_perfume");
    }, 300); // Small delay to show selection state
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Main container*/}
      <div className="relative flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">

        {/* image */}
        <div className="h-[630px]">
          <img
            src="/images_perfume/question2/background.png"
            alt="Perfume quiz"
            className="object-cover w-full"
          />
        </div>

        {/* Question container with option background */}
        <div className="relative pt-5 pr-5 pl-2.5 w-full bg-slate-900">
          {/* Layer 1: Option background image (positioned absolutely) */}
          <div className="absolute inset-y-2 left-2 w-2/5">
            <img
              src="/images_perfume/question1/option1.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          {/* Layer 2: Content (positioned relatively to appear above background) */}
          <div className="relative z-10 inset-y-3">
            {/* Question at the top - added fixed width/height container */}
            <div className="w-[360px] h-[94px] mx-auto flex items-center justify-center mb-12">
              <h1 className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].quiz2.question}
              </h1>
            </div>

            {/* Options container - side by side */}
            <div className="flex gap-8 mb-8">
              {/* Option 1 */}
              <div 
                onClick={() => handleOptionClick("Option 1")}
                className="flex items-center px-5 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer transition-colors w-1/2"
              >
                <h1 className={`text-white text-m text-center`}>
                {translations[language].quiz2.option1}
                </h1>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="flex items-center px-5 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-m text-center transition-colors w-1/2"
              >
               <h1 className={`text-white text-m text-center`}>
                  {translations[language].quiz2.option2}
                </h1>
              </div>
            </div>

            {/* Question counter - aligned to bottom right */}
            <div className="flex justify-end text-7xl leading-none text-white">
              <span className={`text-purple-300 ${stintultra.className}`}>2
              </span>
              <span className={` ${stintultra.className}`}>/8
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;