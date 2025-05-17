import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className={`bg-white/80 backdrop-blur-md fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-script text-primary">Our Love Story</h1>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => scrollToSection("home")} 
                className="text-gray-800 hover:text-primary transition-colors font-medium"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("timeline")} 
                className="text-gray-800 hover:text-primary transition-colors font-medium"
              >
                Timeline
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("gallery")} 
                className="text-gray-800 hover:text-primary transition-colors font-medium"
              >
                Gallery
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
