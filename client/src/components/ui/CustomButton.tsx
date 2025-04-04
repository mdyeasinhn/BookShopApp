import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-rose-500 text-white px-5 py-2 rounded-2xl font-semibold shadow-md transition duration-300 hover:bg-rose-600 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
