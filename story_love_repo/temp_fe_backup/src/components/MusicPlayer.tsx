import { useState, useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../css/custom-player.css';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface Song {
  title: string;
  src: string;
}

const songs: Song[] = [
  {
    title: 'Romantic Melody',
    src: '/music/background-music.mp3',
  },
  // Add more songs here when available
];

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);
  
  const currentSong = songs[currentSongIndex];
  
  // Toggle mute state
  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.audio.current.volume = 0.3;
      } else {
        playerRef.current.audio.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };
  
  // Set initial volume
  useEffect(() => {
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.volume = 0.3;
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg shadow-pink-200/30 flex items-center justify-center text-primary"
        aria-label="Toggle music player"
      >
        <Music className="w-5 h-5" />
      </motion.button>
      
      {/* Player panel */}
      <motion.div 
        className="absolute bottom-14 right-0 w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl shadow-pink-200/30"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : 20,
          scale: isOpen ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800 flex items-center">
            <Music className="w-4 h-4 mr-2 text-primary" />
            {currentSong.title}
          </h3>
          <button 
            onClick={toggleMute} 
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-primary" />}
          </button>
        </div>
        
        <AudioPlayer
          ref={playerRef}
          src={currentSong.src}
          showJumpControls={false}
          layout="stacked-reverse"
          autoPlayAfterSrcChange={false}
          className="love-story-player"
        />
      </motion.div>
    </div>
  );
}