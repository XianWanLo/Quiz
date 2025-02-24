// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import Footer from "../components/footer";
import translations from "../components/translations";  // Import translations


const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English'; 
  }
  return 'English';   
};

const QuizPage: React.FC = () => {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');  // State to store selected language
  const router = useRouter();

  //Language Components
  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
    console.log('Language');
  }, []);

  const questionFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';
  const questionFontSize = language === 'English' ? 'text-xl' : 'text-2xl';
  const optionFontSize = language === 'English' ? 'text-m' : 'text-l';


  // Page view & response time tracking (track only on mount)
  usePageTracking("Question 5 Page");

  const handleOptionClick = (option: string) => {
    
    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');

      // Update score according to user's choice 
      if (option === 'Option 1') {
        mbtiScores.N += 2;
      } else if (option === 'Option 2') {
        mbtiScores.S += 2;
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
          questionId: '5',
          questionContent: translations["English"].quiz5.question,
          selectedAnswer: selectedAnswers
      }),
    });

    router.push("/question6_perfume");
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
          
          <div className="relative flex-col mx-6">

            {/* Question at the top - added fixed width/height container */}
            <div className="h-[20vh] flex items-center justify-center">
              <h1 className={`question-text ${questionFont} ${questionFontSize}`}>
                {translations[language].quiz5.question}
              </h1>
            </div>

            {/* Options container*/}
            <div className="h-[70vh] md:mx-10">
              
              {/* Option 1 */}
              <div className="relative h-[30vh] flex items-center">
                
                <img
                    src="/images_perfume/question5/option1.png"
                    alt="Option 1"
                    className="z-10 absolute object-cover flex-shrink left-4 h-full"
                />

                <div 
                    onClick={() => handleOptionClick("Option 1")}
                    className="w-full mt-10 mx-8 px-6 py-6 bg-[#FCDDA6] hover:bg-[#FCDDA6] rounded-[50px] cursor-pointer transition-colors"
                  >
                    <pre
                      className={`text-black text-end ${optionFontSize} ${patrickhand.className}`}> 
                    {translations[language].quiz5.option1}
                    </pre>
                </div>
              </div>

              {/* Option 2 */}
              <div className="relative h-[30vh] flex items-center">
                
                <img
                  src="/images_perfume/question5/option2.png"
                  alt="Option 2"
                  className="z-10 absolute object-cover flex-shrink right-4 h-full"
                />

                <div 
                  onClick={() => handleOptionClick("Option 2")}
                  className="w-full mt-16 mx-8 px-6 py-6 bg-[#FCDDA6] hover:bg-[#FCDDA6] rounded-[50px] cursor-pointer transition-colors"
                >
                  <pre
                    className={`text-black text-start ${optionFontSize} ${patrickhand.className}`}> 
                  {translations[language].quiz5.option2}
                  </pre>
                </div>
              </div>
            </div>

            {/* Footer - aligned to bottom right */}
            <Footer pageNum={5} totalPages={8}/>
          </div>
      </div>
      </div>
    </>
  );
};

export default QuizPage;
