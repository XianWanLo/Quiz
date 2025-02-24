"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { stintultra } from "../components/font";
import { useEffect, useState } from "react";
import translations from "../components/translations";
import {usePageTracking} from "../hooks/usePageTracking";
import Footer from "../components/footer";


const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');

  // Set Language
  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage()); // Get the selected language from localStorage
  }, []);

  const questionFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';
  const questionFontSize = language === 'English' ? 'text-xl' : 'text-2xl';

  // Page view & response time tracking
  usePageTracking("Question 1 Page")

  const handleOptionClick = (option: string) => {
    
    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      const mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');
      // Update score according to user's choice 
      if (option === 'Option 1') {
        mbtiScores.I += 2;
      } else if (option === 'Option 2') {
        mbtiScores.E += 2;
      }
      // Update MBTI scores in localStorage
      localStorage.setItem('mbtiScores', JSON.stringify(mbtiScores));
    }
    
    let selectedAnswers = [];
    selectedAnswers.push(option==='Option 1' ? translations["English"].quiz1.option1:translations["English"].quiz1.option2)
  
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('uniqueUserId'),
        questionId: '1',
        questionContent: translations["English"].quiz1.question,
        selectedAnswer: selectedAnswers
      }),
    });

    router.push("/question2_perfume");
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

      {/*Main Container*/}
      <div className="relative flex overflow-hidden flex-col mx-auto w-full max-w-[480px]">
      
        {/* image */}
        <div className="relative h-[60vh]">
          <img
            src="/images_perfume/question1/background.png"
            alt="Perfume quiz"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Question container with option background */}
        <div className="relative h-[30vh] pr-5 pl-5 bg-slate-900">
          {/* Layer 1: Option background image (positioned absolutely) */}
          <div className="absolute z-0 inset-y-2 left-2 w-2/5">
            <img
              src="/images_perfume/question1/option1.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          {/* Layer 2: Content (positioned relatively to appear above background) */}
          <div className="relative z-10">
            {/* Question at the top - added fixed width/height container */}
            <div className="h-[12vh] flex items-center justify-center">
              <h1 className={`question-text ${questionFont} ${questionFontSize}`}>
                {translations[language].quiz1.question}
              </h1>
            </div>

            {/* Options container - side by side */}
            <div className="h-[18vh] flex mx-4 gap-10">
              {/* Option 1 */}
              <div 
                onClick={() => handleOptionClick("Option 1")}
                className="horizontal-option-button"
              >
                <h1>
                {translations[language].quiz1.option1}
                </h1>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="horizontal-option-button"
              >
               <h1>
                  {translations[language].quiz1.option2}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - aligned to bottom right */}
        <Footer pageNum={1} totalPages={8}/>
      </div>  
      </div>
    </>
  );
};

export default QuizPage;