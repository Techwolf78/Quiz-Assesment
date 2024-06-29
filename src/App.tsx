import { useState, useEffect } from "react";
import Slider from "./components/Slider";
import Header from "./components/Header";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sliderValues, setSliderValues] = useState(new Array(5).fill(0));

  const totalQuestions = 5;
  const progress = (currentQuestion / totalQuestions) * 100;

  const questions = [
    "I have ambitious aims of making a difference.",
    "I often think about how my actions affect others.",
    "I am confident in my ability to achieve my goals.",
    "With hard work and determination, I have been able to persevere<br>through the ministry challenges that have come my way.",
    "I value collaboration and teamwork.",
  ];

  useEffect(() => {
    localStorage.removeItem("sliderValues");
  }, []);

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSliderChange = (value: number) => {
    const updatedSliderValues = [...sliderValues];
    updatedSliderValues[currentQuestion - 1] = value;
    setSliderValues(updatedSliderValues);

    if (value !== 0) {
      setTimeout(() => {
        handleNext();
        setSliderValues((prev) =>
          prev.map((v, i) => (i === currentQuestion ? 0 : v))
        );
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <Header />
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-10 max-w-md sm:max-w-lg lg:max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row justify-center mb-10 lg:mb-20">
          <div className="relative w-full sm:w-1/4 mb-4 sm:mb-0">
            <div
              className="absolute top-0 z-10 left-0 h-1.5 bg-teal-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-teal-500 text-sm sm:text-lg lg:text-xl font-bold text-center">
              IDEALISTIC
            </span>
          </div>
          <div className="relative w-full sm:w-1/4 mb-4 sm:mb-0 sm:ml-6">
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-gray-500 text-sm sm:text-lg lg:text-xl font-bold text-center">
              DISILLUSIONED
            </span>
          </div>
          <div className="relative w-full sm:w-1/4 mb-4 sm:mb-0 sm:ml-6">
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-gray-500 text-sm sm:text-lg lg:text-xl font-bold text-center">
              CYNICAL
            </span>
          </div>
          <div className="relative w-full sm:w-1/4 mb-4 sm:mb-0 sm:ml-6">
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-gray-500 text-sm sm:text-lg lg:text-xl font-bold text-center">
              HOPEFUL
            </span>
          </div>
        </div>
        <div className="text-center text-red-500 text-sm sm:text-lg font-semibold mb-4">
          {currentQuestion}/{totalQuestions}
        </div>
        <div className="text-center text-sm sm:text-lg font-semibold mb-10 lg:mb-20 break-words">
          <span
            dangerouslySetInnerHTML={{ __html: questions[currentQuestion - 1] }}
          ></span>
        </div>
        <Slider
          value={sliderValues[currentQuestion - 1]}
          onChange={handleSliderChange}
        />
        <div className="flex justify-between mt-10 lg:mt-20">
          <button className="text-teal-500" onClick={handlePrev}>
            &larr; PREV
          </button>
          <button
            className={`text-teal-500 ${sliderValues[currentQuestion - 1] === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNext}
            disabled={sliderValues[currentQuestion - 1] === 0}
          >
            NEXT &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
