"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, whisper, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
//import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations"; // Import translations
import { SlEarphones } from "react-icons/sl";


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
  //usePageTracking('/question8');  // This tracks the question8 page

  const [showFinishMessage, setShowFinishMessage] = useState(false); // New state for the finish message
  const [selectedOption1, setSelectedOption1] = useState(false); // New state for selected option
  const [selectedOption2, setSelectedOption2] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(false);
  const [selectedOption5, setSelectedOption5] = useState(false);
  const [selectedOption6, setSelectedOption6] = useState(false);

  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer = '';

    setShowFinishMessage(true);
    
    // Toggle the selected option state
    if (option === 'Option1') {
      setSelectedOption1(prev => !prev);
      
    } else if (option === 'Option2') {
      setSelectedOption2(prev => !prev);
      
    } else if (option === 'Option3') {
      setSelectedOption3(prev => !prev);

    } else if (option === 'Option4') {
      setSelectedOption4(prev => !prev);
  
    } else if (option === 'Option5') {
      setSelectedOption5(prev => !prev);
  
    } else if (option === 'Option6') {
      setSelectedOption6(prev => !prev);
    }

    localStorage.setItem('question8', JSON.stringify(numbersToSave));

    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: getUniqueUserId(),
        questionId: 'If you have the opportunity to participate in an activity with your dog, what interests you the most?',
        selectedAnswer: answer,
      }),
    });

  };

  const finishClick =() => {

    if (typeof window !== 'undefined') {
      // Retrieve current MBTI scores from LocalStorage
      let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores') || '{}');

      // update MBTI scores
      if (selectedOption3 === true){
        mbtiScores.T += 1
      }

      if (selectedOption6 === true){
        mbtiScores.F += 1
      }

      // update LocalStorage
      localStorage.setItem('mbtiScores', JSON.stringify(mbtiScores));
      
    }

    router.push("/question_namePage");
  };

  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  // Page view tracking
  // useEffect(() => {

  //   const userId = getUniqueUserId();
  //   const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
  //   const channel = document.referrer.includes('google') ? 'organic' : 'direct';

  //   const startTime = performance.now();

  //   const sendPageView = () => {
  //     const responseTime = performance.now() - startTime;
  //     fetch('/api/page-views', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId,
  //         page: 'Question 8 Page',
  //         deviceType,
  //         channel,
  //         responseTime,
  //       }),
  //     });

  //     fetch('/api/page-response', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId,
  //         page: 'Question 8 Page',
  //         deviceType,
  //         channel,
  //         responseTime,
  //       }),
  //     });
  //   };

  //   const timeoutId = setTimeout(sendPageView, 300);
  //   return () => clearTimeout(timeoutId);
  // }, []);

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
        
        <div className="relative w-full h-full bg-slate-900">
            
          <div className="absolute z-0 w-full h-full">
            <img
              src="/images_perfume/question8/background.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          <div className="flex flex-col relative z-10 pt-5 pr-8 pl-8">

            {/* Question at the top - added fixed width/height container */}
            <div className="mx-auto flex items-center justify-center mt-10">
              <h1 className={`text-4xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].quiz8.question}
              </h1>
            </div>

            <div className="flex relative justify-between mt-10 ml-2 mr-2">

              <div 
                  onClick={() => handleOptionClick("Option1")}
                  className={`flex items-center justify-center rounded-[50px] w-[190px] h-[150px] ${selectedOption1 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50'} ${selectedOption1 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'} cursor-pointer transition-colors`}>
                  <pre
                    className={`text-white text-center text-2xl ${patrickhand.className}`}> 
                    {translations[language].quiz8.option1}
                  </pre>
              </div>

              <div 
                  onClick={() => handleOptionClick("Option2")}
                  className={`flex items-center justify-center rounded-[50px] w-[190px] h-[150px] ${selectedOption2 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50'}  ${selectedOption2 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                  <pre
                    className={`text-white text-center text-2xl ${patrickhand.className}`}> 
                    {translations[language].quiz8.option2}
                  </pre>
              </div>

            </div>

            <div className="flex relative justify-between mt-10 ml-2 mr-2">

              <div 
                  onClick={() => handleOptionClick("Option3")}
                  className={`flex items-center justify-center rounded-[50px] w-[190px] h-[150px] ${selectedOption3 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption3 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                  <pre
                    className={`text-white text-center text-2xl ${patrickhand.className}`}> 
                    {translations[language].quiz8.option3}
                  </pre>
              </div>

              <div 
                  onClick={() => handleOptionClick("Option4")}
                  className={`flex items-center justify-center rounded-[50px] w-[190px] h-[150px] ${selectedOption4 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption4 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                  <pre
                    className={`text-white text-center text-2xl ${patrickhand.className}`}> 
                    {translations[language].quiz8.option4}
                  </pre>
              </div>

            </div>

            <div className="flex relative justify-between mt-10 ml-2 mr-2">

              <div 
                  onClick={() => handleOptionClick("Option5")}
                  className={`flex items-center justify-center rounded-[50px] w-[190px] h-[150px] ${selectedOption5 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption4 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                  <pre
                    className={`text-white text-center text-2xl ${patrickhand.className}`}> 
                    {translations[language].quiz8.option5}
                  </pre>
              </div>

              <div 
                  onClick={() => handleOptionClick("Option6")}
                  className={`flex items-center justify-center rounded-[50px] w-[190px] h-[150px] ${selectedOption6 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption5 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                  <pre
                    className={`text-white text-center text-2xl ${patrickhand.className}`}> 
                    {translations[language].quiz8.option6}
                  </pre>
              </div>

            </div>

            {showFinishMessage && (
            <div
              onClick={() => finishClick()}
              className="mt-20 text-center text-xl text-white cursor-pointer">
                <pre className={`mx-4 py-4 ${language=='English' ?'text-5xl':'text-3xl'} font-bold text-center text-white ${whisper.className} hover:bg-opacity-10 rounded-full hover:bg-purple-300 hover:backdrop-blur-md hover:shadow-lg`}>
                {translations[language].quiz8.finishButton}
                </pre>
            </div>
            )}


          </div>
        </div>
    </div>
    </>
  );
};

export default QuizPage;
