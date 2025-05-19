import { useState, useEffect } from "react";
import { useSound } from "@/lib/SoundContext";
import { Heart, Home, Clock, Image, Volume2, VolumeX, Mail, Map, Calendar, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location] = useLocation();
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
          <ul className="flex items-center space-x-1 iphone:space-x-1.5 iphoneplus:space-x-2 tablet:space-x-3">
            {/* Home Page Navigation */}
            {location === '/' ? (
              <>
                <li>
                  <button 
                    onMouseEnter={playHover}
                    onClick={() => scrollToSection("home")} 
                    className="flex items-center px-2 iphone:px-2 iphoneplus:px-2.5 tablet:px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
                  >
                    <Home className="w-3.5 h-3.5 iphoneplus:mr-1 tablet:mr-1.5" />
                    <span className="hidden iphoneplus:inline">Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    onMouseEnter={playHover}
                    onClick={() => scrollToSection("timeline")} 
                    className="flex items-center px-2 iphone:px-2 iphoneplus:px-2.5 tablet:px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
                  >
                    <Clock className="w-3.5 h-3.5 iphoneplus:mr-1 tablet:mr-1.5" />
                    <span className="hidden iphoneplus:inline">Timeline</span>
                  </button>
                </li>
                <li>
                  <button 
                    onMouseEnter={playHover}
                    onClick={() => scrollToSection("gallery")} 
                    className="flex items-center px-2 iphone:px-2 iphoneplus:px-2.5 tablet:px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
                  >
                    <Image className="w-3.5 h-3.5 iphoneplus:mr-1 tablet:mr-1.5" />
                    <span className="hidden iphoneplus:inline">Gallery</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="flex items-center px-2 iphone:px-2 iphoneplus:px-2.5 tablet:px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
                >
                  <Home className="w-3.5 h-3.5 iphoneplus:mr-1 tablet:mr-1.5" />
                  <span className="hidden iphoneplus:inline">Home</span>
                </Link>
              </li>
            )}
            
            {/* Features Navigation */}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger 
                  onMouseEnter={playHover}
                  className="flex items-center px-2 iphone:px-2 iphoneplus:px-2.5 tablet:px-3 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 iphoneplus:mr-1 tablet:mr-1.5" />
                  <span className="hidden iphoneplus:inline">Features</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/postcards"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className="flex items-center px-2 py-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 mr-2 text-gray-500" />
                      <span>Love Postcards</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/love-language"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className="flex items-center px-2 py-1.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 mr-2 text-gray-500" />
                      <span>Love Language Quiz</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/countdown"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className="flex items-center px-2 py-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-2 text-gray-500" />
                      <span>Countdown Timer</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/map"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className="flex items-center px-2 py-1.5 cursor-pointer"
                    >
                      <Map className="w-3.5 h-3.5 mr-2 text-gray-500" />
                      <span>Love Map</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/gallery"
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className="flex items-center px-2 py-1.5 cursor-pointer"
                    >
                      <Image className="w-3.5 h-3.5 mr-2 text-gray-500" />
                      <span>Enhanced Gallery</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            
            {/* Sound Toggle */}
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
