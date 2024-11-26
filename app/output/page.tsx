// File: pages/start.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { usePageTracking } from "../hooks/usePageTracking";
import { useEffect } from "react";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});
const getUniqueUserId = () => {
  let userId = localStorage.getItem('uniqueUserId');
  return userId;
};
const userId = getUniqueUserId();  // Get or create a unique user ID

const OutputPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = getUniqueUserId();  // Get or create a unique user ID
    const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    
    // Measure page load response time
    const startTime = performance.now();

    const sendPageView = () => {
      const responseTime = performance.now() - startTime; // Calculate response time
      fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Output Waiting Page',
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
          page: 'Output Waiting Page',
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

  const handleClick = () => {
    router.push("/result"); // Navigates to /onboardingnext
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div onClick={handleClick} className="relative min-h-screen bg-green-500 flex items-center justify-center">
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          <div className="relative flex-grow">
            <img
              src="/output/output.png"
              alt="Start"
              className="w-full h-full object-cover"
            />
         
         
            <div className="absolute bottom-0 w-full">
              <footer className="bg-[#21322E] text-white py-2 text-center w-full">
                <p className="text-sm">© 2024 Visionverse. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutputPage;
