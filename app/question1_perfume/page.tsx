"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { useEffect, useState } from "react";
import translations from "../components/translations";
import { usePageTracking } from "../hooks/usePageTracking";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as 'English' | 'Chinese' || 'English';
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');


  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    setLanguage(storedLanguage);
  }, []);

  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer = '';

    if (option === 'Option 1') {
      numbersToSave = [1, 3, 5, 6];
      answer = 'Reflect alone';
    } else if (option === 'Option 2') {
      numbersToSave = [2, 7, 8, 9];
      answer = 'Discuss with others';
    }

    localStorage.setItem('question1_perfume', JSON.stringify(numbersToSave));

    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('uniqueUserId'),
        questionId: translations[language].quiz1.question,
        selectedAnswer: answer,
      }),
    });

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
      <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
        <img
          src="/images_perfume/question1/background.png"
          alt="Perfume quiz background"
        />
        <div className="pt-5 pr-5 pl-2.5 w-full bg-slate-900">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
              <div 
                onClick={() => handleOptionClick("Option 1")}
                className="flex relative flex-col grow justify-center items-start px-7 py-28 text-sm leading-4 text-center text-white aspect-[0.53] w-[179px] cursor-pointer"
              >
                <img
                  src="/images_perfume/question1/option1.png"
                  className="object-cover absolute inset-0 size-full"
                  alt="Option background"
                />
                <div className="relative px-5 py-6 bg-zinc-400 rounded-[35px]">
                  {translations[language].quiz1.option1}
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-1.5 text-center text-white">
                <h1 className="self-start text-xl leading-7">
                  {translations[language].quiz1.question}
                </h1>
                <div className="flex flex-col self-end mt-12 max-w-full w-[177px]">
                  <div 
                    onClick={() => handleOptionClick("Option 2")}
                    className="self-start px-2 pt-2.5 pb-6 text-sm leading-4 bg-zinc-400 rounded-[35px] cursor-pointer"
                  >
                    {translations[language].quiz1.option2}
                  </div>
                  <div className="self-end mt-7 text-7xl leading-none">
                    <span className="text-purple-300">1</span>/8
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;