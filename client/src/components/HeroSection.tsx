import { useEffect, useState } from "react";
import { formatDate, calculateDaysTogether } from "@/lib/utils";
import { Profile, Relationship } from "@/lib/types";
import HeartAnimation from "./HeartAnimation";
import { motion } from "framer-motion";
import { Heart, Calendar, Sparkles } from "lucide-react";
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
    <section id="home" className="pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-aos="fade-down"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-primary opacity-50"></div>
            <Heart className="h-6 w-6 mx-3 text-primary fill-primary animate-pulse" />
            <div className="h-px w-12 bg-primary opacity-50"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-primary via-pink-400 to-primary bg-clip-text text-transparent">
            Our Love Journey
          </h1>
          <p className="text-lg md:text-xl font-script text-gray-700 max-w-xl mx-auto">
            Every moment with you is a treasure that I hold dear to my heart...
          </p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 pt-8">
          {/* Profile 1 */}
          <motion.div 
            className="w-full md:w-1/3 max-w-xs"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-pink-100/50 overflow-hidden transform transition-all hover:scale-105 hover:-translate-y-2 hover:shadow-xl duration-500 group"
              onMouseEnter={playHover}
            >
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                  alt={`${profiles.profile1.name} profile`} 
                  className="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-primary group-hover:to-pink-600 transition-all duration-500">
                  {profiles.profile1.name}
                </h3>
                <div className="flex items-center justify-center mt-1 text-gray-500 group-hover:text-primary transition-colors duration-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <p className="font-body">{profiles.profile1.birthday}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Heart Animation Container */}
          <motion.div 
            className="relative w-24 h-24 flex-shrink-0 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <HeartAnimation />
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-pink-200 rounded-full flex items-center justify-center shadow-lg shadow-pink-200/30 animate-pulse">
              <Heart className="h-10 w-10 text-primary fill-primary" />
            </div>
          </motion.div>

          {/* Profile 2 */}
          <motion.div 
            className="w-full md:w-1/3 max-w-xs"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-pink-100/50 overflow-hidden transform transition-all hover:scale-105 hover:-translate-y-2 hover:shadow-xl duration-500 group"
              onMouseEnter={playHover}
            >
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                  alt={`${profiles.profile2.name} profile`} 
                  className="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-primary group-hover:to-pink-600 transition-all duration-500">
                  {profiles.profile2.name}
                </h3>
                <div className="flex items-center justify-center mt-1 text-gray-500 group-hover:text-primary transition-colors duration-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <p className="font-body">{profiles.profile2.birthday}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Days Counter */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-xl shadow-lg shadow-pink-100/50 p-6 md:p-8 transform transition-transform hover:scale-105 duration-300">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              <h3 className="text-xl md:text-2xl font-script bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                We have been together for
              </h3>
              <Sparkles className="h-4 w-4 ml-2 text-primary" />
            </div>
            
            <div className="flex justify-center space-x-4 md:space-x-6 mt-4">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-gradient-to-br from-secondary/50 to-pink-100 text-gray-900 w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center text-2xl md:text-4xl font-bold shadow-inner">
                  {daysCounter.years}
                </div>
                <span className="text-sm md:text-base mt-2 font-medium text-gray-700">Years</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-gradient-to-br from-secondary/50 to-pink-100 text-gray-900 w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center text-2xl md:text-4xl font-bold shadow-inner">
                  {daysCounter.months}
                </div>
                <span className="text-sm md:text-base mt-2 font-medium text-gray-700">Months</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-gradient-to-br from-secondary/50 to-pink-100 text-gray-900 w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center text-2xl md:text-4xl font-bold shadow-inner">
                  {daysCounter.days}
                </div>
                <span className="text-sm md:text-base mt-2 font-medium text-gray-700">Days</span>
              </motion.div>
            </div>
            
            <p className="mt-5 text-gray-700 font-body flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>Since {formatDate(relationship.startDate)}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
