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
      className={`bg-white/95 backdrop-blur-sm fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-sm border-b border-gray-100' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-script text-gray-800 flex items-center">
          <Heart className="w-4 h-4 mr-2 text-primary fill-primary" />
          <span>Our Love Story</span>
        </h1>
        
        <nav>
          <ul className="flex items-center space-x-2 md:space-x-6">
            <li>
              <button 
                onMouseEnter={playHover}
                onClick={() => scrollToSection("home")} 
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
              >
                <Home className="w-3.5 h-3.5 mr-1.5" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button 
                onMouseEnter={playHover}
                onClick={() => scrollToSection("timeline")} 
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
              >
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                <span>Timeline</span>
              </button>
            </li>
            <li>
              <button 
                onMouseEnter={playHover}
                onClick={() => scrollToSection("gallery")} 
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
              >
                <Image className="w-3.5 h-3.5 mr-1.5" />
                <span>Gallery</span>
              </button>
            </li>
            <li className="ml-2">
              <button 
                onMouseEnter={playHover}
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
                aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
