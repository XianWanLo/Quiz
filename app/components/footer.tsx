import React from 'react';
import { stintultra } from '../components/font';

// Define the props interface
interface FooterProps {
  pageNum: number;
  totalPages: number;
}

const Footer: React.FC<FooterProps> = ({ pageNum, totalPages }) => {
  return (
    <div className="relative h-[10vh] z-10 flex items-end justify-end text-6xl leading-none mr-2 mb-2">
      <span className={`text-purple-300 ${stintultra.className}`}>{pageNum}</span>
      <span className={`text-white ${stintultra.className}`}>/{totalPages}</span>
    </div>
  );
};

export default Footer;