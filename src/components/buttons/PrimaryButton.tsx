import React from 'react';

const PrimaryButton = ({ title }: { title: string }) => {
  return (
    <button
      className="bg-blue rounded-[30px] px-[36px] py-[12px] h-[48px] bg-blue-500 text-[16px] font-[700] leading-[24px] flex items-center justify-center"
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
