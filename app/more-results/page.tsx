"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { usePageTracking } from "../hooks/usePageTracking";
import { Wendy_One } from "next/font/google";
import translations from "../components/translations";

// Map numbers to image paths for displaying result images
const imageMap: Record<number, string> = {
  1: "/output/1.png",
  2: "/output/2.png",
  3: "/output/3.png",
  4: "/output/4.png",
  5: "/output/5.png",
  6: "/output/6.png",
  7: "/output/7.png",
  8: "/output/8.png",
  9: "/output/9.png",
};

// Font initialization
const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const getUniqueUserId = () => {
  return localStorage.getItem('uniqueUserId');
};

// Get the current language from localStorage (or default to English)
const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') as 'English' | 'Chinese' || 'English';  // Default to English if not set
};
const MoreResultPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[][]>([]);
  const [occurrences, setOccurrences] = useState<Record<number, number>>({});
  const [language, setLanguage] = useState<'English' | 'Chinese'>('English'); // Default language

  const router = useRouter();
  usePageTracking('/more-results');  // Track page view

  useEffect(() => {
    const userId = getUniqueUserId();  // Get user ID
    const gameStartTime = localStorage.getItem('gameStartTime');  // Retrieve start time
    const endTime = new Date().toISOString();  // Get current time for game completion
    const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    const startTime = performance.now();
    const storedLanguage = getLanguageFromLocalStorage();
    setLanguage(storedLanguage);
    // Send game completion data to the server if gameStartTime exists
    if (gameStartTime && userId) {
      const timeSpent = (new Date(endTime).getTime() - new Date(gameStartTime).getTime()) / 1000; // Calculate time spent in seconds

      // Send game completion metrics
      fetch('/api/game-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          startTime: gameStartTime,
          endTime,
          timeSpent,
          deviceType,
          channel,
        }),
      });

      // Clear the game start time after completion
      localStorage.removeItem('gameStartTime');
    }

    // Collect user answers for questions
    const options: number[][] = [];
    let numberCount: Record<number, number> = {};

    for (let i = 1; i <= 8; i++) {
      const option = localStorage.getItem(`question${i}`);
      if (option) {
        const parsedOption = JSON.parse(option);
        options.push(parsedOption);

        // Count occurrences of each answer
        parsedOption.forEach((num: number) => {
          numberCount[num] = (numberCount[num] || 0) + 1;
        });
      }
    }

    setSelectedOptions(options);
    setOccurrences(numberCount);

    const sendPageView = () => {
      const responseTime = performance.now() - startTime; // Calculate response time
      fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: ' More Result Page',
          deviceType,
          channel,
          responseTime, // Include the response time
        }),
      });

      fetch('/api/page-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'More Result Page',
          deviceType,
          channel,
          responseTime, // Include the response time
        }),
      });
    };

    // Debounce the call to avoid multiple requests
    const timeoutId = setTimeout(sendPageView, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Get translations for the current language

  const handleBack = () => {
    router.push("/result"); // Navigate back to the results page
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-green-500 overflow-y-auto"> {/* Full height screen with scrollable content, consistent bg color */}
        
        {/* Top Section: Content and Background Image */}
        <div className="w-full max-w-md shadow-md relative bg-[#070A2E]"> 
          
          {/* Back Button Overlapping on the image */}
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-black bg-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-green-500 transition-colors z-20"
          >
            { translations[language].moreresults.backButton}
          </button>

          {/* Background Image */}
          <img
            src="output/more-resultsbg.png" // Background image
            alt={ translations[language].moreresults.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="relative z-10 p-6 flex flex-col items-center">
            {/* Header Text */}
            <div className="text-center mt-12 mb-12">
              <h2 className="text-2xl text-white font-bold" style={{ fontSize: '1.9rem' }}>
                { translations[language].moreresults.dogBeautyTitle}
              </h2>
            </div>

            <div className="text-center mt-8 mb-12">
              <h2 className="text-2xl text-white font-bold" style={{ fontSize: '1.9rem' }}>
                { translations[language].moreresults.dogBreedLabel}
              </h2>
            </div>

            {/* Display 9 Circular Images (3 in each row) */}
            <div className="grid grid-cols-3 gap-8 mt-5">
              {Object.values(imageMap).map((imageSrc, index) => (
                <div key={index} className="flex justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={imageSrc}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section: "will Find your..." Text and "Let’s Try" Button with Image */}
        <div className="w-full max-w-md shadow-md p-4 bg-[#070A2E] text-center"> {/* Set consistent background */}
          {/* Middle Text */}
          <h2 className="text-2xl text-white font-bold mb-5 mt-5" style={{ fontSize: '1.9rem' }}>
               { translations[language].moreresults.willFindYour}
              </h2>
          {/* Image with Overlay */}
          <div className="relative w-full">
            <img
              src="/output/letstry.png"
              alt={ translations[language].moreresults.trainingDifficultyAlt}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />

            {/* Overlay Text and Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {/* Centered Text */}
              <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.8rem', lineHeight: '1.4' }}>
                { translations[language].moreresults.trainingDifficultyText}
              </h2>

              {/* Centered Button */}
              <a
                href="https://your-button-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block  bg-white text-green-500 font-bold py-2 px-6 rounded-full hover:bg-green-500 hover:text-white transition-colors"
                style={{ fontSize: '1.2rem' }}
              >
                { translations[language].moreresults.letsTryButton}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Image Container with Link */}
        <div className="w-full max-w-md shadow-md p-4 bg-[#070A2E]"> {/* Set consistent background */}
          {/* Image container with link */}
          <a
            href="https://your-second-link-url.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              src="/output/perfume.png"
              alt={ translations[language].moreresults.perfumeAdAlt}
              className="w-full h-40 object-contain rounded-lg shadow-lg"
            />
          </a>
        </div>

      </div>
    </>
  );
};

export default MoreResultPage;
