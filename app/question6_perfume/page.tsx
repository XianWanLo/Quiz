"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations"; // Import translations
import Footer from "../components/footer";


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

  const questionFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';
  const questionFontSize = language === 'English' ? 'text-xl' : 'text-2xl';

  // Page view & response time tracking
  usePageTracking("Question 6 Page")

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
    selectedAnswers.push(option==='Option 1' ? translations["English"].quiz4.option1:translations["English"].quiz4.option2)
    
    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          userId: localStorage.getItem('uniqueUserId'),
          questionId: '6',
          questionContent: translations["English"].quiz6.question,
          selectedAnswer: selectedAnswers
      }),
    });

    router.push("/question7_perfume");
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

      {/* Main container*/}
      <div className="relative flex overflow-hidden flex-col mx-auto w-full max-w-[480px]">
        {/* image */}
        <div className="h-[60vh]">
          <img
            src="/images_perfume/question6/background.png"
            alt="Perfume quiz"
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Question container\*/}
        <div className="h-[30vh] relative pr-5 pl-5 bg-slate-900">

            {/* Question at the top - added fixed width/height container */}
            <div className="h-[12vh] flex items-center justify-center">
              <h1 className={`question-text ${questionFont} ${questionFontSize}`}>
                {translations[language].quiz6.question}
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
                {translations[language].quiz6.option1}
                </h1>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="horizontal-option-button"
              >
               <h1>
                  {translations[language].quiz6.option2}
                </h1>
              </div>
            </div>
        </div>
        {/* Footer - aligned to bottom right */}
        <Footer pageNum={6} totalPages={8}/>
      </div>
      </div>
    </>
  );
};

export default QuizPage;