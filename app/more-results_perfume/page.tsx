"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { usePageTracking } from "../hooks/usePageTracking";
import { Wendy_One } from "next/font/google";
import translations from "../components/translations";



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
  return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English';  // Default to English if not set
};


const MoreResultPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<'English' | 'Traditional_Chinese' | 'Simplified_Chinese'>('English'); // Default language

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

  const MBTI = localStorage.getItem('MBTI');

  

  // Function to download the image (for Instagram sharing)
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "images_perfume/result/more_result_en";
    link.download = "quiz-result.png";
    link.click();
  };


  // Share based on selected platform
  const handleShare = (platform: string) => {
    const pageUrl = window.location.href;
    const message = `I played the Perfume Quiz game and got this result! Check yours: ${pageUrl}`;

    if (platform === "facebook") {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
      window.open(facebookUrl, "_blank");
    } else if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      window.open(twitterUrl, "_blank");
    } else if (platform === "instagram") {
      handleDownload(); // Download the image for Instagram
    }
    setShowModal(false); // Close the modal after sharing

    router.push("/result_afterShare");  // Navigate to the quiz page
  };

  // Restart the quiz and clear localStorage
  const handleRestart = () => {
    localStorage.clear();
    router.push("/");  // Navigate to the quiz page
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative min-h-screen flex flex-col bg-white-500 justify-between overflow-hidden items-center"> {/* Full height screen with scrollable content, consistent bg color */}
        
        {/* Top Section: Content and Background Image */}
        <div className="relative flex flex-col w-full h-full max-w-md shadow-md bg-slate-900"> 
          
          <div className="">
              <img
                src="images_perfume/result/more_result_ch.png"
                alt={ translations[language].moreresults.imageAlt}
              />
          </div>

        </div>

        {/* Middle Section: "will Find your..." Text and "Let’s Try" Button with Image */}
        <div className="flex justify-center w-full max-w-md gap-5 mx-5 shadow-md p-4 bg-slate-900 text-center"> {/* Set consistent background */}

          <button
            onClick={() => setShowModal(true)}
            className="border border-gray-300 text-white px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            Share
          </button>
          <button
            onClick={handleRestart}
            className="border border-gray-300 text-white px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            Play Again
          </button>
            
        </div>

        {/* Modal for selecting the sharing platform */}
        {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                  <h3 className="text-xl font-bold mb-4">Share your result</h3>
                  <p className="text-gray-700 mb-6">Choose a platform to share your quiz result:</p>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="bg-blue-600 text-white w-full py-2 rounded-full mb-2"
                  >
                    Share on Facebook
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="bg-blue-400 text-white w-full py-2 rounded-full mb-2"
                  >
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => handleShare("instagram")}
                    className="bg-pink-600 text-white w-full py-2 rounded-full"
                  >
                    Share on Instagram
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 w-full py-2 border border-gray-400 text-gray-700 rounded-full hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

        
      </div>
    </>
  );
};

export default MoreResultPage;
