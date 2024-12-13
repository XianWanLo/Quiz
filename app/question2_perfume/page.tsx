// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { useEffect, useState } from "react";
import translations from "../components/translations";
import { usePageTracking } from "../hooks/usePageTracking";

const getLanguageFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as 'English' | 'Chinese' || 'English';
  }
  return 'English';
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  usePageTracking();

  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    setLanguage(storedLanguage);
  }, []);

  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer = '';

    if (option === 'Option 1') {
      numbersToSave = [1, 3, 6];
      answer = 'Emotional expression';
      setSelectedChoice(0);
    } else if (option === 'Option 2') {
      numbersToSave = [2, 4, 9];
      answer = 'Linguistic structure';
      setSelectedChoice(1);
    }

    localStorage.setItem('question2', JSON.stringify(numbersToSave));

    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('uniqueUserId'),
        questionId: translations[language].quiz2.question,
        selectedAnswer: answer,
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
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex overflow-hidden flex-col mx-auto w-full text-center text-white bg-white max-w-[480px]">
        <img
          src="/images_perfume/question2/background.png"
          alt="Quiz question visual"
          className="object-contain w-full aspect-[0.75]"
        />
        <div className="flex flex-col py-7 pr-5 pl-9 w-full bg-slate-900">
          <div className="self-center text-xl leading-7">
            {translations[language].quiz2.question}
          </div>
          <div className="flex gap-9 self-start mt-6 text-sm leading-4">
            <button
              onClick={() => handleOptionClick("Option 1")}
              className={`p-6 rounded-[35px] transition-colors duration-200 cursor-pointer ${
                selectedChoice === 0 ? "bg-purple-500" : "bg-zinc-400 hover:bg-zinc-500"
              }`}
            >
              {translations[language].quiz2.option1}
            </button>
            <button
              onClick={() => handleOptionClick("Option 2")}
              className={`p-6 rounded-[35px] transition-colors duration-200 cursor-pointer ${
                selectedChoice === 1 ? "bg-purple-500" : "bg-zinc-400 hover:bg-zinc-500"
              }`}
            >
              {translations[language].quiz2.option2}
            </button>
          </div>
          <div className="self-end mt-7 text-7xl leading-none">
            <span className="text-purple-300">2</span>/8
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;