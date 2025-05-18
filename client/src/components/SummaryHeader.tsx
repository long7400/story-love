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
    <section className="py-10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Couple Names */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 shadow-md shadow-pink-100/30 flex flex-col items-center justify-center text-center">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">Couple</h3>
            <p className="font-script text-xl text-primary">
              {profileNames.profile1} & {profileNames.profile2}
            </p>
          </div>

          {/* Relationship Duration */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 shadow-md shadow-pink-100/30 flex flex-col items-center justify-center text-center">
            <Clock className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">Together for</h3>
            <div className="font-medium">
              <span className="text-2xl text-primary">{daysCounter.totalDays}</span>
              <span className="text-gray-600 ml-1">days</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ({daysCounter.years} years, {daysCounter.months} months, {daysCounter.days} days)
            </p>
          </div>

          {/* Love Story */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 shadow-md shadow-pink-100/30 flex flex-col items-center justify-center text-center">
            <Heart className="h-8 w-8 text-primary mb-4 fill-pink-200" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">Our Story</h3>
            <p className="text-sm text-gray-600">
              A journey of love, laughter, and cherished moments that we'll remember forever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}