import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const FlippingCard: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="relative overflow-hidden w-full max-w-xs h-60 rounded-3xl cursor-pointer text-2xl font-bold bg-[#125892] group">
      <div className="z-10 absolute w-full h-full peer" />

      <div className="absolute group-hover:-top-20 group-hover:-left-16 group-hover:w-[140%] group-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-[#00ADEE] transition-all duration-500" />

      <div
        className="absolute flex text-xl text-center items-end justify-end
          group-hover:right-0 group-hover:rounded-b-none group-hover:bottom-0
          group-hover:items-center group-hover:justify-center group-hover:w-full group-hover:h-full
          -bottom-32 -right-16 w-36 h-44 rounded-full bg-[#00ADEE]
          transition-all duration-500 overflow-hidden p-2"
      >
        <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-60 group-hover:opacity-100 transition-all duration-500 text-sm text-white whitespace-pre-line">
          {description}
        </div>
      </div>

      
      <div className="w-full h-full items-center justify-center flex uppercase text-white px-4 text-center">
        {title}
      </div>
    </div>
  );
};

export default FlippingCard;
