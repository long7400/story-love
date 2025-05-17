import { useEffect, useState } from "react";
import { formatDate, calculateDaysTogether } from "@/lib/utils";
import { Profile, Relationship } from "@/lib/types";
import HeartAnimation from "./HeartAnimation";

interface HeroSectionProps {
  profiles: {
    profile1: Profile;
    profile2: Profile;
  };
  relationship: Relationship;
}

export default function HeroSection({ profiles, relationship }: HeroSectionProps) {
  const [daysCounter, setDaysCounter] = useState({ years: 0, months: 0, days: 0 });

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
    <section id="home" className="pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-gray-900">Our Love Journey</h1>
          <p className="text-lg md:text-xl font-script text-primary">Every moment with you is a treasure...</p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 pt-8">
          {/* Profile 1 */}
          <div className="w-full md:w-1/3 max-w-xs">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 duration-300">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                alt={`${profiles.profile1.name} profile`} 
                className="w-full h-80 object-cover" 
              />
              <div className="p-5 text-center">
                <h3 className="text-2xl font-heading font-bold text-gray-900">{profiles.profile1.name}</h3>
                <p className="text-gray-600 font-body">{profiles.profile1.birthday}</p>
              </div>
            </div>
          </div>

          {/* Heart Animation Container */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <HeartAnimation />
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
          </div>

          {/* Profile 2 */}
          <div className="w-full md:w-1/3 max-w-xs">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 duration-300">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
                alt={`${profiles.profile2.name} profile`} 
                className="w-full h-80 object-cover" 
              />
              <div className="p-5 text-center">
                <h3 className="text-2xl font-heading font-bold text-gray-900">{profiles.profile2.name}</h3>
                <p className="text-gray-600 font-body">{profiles.profile2.birthday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Days Counter */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-script text-primary mb-2">We have been together for</h3>
            <div className="flex justify-center space-x-4 md:space-x-6">
              <div className="flex flex-col items-center">
                <div className="bg-accent/20 text-gray-900 w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center text-2xl md:text-4xl font-bold">
                  {daysCounter.years}
                </div>
                <span className="text-sm md:text-base mt-1 font-medium">Years</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-accent/20 text-gray-900 w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center text-2xl md:text-4xl font-bold">
                  {daysCounter.months}
                </div>
                <span className="text-sm md:text-base mt-1 font-medium">Months</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-accent/20 text-gray-900 w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center text-2xl md:text-4xl font-bold">
                  {daysCounter.days}
                </div>
                <span className="text-sm md:text-base mt-1 font-medium">Days</span>
              </div>
            </div>
            <p className="mt-4 text-gray-700 font-body">
              Since {formatDate(relationship.startDate)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
