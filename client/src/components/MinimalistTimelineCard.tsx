import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/types";
import { Calendar, ArrowRight } from "lucide-react";
import { useSound } from "@/lib/SoundContext";

interface MinimalistTimelineCardProps {
  event: Event;
  onReadMore: () => void;
}

export default function MinimalistTimelineCard({ event, onReadMore }: MinimalistTimelineCardProps) {
  const { playHover, playClick } = useSound();

  const handleReadMore = () => {
    playClick();
    onReadMore();
  };

  // Convert date to proper format
  const formattedDate = event.date ? formatDate(event.date, { day: 'numeric', month: 'numeric', year: 'numeric' }) : '';

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onMouseEnter={playHover}
    >
      <div className="p-6">
        {/* Title and date - styled like the example image */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-heading font-normal text-gray-800">{event.title}</h3>
          <div className="flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs">
            <Calendar className="w-3 h-3 mr-1.5" />
            {formattedDate}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 text-sm">
          {event.shortDescription}
        </p>

        {/* Image - Adaptive height container for any orientation */}
        <div className="rounded-lg overflow-hidden mb-4 relative aspect-[4/3]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Date in small text below image */}
        <div className="text-gray-500 text-xs mb-3 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(event.date, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Read more button */}
        <div className="flex justify-end">
          <button
            onClick={handleReadMore}
            className="flex items-center text-xs text-gray-700 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors group"
          >
            <span>Read more</span>
            <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}