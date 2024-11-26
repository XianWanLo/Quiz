// hooks/usePageTracking.ts
import { useEffect } from 'react';

function getUniqueUserId() {
  let userId = localStorage.getItem('uniqueUserId');
  
  if (!userId) {
    userId = crypto.randomUUID();  // Generate a new UUID if it doesn't exist
    localStorage.setItem('uniqueUserId', userId);
  }
  
  return userId;
}

export const usePageTracking = (page: string) => {
  useEffect(() => {
    const userId = getUniqueUserId();
    const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    
    // Record the start time when the user enters the page
    const startTime = new Date();

    const handleBeforeUnload = () => {
      const endTime = new Date();
      const gameTime = (endTime.getTime() - startTime.getTime()) / 1000;  // Convert time to seconds

      // Send the page view and game time tracking request
      fetch('/api/game-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          deviceType,
          channel,
        }),
      });
    };

    // Add event listeners to capture when the user leaves the page
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup: Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Ensure tracking is sent when navigating away without page reload
      handleBeforeUnload();
    };
  }, [page]);
};
