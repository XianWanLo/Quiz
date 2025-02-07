"use client"; // Add this line to mark the component as a Client Component
import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer =   () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    
    const audio = audioRef.current; // store ref in a variable 

    if (typeof window !== 'undefined' && audio) {

        if (isPlaying && audioRef.current) {          
            audio.play();        
          }
    }
      // Cleanup function to pause audio on unmount
      return () => {
        if (audio) {
          audio.pause();
        }
      };
    },[isPlaying]);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="absolute z-10 mt-4 right-4">
      <audio ref={audioRef} loop>
        <source src="/website_bgm.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div onClick={toggleAudio} style={{ cursor: 'pointer' }}>
        {isPlaying ? (
          <img src="/images_perfume/music/unmute.png" alt="Play" width="40" height="40" />
        ) : (
          <img src="/images_perfume/music/mute.png" alt="Pause" width="40" height="40" />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;