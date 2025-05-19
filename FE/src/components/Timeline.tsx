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
          <div className="mb-4 text-gray-400 tracking-[0.4em] text-xs uppercase">
            Timeline
          </div>
          <h2 className="text-3xl md:text-4xl font-script mb-6 text-gray-800">
            Our Journey Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
            Every step of our journey has been a beautiful memory that we cherish forever.
          </p>
        </div>

        {/* Vertical Timeline with Center Line - Desktop */}
        <div className="relative mt-16 hidden tabs9:block">
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
                    <div className="absolute left-1/2 top-10 transform -translate-x-1/2 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center z-10">
                      <svg className="w-5 h-5 text-primary fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </>
                )}
                
                {/* Timeline event for right side (odd index) */}
                {index % 2 === 1 && (
                  <>
                    <div className="w-5/12 invisible">
                      {/* This is empty space for the left side when event is on the right */}
                    </div>
                    <div className="absolute left-1/2 top-10 transform -translate-x-1/2 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center z-10">
                      <svg className="w-5 h-5 text-primary fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
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
        
        {/* Mobile timeline - single column */}
        <div className="relative mt-10 block tabs9:hidden">
          {/* Left vertical line */}
          <div className="absolute left-5 transform h-full w-1 bg-pink-200 rounded-full"></div>
          
          <div className="relative">
            {events.map((event) => (
              <div key={event.id} className="flex relative mb-10">
                <div className="absolute left-5 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center z-10">
                  <svg className="w-4 h-4 text-primary fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div className="ml-10 w-full">
                  <MinimalistTimelineCard
                    event={event}
                    onReadMore={() => onEventClick(event)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
