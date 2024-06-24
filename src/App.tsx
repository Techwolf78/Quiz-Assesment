import { useState, useEffect } from 'react';
import Slider from './components/Slider';
import Header from './components/Header';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sliderValues, setSliderValues] = useState(new Array(5).fill(0)); // Default to "Empty"

  const totalQuestions = 5;
  const progress = (currentQuestion / totalQuestions) * 100;

  useEffect(() => {
    // Clear local storage on component mount
    localStorage.removeItem('sliderValues');
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

    setTimeout(() => {
      if (value !== 0) {
        handleNext();
        // Reset the slider to the empty position for the next question
        setSliderValues((prev) => 
          prev.map((v, i) => (i === currentQuestion ? 0 : v))
        );
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <Header />
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-5xl w-full">
        <div className="flex justify-center mb-20">
          <div className="relative w-1/4">
            <div
              className="absolute top-0 z-10 left-0 h-1.5 bg-teal-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-teal-500 text-xl font-bold text-center">
              IDEALISTIC
            </span>
          </div>
          {/* Dummy progress bars */}
          <div className="relative w-1/4 ml-6">
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-gray-500 text-xl font-bold text-center">
            DISILLUSIONED
            </span>
          </div>
          <div className="relative w-1/4 ml-6">
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-gray-500 text-xl font-bold text-center">
            CYNICAL
            </span>
          </div>
          <div className="relative w-1/4 ml-6">
            <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full rounded"></div>
            <span className="block mt-4 text-gray-500 text-xl font-bold text-center">
            HOPEFUL
            </span>
          </div>
        </div>
        <div className="text-center text-gray-500 mb-4">
          {currentQuestion}/{totalQuestions}
        </div>
        <div className="text-center text-lg font-semibold mb-20">
          I have ambitious aims of making a difference.
        </div>
        <Slider
          value={sliderValues[currentQuestion - 1]}
          onChange={handleSliderChange}
        />
        <div className="flex justify-between mt-20">
          <button className="text-teal-500" onClick={handlePrev}>
            &larr; PREV
          </button>
          <button className="text-teal-500" onClick={handleNext}>
            NEXT &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
