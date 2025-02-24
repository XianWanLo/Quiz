"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { wendyone, waterfall } from "../components/font";
import { useRouter } from "next/navigation";
import { usePageTracking } from "../hooks/usePageTracking";
import { listeners } from "process";
import translations from "../components/translations";
import {imageMapByLanguage, perfumes, purchase_link} from "../components/perfumes_info";


const getUniqueUserId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('uniqueUserId');
  }
  return null; // Return null or a default value if not in the browser
};

const getLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') as ('English' | 'Traditional_Chinese' | 'Simplified_Chinese') || 'English'; 
  }
  return 'English'; // Return a default value if not in the browser
};



const ResultPage: React.FC = () => {
  
  const [highestOccurrenceMBTI, setHighestOccurrenceMBTI] = useState<string | null>(null);
  const [showMoreResults, setShowMoreResults] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nameID, setNameID] = useState<string | null>(null); 

  // Function to generate combinations
  const getCombinations = (arrays: string[][]): string[] => {
    return arrays.reduce<string[]>((acc, curr) => {
      return acc.flatMap(a => curr.map(c => [...a, c].join(''))); // Spread operator to combine arrays
    }, ['']); // Change initial value to an array with an empty string
  };

  const router = useRouter();
 
  // Page view & response time tracking
  usePageTracking("Result Page")

  useEffect(() => {
    // const userId = getUniqueUserId();  // Get user ID
    // const gameStartTime = localStorage.getItem('gameStartTime');  // Retrieve start time
    // const endTime = new Date().toISOString();  // Get current time for game completion
    // const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    // const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    // const startTime = performance.now();

    const userFirstName = localStorage.getItem('userName')?.split(' ')[0] || ''; // Save the name to local storage
    setNameID(userFirstName + "0001");

    // Retrieve current MBTI scores from LocalStorage
    let mbtiScores = JSON.parse(localStorage.getItem('mbtiScores')||'{}')

    // Calculate MBTI string based on scores
    const mbtiChar: string[][] = [[], [], [], []];;
  
    if (mbtiScores.E === mbtiScores.I){
      mbtiChar[0].push('E');
      mbtiChar[0].push('I')
    }else{mbtiScores.E > mbtiScores.I ? mbtiChar[0].push('E') : mbtiChar[0].push('I');}

    if (mbtiScores.N === mbtiScores.S){
      mbtiChar[1].push('N');
      mbtiChar[1].push('S')
    }else{mbtiScores.N > mbtiScores.S ? mbtiChar[1].push('N') : mbtiChar[1].push('S');}

    if (mbtiScores.F === mbtiScores.T){
      mbtiChar[2].push('F');
      mbtiChar[2].push('T')
    }else{mbtiScores.F > mbtiScores.T ? mbtiChar[2].push('F') : mbtiChar[2].push('T');}

    if (mbtiScores.J === mbtiScores.P){
      mbtiChar[3].push('J');
      mbtiChar[3].push('P')
    }else{mbtiScores.J > mbtiScores.P ? mbtiChar[3].push('J') : mbtiChar[3].push('P');};

    // Get all combinations
    const combinations = getCombinations(mbtiChar);
    console.log(combinations);

    // Find the best match based on the tie-break order
    const tieBreakOrder = ["ISFJ", "ESFJ", "ISTJ", "ISFP", "ESTJ", "ESFP", "ENFP", "ISTP", "INFP", "ESTP", "INTP", "ENTP", "ENFJ", "INTJ", "ENTJ", "INFJ"];
    const bestMatch = combinations.find(combination => tieBreakOrder.includes(combination));
    console.log(bestMatch);
    
    setHighestOccurrenceMBTI(bestMatch||null); // Update the highest occurrence number with MBTI string
    
    localStorage.setItem('MBTI', bestMatch||'{}');

    // Send game completion data to the server if gameStartTime exists
    // if (gameStartTime && userId) {
    //   const timeSpent = (new Date(endTime).getTime() - new Date(gameStartTime).getTime()) / 1000; // Calculate time spent in seconds

    //   // Send game completion metrics
    //   fetch('/api/game-complete', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       userId,
    //       startTime: gameStartTime,
    //       endTime,
    //       timeSpent,
    //       deviceType,
    //       channel,
    //     }),
    //   });

      // Clear the game start time after completion
      // localStorage.removeItem('gameStartTime');
    // }  

    // Debounce the call to avoid multiple requests
    // const timeoutId = setTimeout(sendPageView, 300);

    // return () => {
    //   clearTimeout(timeoutId);
    // };
   }, []);



  const language = getLanguage();

  // Determine the result image based on the highest occurrence number and language
  const imageSrc = highestOccurrenceMBTI
  ? imageMapByLanguage[language][highestOccurrenceMBTI]
  : "/images_perfume/result/result_en/A3 - ESFP.png"; // Default fallback

  const recommendPerfume =  highestOccurrenceMBTI
  ? perfumes[highestOccurrenceMBTI]
  : perfumes["ENFJ"]; // Default fallback

  const perfume_link =  highestOccurrenceMBTI
  ? purchase_link[highestOccurrenceMBTI]
  : purchase_link["ENFJ"]; // Default fallback


  // Function to download the image (for Instagram sharing)
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
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
      <div className="relative min-h-screen flex flex-col bg-[#080C1D] overflow-hidden items-center">
        {/* Scrollable content container */}

        <div className="flex-grow w-full max-w-md shadow-md">

          {/* Top section */}
          <div className="relative flex w-full items-center justify-between">
            <h1
              className="mt-4 ml-8 text-l text-gray-500 hover:bg-gray-200"
            >
              No. {nameID}
            </h1>

            <h1
              className="mt-4 mr-8 text-l text-gray-500 font-bold hover:bg-gray-200"
            >
            {translations[language].resultPage.prompt}
            </h1>
          </div>
          
          {/* Result image */}
          <div className="relative w-full flex flex-col">
            <img
              src={imageSrc} // Set the result image dynamically
              alt="Quiz"
              className="w-full h-full"
            />
          </div>

          {/* Bottom section with buttons */}
          <div className="relative w-full flex justify-around items-center p-4 bg-[#080C1D]">

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
                <button
                  onClick={() => router.push("/more-results_perfume")}
                  className="border border-gray-300 text-white px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {showMoreResults ? "Hide Results" : "More Results"}
                </button>
              </div>

              {/* Display images and text, one image per row */}
              <div className={`relative mb-10 flex flex-col justify-center`}>

                <div className="absolute z-0 w-full mt-10 inset-y-0">
                  <img
                    src="/images_perfume/namePage/background.png"
                    className="object-cover"
                    alt="Option background"
                  />
                </div>

                <div className="relative mt-12 mb-12 text-center font-bold text-red-500">
                  <pre className={`${language=='English' ?'text-5xl':'text-3xl'} ${waterfall.className}`}>
                  {translations[language].output.valentine}
                  </pre>
                </div>

                <div className={`relative flex flex-col justify-center ${recommendPerfume.length === 4 ? 'grid grid-cols-2 mx-2 gap-4' : 'mx-16 gap-8'}`}>

                  {recommendPerfume.map((src, index) => (
                    <div key={index} className="relative flex flex-col items-center rounded-2xl bg-purple-300 bg-opacity-20 hover:bg-red-400 hover:bg-opacity-40">
                      {/* Image: Full width, position relative to contain text */}
                      <img
                        src={src}
                        alt={`Recommended_Perfume ${index + 1}`}
                        className="w-3/4 h-full object-cover rounded-lg mb-2"
                      />
                      <a
                        href={perfume_link[index]} // Use the corresponding link for each perfume
                        target="_blank" // Open link in a new tab
                        rel="noopener noreferrer" // Security best practice
                        className="mb-4 w-full text-center"
                      >
                        {/* Add text or button for the link */}
                        <span className="border border-gray-300 text-l text-white px-4 py-1 rounded-full hover:bg-gray-200 hover:text-black transition-colors"
                          >Learn more
                        </span>
                      </a>
                    </div>
                  ))}

                </div>            
              </div>

            
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

export default ResultPage;
