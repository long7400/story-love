import { motion } from "framer-motion";
import { Event } from "@/lib/types";
import { Clock } from "lucide-react";
import MinimalistTimelineCard from "./MinimalistTimelineCard";

interface TimelineProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function Timeline({ events, onEventClick }: TimelineProps) {
  return (
    <section 
      id="timeline" 
      className="py-20 bg-gradient-to-b from-white/60 to-pink-50/60 backdrop-blur-sm"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-1 bg-primary rounded-full mr-2 opacity-70"></div>
            <Clock className="w-5 h-5 text-primary" />
            <div className="w-8 h-1 bg-primary rounded-full ml-2 opacity-70"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
            Our Journey Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every step of our journey has been a beautiful memory that we cherish forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {events.map((event, index) => (
            <MinimalistTimelineCard
              key={event.id}
              event={event}
              onReadMore={() => onEventClick(event)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
