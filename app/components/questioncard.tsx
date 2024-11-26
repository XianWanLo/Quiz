interface QuestionCardProps {
    question: {
      image: string;
      text: string;
      options: string[];
    };
    onSelect: (option: string) => void;
  }
  
  const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect }) => {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4">
        <img src={question.image} alt="Question" className="w-full h-64 object-cover mb-4" />
        <p className="mb-4">{question.text}</p>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className="px-4 py-2 mb-2 bg-blue-500 text-white rounded"
          >
            {option}
          </button>
        ))}
      </div>
    );
  };
  
  export default QuestionCard;
  