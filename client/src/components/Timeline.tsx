import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/types";

interface TimelineProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function Timeline({ events, onEventClick }: TimelineProps) {
  return (
    <section id="timeline" className="py-20 bg-white/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900">Our Journey Together</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every step of our journey has been a beautiful memory that we cherish forever.
          </p>
        </div>

        <div className="relative timeline-container py-10">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              className="timeline-item mb-16 md:mb-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-content bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold text-primary">{event.title}</h3>
                    <span className="bg-secondary/30 text-primary px-3 py-1 rounded-full text-sm">
                      {formatDate(event.date, { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {event.shortDescription}
                  </p>
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-48 object-cover rounded-lg" 
                  />
                  <button 
                    className="mt-4 text-primary hover:text-accent transition-colors focus:outline-none group flex items-center"
                    onClick={() => onEventClick(event)}
                  >
                    Read more 
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
