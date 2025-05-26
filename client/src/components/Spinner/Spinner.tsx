import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="relative w-2 h-2">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="absolute w-1/2 h-[150%] bg-black"
          style={{
            transform: `rotate(${(index + 1) * 36}deg) translate(0, 150%)`,
            animation: `spinner-animation 1s ${(index + 1) * 0.1}s infinite ease`,
          } as React.CSSProperties}
        ></div>
      ))}
    </div>
  );
};

export default Spinner;

