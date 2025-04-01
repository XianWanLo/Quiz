"use client"; // Add this line to mark the component as a Client Component
import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  theme: 'light' | 'dark';
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ theme }) => {
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

  const getIcon = () => {
    if (isPlaying) {
      return theme === 'light' ? '/images_perfume/music/volume-dark.png' : '/images_perfume/music/volume.png';
    } else {
      return theme === 'light' ? '/images_perfume/music/volume-mute-dark.png' : '/images_perfume/music/volume-mute.png';
    }
  };

  return (
    <div className="absolute z-10 mt-4 left-4">
      <audio ref={audioRef} loop>
        <source src="/website_bgm.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div onClick={toggleAudio} style={{ cursor: 'pointer' }}>
      <img src={getIcon()} alt={isPlaying ? "Play" : "Pause"} width="30" height="30" />
      </div>
    </div>
  );
};

export default AudioPlayer;