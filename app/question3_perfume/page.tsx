// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import translations from "../components/translations"; // Import translations
import Footer from "../components/footer";
import { usePageTracking } from "../hooks/usePageTracking";



const getUniqueUserId = () => {
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('uniqueUserId');
    return userId;
  }
  return null;
};


const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English'); // State for language
  const router = useRouter();
  
  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage()); // Get the selected language from localStorage
  }, []);

  const questionFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';
  const questionFontSize = language === 'English' ? 'text-xl' : 'text-2xl';
  const optionFontSize = language === 'English' ? 'text-sm' : 'text-l';

  // Page view & response time tracking
  usePageTracking("Question 3 Page")

  const handleOptionClick = (option: string) => {
    
    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');

      // Update score according to user's choice 
      if (option === 'Option 1') {
        mbtiScores.N += 1;
      } else if (option === 'Option 2') {
        mbtiScores.S += 1;
      }

      // Update MBTI scores in localStorage
      localStorage.setItem('mbtiScores', JSON.stringify(mbtiScores));
    }

    let selectedAnswers = [];
    selectedAnswers.push(option==='Option 1' ? translations["English"].quiz3.option1:translations["English"].quiz3.option2)
    
    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          userId: localStorage.getItem('uniqueUserId'),
          questionId: '3',
          questionContent: translations["English"].quiz3.question,
          selectedAnswer: selectedAnswers
      }),
    });

    router.push("/question4_perfume");
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
          
          <div className="absolute z-0 w-full">
            <img
              src="/images_perfume/question3/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="h-[90vh] relative z-10 flex-col mx-6 ">

            {/* Question at the top - added fixed width/height container */}
            <div className="h-[15vh] flex items-center justify-center">
              <h1 className={`question-text ${questionFont} ${questionFontSize}`}>
                {translations[language].quiz3.question}
              </h1>
            </div>

            {/* Options container*/}
            <div className="h-[75vh] flex flex-col items-center justify-center gap-4">
              
              {/* Option 1 */}
              <div>
                <img
                  src="/images_perfume/question3/option1.png"
                  alt="Option 1"
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 1")}
                className={`vertical-option-button ${optionFontSize}`}
              >
                {translations[language].quiz3.option1}
              </div>

              {/* Option 2 */}
              <div>
                <img
                  src="/images_perfume/question3/option2.png"
                  alt="Option 2"
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 2")}
                className={`vertical-option-button ${optionFontSize}`}
              >
                {translations[language].quiz3.option2}
              </div>
            </div>

          </div>
          
          {/* Footer - aligned to bottom right */}
          <Footer pageNum={3} totalPages={8}/>
        </div> 
    </div>
    </>
  );
};

export default QuizPage;
