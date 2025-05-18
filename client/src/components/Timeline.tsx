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
        <div className="text-center mb-12" data-aos="fade-up">
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

        {/* Vertical Timeline with Center Line */}
        <div className="relative mt-16">
          {/* Center vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 rounded-full"></div>
          
          <div className="relative">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative mb-16`}
              >
                {/* Timeline event for left side (even index) */}
                {index % 2 === 0 && (
                  <>
                    <div className="w-5/12 pr-8">
                      <MinimalistTimelineCard
                        event={event}
                        onReadMore={() => onEventClick(event)}
                      />
                    </div>
                    <div className="absolute left-1/2 top-10 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10"></div>
                  </>
                )}
                
                {/* Timeline event for right side (odd index) */}
                {index % 2 === 1 && (
                  <>
                    <div className="w-5/12 invisible">
                      {/* This is empty space for the left side when event is on the right */}
                    </div>
                    <div className="absolute left-1/2 top-10 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10"></div>
                    <div className="w-5/12 pl-8">
                      <MinimalistTimelineCard
                        event={event}
                        onReadMore={() => onEventClick(event)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
