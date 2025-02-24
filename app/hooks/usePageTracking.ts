"use client"; 
import { useEffect } from 'react';
import { useRouter } from "next/router";

const getUniqueUserId = () => {
    if (typeof window !== 'undefined') {
      let userId = localStorage.getItem('uniqueUserId');
      return userId;
    }
    return null;
  };

export const usePageTracking = (pageName: string) => {

  console.log(`Tracking page: ${pageName}`);
  
  useEffect(() => {
    const startTime = performance.now();

    if (typeof window !== 'undefined') {
      const userId = getUniqueUserId();
      const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
      const channel = document.referrer.includes('google') ? 'organic' : 'direct';
      const responseTime = performance.now() - startTime;  // Calculate the time it took to load the page

      // Send the tracking data
      fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          pageName,
          deviceType,
          channel
        }),
      })

      fetch('/api/page-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          pageName,
          deviceType,
          channel,
          responseTime
        }),
      })
  }
  }, []);  // Empty dependency array means this effect only runs once on mount

}

