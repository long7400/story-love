import { useState, useEffect } from "react";
import { useSound } from "@/lib/SoundContext";
import { Heart, Home, Clock, Image, Volume2, VolumeX } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { playHover, playClick, toggleMute, isMuted } = useSound();

  // Handle scroll event to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header 
      className={`bg-white/80 backdrop-blur-md fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-pink-200/20' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-script text-primary flex items-center">
          <Heart className="w-5 h-5 mr-2 text-primary fill-primary animate-pulse" />
          <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">Our Love Story</span>
        </h1>
        
        <nav>
          <ul className="flex items-center space-x-2 md:space-x-6">
            <li>
              <button 
                onMouseEnter={playHover}
                onClick={() => scrollToSection("home")} 
                className="flex items-center px-3 py-1.5 rounded-full text-gray-800 hover:text-primary hover:bg-pink-50 transition-all duration-300 font-medium"
              >
                <Home className="w-4 h-4 mr-1.5" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button 
                onMouseEnter={playHover}
                onClick={() => scrollToSection("timeline")} 
                className="flex items-center px-3 py-1.5 rounded-full text-gray-800 hover:text-primary hover:bg-pink-50 transition-all duration-300 font-medium"
              >
                <Clock className="w-4 h-4 mr-1.5" />
                <span>Timeline</span>
              </button>
            </li>
            <li>
              <button 
                onMouseEnter={playHover}
                onClick={() => scrollToSection("gallery")} 
                className="flex items-center px-3 py-1.5 rounded-full text-gray-800 hover:text-primary hover:bg-pink-50 transition-all duration-300 font-medium"
              >
                <Image className="w-4 h-4 mr-1.5" />
                <span>Gallery</span>
              </button>
            </li>
            <li className="ml-2">
              <button 
                onMouseEnter={playHover}
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-pink-50 text-gray-700 hover:text-primary transition-all"
                aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
