import React, { useState, useEffect } from "react";
import Slider from "./components/Slider";
import Header from "./components/Header";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sliderValues, setSliderValues] = useState<number[]>(() => {
    const storedValues = Array.from({ length: 4 }, () => 0);
    return storedValues;
  });
  const [progress, setProgress] = useState(0); // Initialize progress to 0

  const totalQuestions = 4;

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSliderValue(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSliderValue(currentQuestion);
    }
  };

  const setSliderValue = (questionIndex: number) => {
    const storedValue = localStorage.getItem(`sliderValue-${questionIndex}`);
    if (storedValue) {
      setSliderValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[questionIndex - 1] = Number(storedValue);
        return newValues;
      });
    } else {
      setSliderValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[questionIndex - 1] = 0;
        return newValues;
      });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[currentQuestion - 1] = newValue;
      localStorage.setItem(
        `sliderValue-${currentQuestion}`,
        newValue.toString()
      );
      return newValues;
    });

    const newProgress = (currentQuestion / totalQuestions) * 100;
    setProgress(newProgress); // Update the progress state

    setTimeout(() => {
      handleNext();
    }, 500);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const questions = [
    "I have ambitious aims of making a difference.",
    "My leadership journey has progressed as I anticipated.",
    "I have spent fewer than 4 years in full time service or ministry.",
    "With hard work and determination, I have been able to persevere through the ministry challenges that have come my way.",
  ];

  const progressBars = [
    {
      title: "IDEALISTIC",
      color: "teal-500",
      value: progress, // Use the updated progress state
    },
    {
      title: "DISILLUSIONED",
      color: "blue-500",
      value: progress, // Use the updated progress state
    },
    {
      title: "CYNICAL",
      color: "green-500",
      value: progress, // Use the updated progress state
    },
    {
      title: "HOPEFUL",
      color: "yellow-500",
      value: progress, // Use the updated progress state
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <Header />
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-5xl w-full">
        <div className="flex justify-center mb-20 space-x-4">
          {progressBars.map((bar, index) => (
            <div key={index} className="relative w-1/4">
              <div
                className={`absolute top-0 z-10 left-0 h-1.5 bg-${bar.color} rounded`}
                style={{ width: `${bar.value}%` }} // Use the updated progress state
              ></div>
              <div className="absolute top-0 left-0 h-1.5 bg-gray-300 w-full text-center rounded"></div>
              <span
                className={`block mt-4 text-${bar.color} text-xl font-bold text-center`}
              >
                {bar.title}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center text-gray-500 mb-4">
          {currentQuestion}/{totalQuestions}
        </div>
        <div className="text-center text-lg font-semibold mb-20">
          {questions[currentQuestion - 1]}
        </div>
        <Slider
          value={sliderValues[currentQuestion - 1]}
          onChange={handleSliderChange}
        />

        <div className="flex justify-between mt-20">
          <button className="text-teal-500" onClick={handlePrev}>
            &larr; PREV
          </button>
          <button
            className={`text-teal-500 ${
              currentQuestion === totalQuestions
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={handleNext}
            disabled={currentQuestion === totalQuestions}
          >
            NEXT &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;