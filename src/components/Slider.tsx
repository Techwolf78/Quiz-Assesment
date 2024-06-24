import React from 'react';

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max="4"
        value={value}
        onChange={handleSliderChange}
        className="w-[90%] flex items-center justify-center mx-auto"
      />
      <div className="flex justify-between text-sm mt-2">
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