"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { wendyone, whisper, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import { usePageTracking } from "../hooks/usePageTracking";
import translations from "../components/translations"; // Import translations
import { quiz8 } from "../components/translations";
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
  const [showFinishMessage, setShowFinishMessage] = useState(false); // New state for the finish message
  const [selectedOption1, setSelectedOption1] = useState(false); // New state for selected option
  const [selectedOption2, setSelectedOption2] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(false);
  const [selectedOption5, setSelectedOption5] = useState(false);
  const [selectedOption6, setSelectedOption6] = useState(false);

  // Language Components
  useEffect(() => {
    setLanguage(getLanguageFromLocalStorage());  // Set language based on localStorage
  }, []);

  const questionFont = language === 'English' ? 'poetsen-one-regular' : 'noto_sans_sc';
  const questionFontSize = language === 'English' ? 'text-xl' : 'text-2xl';
  const optionFontSize = language === 'English' ? 'text-m' : 'text-l';


  // Page view & response time tracking
  usePageTracking("Cut Scene between 7 & 8")

  const handleOptionClick = (option: string) => {

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
      
      // Send response to the backend
      let option_list = [selectedOption1, selectedOption2, selectedOption3, selectedOption4, selectedOption5, selectedOption6];
      let selectedAnswers = [];

      for (let i=0; i<option_list.length; i++){
        if(option_list[i] === true){    
          selectedAnswers.push(quiz8[`option${i + 1}`]);
        }
      }

      fetch('/api/question-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: localStorage.getItem('uniqueUserId'),
            questionId: '8',
            questionContent: translations["English"].quiz8.question,
            selectedAnswer: selectedAnswers,
        }),
      }); 
    }

    router.push("/question_namePage");
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
            
        <div className="absolute z-0 w-full h-full">
          <img
            src="/images_perfume/question8/background.png"
            className="object-cover w-full h-full"
            alt="Option background"
          />
        </div>

        <div className="h-[90vh] relative flex-col z-10 mx-6">

            {/* Question at the top - added fixed width/height container */}
            <div className="h-[20vh] flex items-center justify-center">
              <h1 className={`question-text ${questionFont} ${questionFontSize}`}>
                {translations[language].quiz8.question}
              </h1>
            </div>

            <div className="h-[55vh] flex-col">

                {/* Options container*/}
                <div className="h-[18vh] flex relative items-center justify-center gap-4 text-white text-center text-2xl ">

                  <div 
                      onClick={() => handleOptionClick("Option1")}
                      className={`w-1/2 flex items-center justify-center rounded-[50px] px-6 py-6 ${selectedOption1 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50'} ${selectedOption1 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'} cursor-pointer transition-colors`}>
                      <pre
                        className={`${patrickhand.className}`}> 
                        {translations[language].quiz8.option1}
                      </pre>
                  </div>

                  <div 
                      onClick={() => handleOptionClick("Option2")}
                      className={`w-1/2 flex items-center justify-center rounded-[50px] px-6 py-6 ${selectedOption2 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50'}  ${selectedOption2 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                      <pre
                        className={`${patrickhand.className}`}> 
                        {translations[language].quiz8.option2}
                      </pre>
                  </div>

                </div>

                <div className="h-[18vh] flex relative items-center justify-center gap-4 text-white text-center text-2xl">

                  <div 
                      onClick={() => handleOptionClick("Option3")}
                      className={`w-1/2 flex items-center justify-center rounded-[50px] px-6 py-6 ${selectedOption3 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption3 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                      <pre
                        className={` ${patrickhand.className}`}> 
                        {translations[language].quiz8.option3}
                      </pre>
                  </div>

                  <div 
                      onClick={() => handleOptionClick("Option4")}
                      className={`w-1/2 flex items-center justify-center rounded-[50px] px-6 py-6 ${selectedOption4 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption4 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                      <pre
                        className={`${patrickhand.className}`}> 
                        {translations[language].quiz8.option4}
                      </pre>
                  </div>

                </div>

                <div className="h-[18vh] flex relative items-center justify-between gap-4 text-white text-center text-2xl">

                  <div 
                      onClick={() => handleOptionClick("Option5")}
                      className={`w-1/2 flex items-center justify-center rounded-[50px] px-6 py-6 ${selectedOption5 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption4 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                      <pre
                        className={`${patrickhand.className}`}> 
                        {translations[language].quiz8.option5}
                      </pre>
                  </div>

                  <div 
                      onClick={() => handleOptionClick("Option6")}
                      className={`w-1/2 flex items-center justify-center rounded-[50px] px-6 py-6 ${selectedOption6 ? 'bg-[#8A71A3]' : 'bg-[#9B80B4] bg-opacity-50 '}  ${selectedOption5 ? 'hover:bg-[#9B80B4]' : 'hover:bg-[#8A71A3]'}  cursor-pointer transition-colors`}>
                      <pre
                        className={`${patrickhand.className}`}> 
                        {translations[language].quiz8.option6}
                      </pre>
                  </div>

                </div>

            </div>

            {showFinishMessage && (
            <div
              onClick={() => finishClick()}
              className="h-[15vh] flex items-center justify-center text-center text-white font-bold cursor-pointer">
                <pre className={`${language=='English' ?'text-5xl':'text-3xl'} ${whisper.className} white-shadow`}>
                {translations[language].quiz8.finishButton}
                </pre>
            </div>
            )}
          
        </div>
        
      {/* Footer - aligned to bottom right */}
      <Footer pageNum={8} totalPages={8}/>

      </div>

      </div>
    </>
  );
};

export default QuizPage;
