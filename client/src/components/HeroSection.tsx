import { useEffect, useState } from "react";
import { formatDate, calculateDaysTogether } from "@/lib/utils";
import { Profile, Relationship } from "@/lib/types";
import HeartAnimation from "./HeartAnimation";
import { motion } from "framer-motion";
import { Heart, Calendar } from "lucide-react";
import { useSound } from "@/lib/SoundContext";

interface HeroSectionProps {
  profiles: {
    profile1: Profile;
    profile2: Profile;
  };
  relationship: Relationship;
}

export default function HeroSection({ profiles, relationship }: HeroSectionProps) {
  const [daysCounter, setDaysCounter] = useState({ years: 0, months: 0, days: 0 });
  const { playHover, playClick } = useSound();
  const [isProfile1Hovered, setIsProfile1Hovered] = useState(false);
  const [isProfile2Hovered, setIsProfile2Hovered] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  useEffect(() => {
    const counter = calculateDaysTogether(relationship.startDate);
    setDaysCounter(counter);

    // Update counter daily
    const interval = setInterval(() => {
      const counter = calculateDaysTogether(relationship.startDate);
      setDaysCounter(counter);
    }, 86400000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, [relationship.startDate]);

  return (
    <section 
      id="home" 
      className="pt-20 pb-16 min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-amber-800/50 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-2 text-white/90 font-medium tracking-wider text-sm">
            SAVE THE DATE
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-white">
            {profiles.profile1.name} & {profiles.profile2.name}
          </h1>
          <p className="text-lg text-white/80 mb-6">
            {formatDate(relationship.startDate, { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </p>
          <button 
            className="bg-white/90 text-primary hover:bg-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            onClick={() => playClick()}
          >
            OUR LOVE STORY
          </button>
        </motion.div>

        {/* Floating Hearts Animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-float text-red-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <Heart className="h-4 w-4 fill-red-400" />
            </div>
          ))}
        </div>

        {/* Profile Cards at Bottom */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="relative flex justify-center">
            {/* Profile Pictures Container */}
            <div className="flex justify-center w-full">
              {/* Profile 1 */}
              <motion.div 
                className="w-40 h-40 md:w-56 md:h-56 relative mr-4 md:mr-8"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => {
                  setIsProfile1Hovered(true);
                  playHover();
                }}
                onMouseLeave={() => setIsProfile1Hovered(false)}
              >
                <div className={`w-full h-full overflow-hidden rounded-lg border-4 transition-all duration-300 ${isProfile1Hovered ? 'border-red-400 shadow-xl' : 'border-white/80 shadow-md'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                    alt={profiles.profile1.name} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
              </motion.div>
              
              {/* Profile 2 */}
              <motion.div 
                className="w-40 h-40 md:w-56 md:h-56 relative ml-4 md:ml-8"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => {
                  setIsProfile2Hovered(true);
                  playHover();
                }}
                onMouseLeave={() => setIsProfile2Hovered(false)}
              >
                <div className={`w-full h-full overflow-hidden rounded-lg border-4 transition-all duration-300 ${isProfile2Hovered ? 'border-red-400 shadow-xl' : 'border-white/80 shadow-md'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                    alt={profiles.profile2.name} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Heart Between */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: isHeartHovered ? 1.2 : [0.9, 1.1, 0.9],
                rotate: isHeartHovered ? [0, 10, -10, 0] : 0
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                rotate: { duration: 0.5, repeat: isHeartHovered ? 2 : 0 }
              }}
              onMouseEnter={() => {
                setIsHeartHovered(true);
                playHover();
              }}
              onMouseLeave={() => setIsHeartHovered(false)}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                <Heart className="h-8 w-8 text-red-500 fill-red-400" />
              </div>
            </motion.div>
          </div>
          
          {/* Names */}
          <div className="flex justify-center mt-4 gap-40 text-white">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-serif">{profiles.profile1.name}</h3>
              <p className="text-sm text-white/70">{profiles.profile1.birthday}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-serif">{profiles.profile2.name}</h3>
              <p className="text-sm text-white/70">{profiles.profile2.birthday}</p>
            </div>
          </div>
          
          {/* "We are Getting Married" */}
          <div className="text-center mt-10">
            <h2 className="text-2xl md:text-3xl font-script text-white">We are Getting Married</h2>
            <p className="mt-2 text-white/80 max-w-xl mx-auto text-sm md:text-base">
              Our love story began with a simple hello, now we're writing our own story together. 
              Join us as we celebrate the beginning of our forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
