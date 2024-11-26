"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageSelector from '../components/languageselector';

interface Question {
  image: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    image: '/images/question1.jpg',
    text: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
  },
  // Add more questions here...
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const handleAnswerSelect = (answer: string) => {
    setAnswers([...answers, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Use search parameters instead of query
      const searchParams = new URLSearchParams();
      searchParams.set('answers', JSON.stringify([...answers, answer]));

      router.push(`/results?${searchParams.toString()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Mobile frame */}
      <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow-md">
        {/* Language Selector */}
        <div className="flex justify-between items-center mb-4">
          <LanguageSelector />
        </div>

        {/* Question Image */}
        <div className="w-full">
          <img src={questions[currentQuestion].image} alt="Question" className="w-full h-48 object-cover mb-4 rounded-lg" />
        </div>

        {/* Question Text */}
        <p className="mb-4 text-lg text-gray-800 text-center">
          {questions[currentQuestion].text}
        </p>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
