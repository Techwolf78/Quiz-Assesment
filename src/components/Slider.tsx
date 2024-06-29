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
      <div className="relative w-[90%] mx-auto">
        <input
          type="range"
          min="0"
          max="5"
          value={value}
          onChange={handleSliderChange}
          className="w-full appearance-none slider-thumb relative z-10"
          style={{
            background: "linear-gradient(to right, #00796b, #00796b)",
            height: "8px",
            borderRadius: "10px",
            outline: "none",
            boxShadow: "0px 0px 10px rgba(0, 121, 107, 0.3)",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center z-0 pointer-events-none">
          {[...Array(6)].map((_, index) => {
            const leftPosition = index === 5 ? `${index * 20 - 1}%` : `${index * 20}%`; // Adjusted left position for the last dot
            if (index !== 0) {
              return (
                <div
                  key={index}
                  className={`h-4 w-4 rounded-full ${index === value ? 'bg-teal-500' : 'bg-transparent border-2 border-teal-500'}`}
                  style={{
                    position: "absolute",
                    left: leftPosition,
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    zIndex: 20,
                    boxShadow: "0px 0px 5px rgba(0, 121, 107, 0.3)",
                    transition: "left 0.3s ease-in-out",
                  }}
                ></div>
              );
            }
            return null; // Skip rendering the first empty dot
          })}
        </div>
      </div>
      <div className="flex justify-between text-xs sm:text-sm mt-2 slider-labels">
        <span className="w-1/6"></span>
        <span className="w-1/6 text-center">Strongly Disagree</span>
        <span className="w-1/6 text-center">Disagree</span>
        <span className="w-1/6 text-center">Neutral</span>
        <span className="w-1/6 text-center">Agree</span>
        <span className="w-1/6 text-center">Strongly Agree</span>
      </div>
    </div>
  );
};

export default Slider;

