import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Howl, Howler } from 'howler';

interface SoundContextType {
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const sounds = {
  hover: new Howl({
    src: ['/sounds/hover.mp3'],
    volume: 0.2,
  }),
  click: new Howl({
    src: ['/sounds/click.mp3'],
    volume: 0.3,
  }),
  success: new Howl({
    src: ['/sounds/success.mp3'],
    volume: 0.4,
  }),
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Check local storage for mute preference
    const savedMute = localStorage.getItem('sound-muted');
    if (savedMute === 'true') {
      setIsMuted(true);
      Howler.volume(0);
    }
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    Howler.volume(isMuted ? 1 : 0);
    localStorage.setItem('sound-muted', (!isMuted).toString());
  };

  const playHover = () => {
    if (!isMuted) sounds.hover.play();
  };

  const playClick = () => {
    if (!isMuted) sounds.click.play();
  };

  const playSuccess = () => {
    if (!isMuted) sounds.success.play();
  };

  return (
    <SoundContext.Provider
      value={{ playHover, playClick, playSuccess, toggleMute, isMuted }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};