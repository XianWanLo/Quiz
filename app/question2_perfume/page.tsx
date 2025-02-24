// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import { wendyone, stintultra, patrickhand } from "../components/font";
import Head from "next/head";
import { useEffect, useState } from "react";
import translations from "../components/translations";
import Footer from "../components/footer";
import { usePageTracking } from "../hooks/usePageTracking";
import "../globals.css"


const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');
  
  const questionFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';
  const questionFontSize = language === 'English' ? 'text-xl' : 'text-2xl';

  // Page view & response time tracking
  usePageTracking("Question 2 Page")

  // Language components
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

    let selectedAnswers = [];
    selectedAnswers.push(option==='Option 1' ? translations["English"].quiz2.option1:translations["English"].quiz2.option2)

    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('uniqueUserId'),
        questionId: '2',
        questionContent: translations["English"].quiz2.question,
        selectedAnswer: selectedAnswers
      }),
    });

    setTimeout(() => {
      router.push("/question3_perfume");
    }, 300); // Small delay to show selection state
  };


  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-slate-900">

      {/* Main container*/}
      <div className="relative flex overflow-hidden flex-col mx-auto w-full max-w-[480px]">

        {/* image */}
        <div className="relative h-[60vh]">
          <img
            src="/images_perfume/question2/background.png"
            alt="Perfume quiz"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Question container with option background */}
        <div className="relative h-[30vh] pr-5 pl-5 bg-slate-900">
          {/* Layer 1: Option background image (positioned absolutely) */}
          <div className="absolute inset-y-2 left-2 w-2/5">
            <img
              src="/images_perfume/question1/option1.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          {/* Layer 2: Content (positioned relatively to appear above background) */}
          <div className="relative z-10">
            {/* Question at the top - added fixed width/height container */}
            <div className="h-[15vh] flex items-center justify-center">
              <h1 className={`question-text ${questionFont} ${questionFontSize}`}>
                {translations[language].quiz2.question}
              </h1>
            </div>

            {/* Options container - side by side */}
            <div className="h-[15vh] flex mx-4 gap-10 option-text">
              {/* Option 1 */}
              <div 
                onClick={() => handleOptionClick("Option 1")}
                className="horizontal-option-button"
              >
                <h1>
                {translations[language].quiz2.option1}
                </h1>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="horizontal-option-button"
              >
               <h1>
                  {translations[language].quiz2.option2}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - aligned to bottom right */}
        <Footer pageNum={2} totalPages={8}/>
      </div>
      </div>
    </>
  );
};

export default QuizPage;