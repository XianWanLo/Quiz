"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { stintultra, patrickhand } from "../components/font";
import { useEffect, useState } from "react";
import translations from "../components/translations";
//import { usePageTracking } from "../hooks/usePageTracking";
import AudioPlayer from '../components/audioPlayer';


const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English');


  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    setLanguage(storedLanguage);
  }, []);

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

      // Save the audio current time to localStorage
      const audioRef = document.querySelector('audio'); // Get the audio element
      if (audioRef) {
        localStorage.setItem('audioCurrentTime', JSON.stringify(audioRef.currentTime));
      }

    } 

    // fetch('/api/question-response', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: localStorage.getItem('uniqueUserId'),
    //     questionId: translations[language].quiz1.question,
    //     selectedAnswer: option,
    //   }),
    // });

    router.push("/question2_perfume");
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/*Main Container*/}
      <div className="relative flex overflow-hidden flex-col mx-auto w-full bg-white min-h-screen max-w-[480px]">
      
        {/* image */}
        <div className="h-[630px]">
          <img
            src="/images_perfume/question1/background.png"
            alt="Perfume quiz"
            className="object-cover w-full"
          />
        </div>

        {/* Question container with option background */}
        <div className="relative pt-5 pr-5 pl-2.5 w-full bg-slate-900">
          {/* Layer 1: Option background image (positioned absolutely) */}
          <div className="absolute z-0 inset-y-2 left-2 w-2/5">
            <img
              src="/images_perfume/question1/option1.png"
              className="object-cover w-full h-full"
              alt="Option background"
            />
          </div>

          {/* Layer 2: Content (positioned relatively to appear above background) */}
          <div className="relative z-10 inset-y-1">
            {/* Question at the top - added fixed width/height container */}
            <div className="w-[340px] h-[94px] mx-auto flex items-center justify-center mb-12">
              <h1 className={`text-3xl font-bold text-center text-white ${patrickhand.className}`}>
                {translations[language].quiz1.question}
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
                {translations[language].quiz1.option1}
                </h1>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => handleOptionClick("Option 2")}
                className="flex items-center px-5 py-6 bg-[#9B80B4] hover:bg-[#8A71A3] rounded-[35px] cursor-pointer text-white text-m text-center transition-colors w-1/2"
              >
               <h1 className={`text-white text-m text-center`}>
                  {translations[language].quiz1.option2}
                </h1>
              </div>
            </div>

            {/* Question counter - aligned to bottom right */}
            <div className="flex justify-end text-7xl leading-none text-white">
              <span className={`text-purple-300 ${stintultra.className}`}>1
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