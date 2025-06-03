import React from 'react';

// Define the props interface
interface FooterProps {
  pageNum: number;
  totalPages: number;
}

const Footer: React.FC<FooterProps> = ({ pageNum, totalPages }) => {
  return (
    <div className="relative h-[5vh] z-10 flex items-end justify-end text-4xl leading-none mr-2 mb-2">
      <span className="text-purple-300 stintultra">{pageNum}</span>
      <span className="text-white stintultra">/{totalPages}</span>
    </div>
  );
};

export default Footer;