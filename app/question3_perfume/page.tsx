// File: pages/quiz.tsx
"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import translations from "../components/translations"; // Import translations
import Footer from "../components/footer";
import { usePageTracking } from "../hooks/usePageTracking";
import Image from 'next/image';
import Loading from '../components/loading'; 


const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
  }
  return 'English';
};

// This is a simple fallback for data fetching or component loading
function QuizContent() {
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English'); // State for language
  const router = useRouter();
  const questionFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';
  const questionFontSize = language === 'English' ? 'text-xl' : 'text-2xl';
  const optionFontSize = language === 'English' ? 'text-m' : 'text-l';
  
  
  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage()); // Get the selected language from localStorage
  }, []);


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
    
      <div className="bg-slate-900">

        <div className="relative flex overflow-hidden flex-col mx-auto w-full max-w-[480px]">
            
          <div className="absolute z-0 w-full h-full">
            <Image
              src="/images_perfume/question3/background.png"
              className="object-cover"
              alt="Option background"
              layout="fill"
              priority
            />
          </div>

          <div className="h-[90vh] relative z-10 flex-col mx-6 ">

            {/* Question at the top - added fixed width/height container */}
            <div className="h-[15vh] flex items-center justify-center">
              <h1 className={`question-text ${questionFont} ${questionFontSize}`}>
                {translations[language].quiz3.question}
              </h1>
            </div>

            <div className="h-[75vh] flex flex-col items-center justify-center mx-4 gap-4">
              <div>
                <Image
                  src="/images_perfume/question3/option1.png"
                  alt="Option 1"
                  width={185}
                  height={187}
                  priority
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 1")}
                className={`mx-4 vertical-option-button ${optionFontSize} patrick-hand`}
              >
                {translations[language].quiz3.option1}
              </div>

              {/* Option 2 */}
              <div>
                <Image
                  src="/images_perfume/question3/option2.png"
                  alt="Option 2"
                  width={185}
                  height={187}
                  priority
                />
              </div>

              <div 
                onClick={() => handleOptionClick("Option 2")}
                className={`mx-4 vertical-option-button ${optionFontSize} patrick-hand`}
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


const QuizPage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Stint+Ultra+Condensed&family=Wendy+One&family=Whisper&family=Waterfall&family=Noto+Sans+SC:wght@400&display=swap&Poetsen+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Suspense for lazy loading components */}
      <Suspense fallback={<Loading />}>
        <QuizContent />
      </Suspense>
    </>
  );
};

export default QuizPage;