import { useRouter } from 'next/router';

const Results: React.FC = () => {
  const router = useRouter();
  const answers: string[] = JSON.parse(router.query.answers as string || '[]');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Your Answers</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index} className="mb-2">
            Question {index + 1}: {answer}
          </li>
        ))}
      </ul>
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
