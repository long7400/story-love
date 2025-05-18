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
  const { playHover } = useSound();

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
    <section id="home" className="pt-24 pb-16 md:pt-28 md:pb-20 bg-pink-50/40 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-primary opacity-50"></div>
            <Heart className="h-6 w-6 mx-3 text-primary fill-primary animate-pulse" />
            <div className="h-px w-12 bg-primary opacity-50"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-primary via-pink-400 to-primary bg-clip-text text-transparent">
            Our Love Story
          </h1>
        </motion.div>

        {/* New Profile Layout Based on Example */}
        <div className="max-w-5xl mx-auto relative">
          {/* Center Vertical Timeline */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-1 bg-pink-200 rounded-full"></div>
          
          {/* Profile Cards with Heart Connector */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative">
            {/* Profile 1 Card */}
            <motion.div 
              className="w-full md:w-5/12 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              onMouseEnter={playHover}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                    alt={`${profiles.profile1.name} profile`} 
                    className="w-full h-96 object-cover" 
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-3xl font-serif font-bold text-gray-800">
                    {profiles.profile1.name}
                  </h3>
                  <div className="flex items-center justify-center mt-2 text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <p>{profiles.profile1.birthday}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Center Heart */}
            <div className="absolute left-1/2 top-1/2 md:top-80 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary fill-primary" />
              </div>
            </div>
            
            {/* Profile 2 Card */}
            <motion.div 
              className="w-full md:w-5/12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              onMouseEnter={playHover}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                    alt={`${profiles.profile2.name} profile`} 
                    className="w-full h-96 object-cover" 
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-3xl font-serif font-bold text-gray-800">
                    {profiles.profile2.name}
                  </h3>
                  <div className="flex items-center justify-center mt-2 text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <p>{profiles.profile2.birthday}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Days Together Indicator */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6">
              <h3 className="text-xl font-medium text-primary mb-2">
                Together Since {formatDate(relationship.startDate)}
              </h3>
              <p className="text-gray-600">
                {daysCounter.years} years, {daysCounter.months} months, and {daysCounter.days} days of beautiful memories
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
