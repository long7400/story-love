import { useEffect, useState } from "react";
import { formatDate, calculateDaysTogether } from "@/lib/utils";
import { Profile, Relationship } from "@/lib/types";
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
      className="pt-20 pb-16 min-h-screen flex flex-col justify-center items-center bg-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        {/* Minimalist Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-3 text-gray-500 font-light tracking-widest text-sm">
            OUR STORY
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gray-800">
            {profiles.profile1.name} & {profiles.profile2.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {formatDate(relationship.startDate, { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Minimalist Floating Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <Heart className="h-4 w-4 text-primary fill-primary" />
            </div>
          ))}
        </div>

        {/* Profile Cards - Minimalist Style */}
        <div className="max-w-3xl mx-auto">
          <div className="relative flex justify-center mb-10">
            {/* Profile Pictures Container */}
            <div className="flex justify-between w-full items-center">
              {/* Profile 1 - Left Side */}
              <motion.div 
                className="w-40 h-40 md:w-60 md:h-60 relative"
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => {
                  setIsProfile1Hovered(true);
                  playHover();
                }}
                onMouseLeave={() => setIsProfile1Hovered(false)}
              >
                <div className={`w-full h-full overflow-hidden rounded-full transition-all duration-300 ${isProfile1Hovered ? 'shadow-lg ring-2 ring-primary ring-offset-4' : 'shadow-md'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                    alt={profiles.profile1.name} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
                <motion.div 
                  className="text-center mt-4"
                  animate={{ opacity: isProfile1Hovered ? 1 : 0.7 }}
                >
                  <h3 className="text-xl md:text-2xl font-medium text-gray-800">{profiles.profile1.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center justify-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {profiles.profile1.birthday}
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Heart Between - Minimalist Design */}
              <motion.div 
                className="relative z-10 mx-4"
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: isHeartHovered ? 1.2 : [0.95, 1.05, 0.95],
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
                onMouseEnter={() => {
                  setIsHeartHovered(true);
                  playHover();
                }}
                onMouseLeave={() => setIsHeartHovered(false)}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer border border-gray-100">
                  <Heart className="h-6 w-6 transition-colors duration-300 text-red-500 fill-red-500" />
                </div>
              </motion.div>
              
              {/* Profile 2 - Right Side */}
              <motion.div 
                className="w-40 h-40 md:w-60 md:h-60 relative"
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => {
                  setIsProfile2Hovered(true);
                  playHover();
                }}
                onMouseLeave={() => setIsProfile2Hovered(false)}
              >
                <div className={`w-full h-full overflow-hidden rounded-full transition-all duration-300 ${isProfile2Hovered ? 'shadow-lg ring-2 ring-primary ring-offset-4' : 'shadow-md'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                    alt={profiles.profile2.name} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
                <motion.div 
                  className="text-center mt-4"
                  animate={{ opacity: isProfile2Hovered ? 1 : 0.7 }}
                >
                  <h3 className="text-xl md:text-2xl font-medium text-gray-800">{profiles.profile2.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center justify-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {profiles.profile2.birthday}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Minimalist Separator */}
          <div className="flex items-center justify-center my-10">
            <div className="h-px w-16 bg-gray-200"></div>
            <Heart className="h-4 w-4 mx-3 text-gray-300" />
            <div className="h-px w-16 bg-gray-200"></div>
          </div>
          
          {/* Days Counter - Minimalist Style */}
          <motion.div 
            className="text-center mt-6 bg-white p-8 rounded-xl shadow-sm max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Our Journey Together</h2>
            <div className="flex justify-center gap-6 md:gap-10 mb-4">
              <div className="text-center">
                <div className="text-3xl font-semibold text-primary">{daysCounter.years}</div>
                <div className="text-sm text-gray-500 mt-1">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-primary">{daysCounter.months}</div>
                <div className="text-sm text-gray-500 mt-1">Months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-primary">{daysCounter.days}</div>
                <div className="text-sm text-gray-500 mt-1">Days</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Since {formatDate(relationship.startDate, { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
