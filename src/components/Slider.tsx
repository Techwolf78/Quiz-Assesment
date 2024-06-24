import React from "react";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full relative">
      {/* Slider container */}
      <div className="relative w-[90%] mx-auto">
        <input
          type="range"
          min="0"
          max="5"
          value={value}
          onChange={handleSliderChange}
          className="w-full appearance-none slider-thumb relative z-10"
        />
        {/* Custom dots on slider */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center pointer-events-none z-0">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-3 w-3 bg-teal-500 rounded-full"
              style={{
                position: "absolute",
                left: `${(index + 1) * 20}%`,
                transform: "translate(-50%, -50%)",
                top: "50%",
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-sm mt-2">
        <span></span> {/* Placeholder for "Empty" */}
        <span>Strongly Disagree</span>
        <span>Disagree</span>
        <span>Neutral</span>
        <span>Agree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
};

export default Slider;
