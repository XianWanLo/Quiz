"use client"; // Add this line to mark the component as a Client Component
import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="border-4 border-t-transparent border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      <div className="text-white text-3xl ml-4">Loading...</div>
    </div>
  );
};

export default Loading;

