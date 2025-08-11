import React from 'react';
import { useNavigate } from 'react-router-dom';

type NavigateBtnProps = {
  to: string;
  label?: React.ReactNode;
  className?: string;
};

function NavigateBtn({ to, label = "Go", className = "" }: NavigateBtnProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
    className={`px-4 py-2 rounded text-white font-semibold transition 
  bg-gradient-to-r from-[#F47C7C] to-[#EF9F9F]
  hover:from-[#F47C7C] hover:to-[#EF9F9F] 
  shadow-md hover:shadow-lg ${className}`}
    >
      {label}
    </button>
  );
}

export default NavigateBtn;
