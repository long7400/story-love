import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, Users, Clock } from "lucide-react";
import { calculateDaysTogether } from "@/lib/utils";
import { Relationship } from "@/lib/types";

interface SummaryHeaderProps {
  relationship: Relationship;
  profileNames: {
    profile1: string;
    profile2: string;
  };
}

export default function SummaryHeader({ relationship, profileNames }: SummaryHeaderProps) {
  const [daysCounter, setDaysCounter] = useState({ 
    totalDays: 0, 
    years: 0, 
    months: 0, 
    days: 0 
  });

  useEffect(() => {
    const counter = calculateDaysTogether(relationship.startDate);
    const totalDays = counter.years * 365 + counter.months * 30 + counter.days;
    setDaysCounter({...counter, totalDays});
  }, [relationship.startDate]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Couple Names */}
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <Users className="h-6 w-6 text-gray-400 mb-4" />
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Couple</h3>
            <p className="font-heading text-2xl text-gray-800">
              {profileNames.profile1} & {profileNames.profile2}
            </p>
          </div>

          {/* Relationship Duration */}
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <Clock className="h-6 w-6 text-gray-400 mb-4" />
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Together for</h3>
            <div className="font-heading">
              <span className="text-3xl text-gray-800">{daysCounter.totalDays}</span>
              <span className="text-gray-600 ml-1 text-lg">days</span>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-light">
              {daysCounter.years} years, {daysCounter.months} months, {daysCounter.days} days
            </p>
          </div>

          {/* Love Story */}
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <Heart className="h-6 w-6 text-gray-400 mb-4" />
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Our Story</h3>
            <p className="text-gray-700 font-light">
              A journey of love, laughter, and cherished moments that we'll remember forever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}