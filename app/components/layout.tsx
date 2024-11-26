// components/MobileLayout.tsx

import React, { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center md:text-left md:px-8 md:py-4">
        <h1 className="text-lg font-bold">My App</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 bg-gray-100 md:px-8 md:py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center md:text-left md:px-8 md:py-4">
        <p>© 2024 My App</p>
      </footer>
    </div>
  );
};

export default MobileLayout;
