import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Event } from "@/lib/types";
import { useSound } from "@/lib/SoundContext";
import { Calendar, ArrowRight, Clock } from "lucide-react";

interface TimelineProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function Timeline({ events, onEventClick }: TimelineProps) {
  const { playHover, playClick } = useSound();

  const handleEventClick = (event: Event) => {
    playClick();
    onEventClick(event);
  };

  return (
    <section 
      id="timeline" 
      className="py-20 bg-gradient-to-b from-white/60 to-pink-50/60 backdrop-blur-sm"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900">
            Our Journey Together
          </h2>
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
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div 
                className="timeline-content bg-white/90 backdrop-blur-sm shadow-lg shadow-pink-100/50 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                onMouseEnter={playHover}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                      {event.title}
                    </h3>
                    <div className="flex items-center bg-secondary/30 text-primary px-3 py-1 rounded-full text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(event.date, { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {event.shortDescription}
                  </p>
                  <div className="overflow-hidden rounded-lg mb-4 group">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-48 object-cover rounded-lg transform transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatDate(event.date, { month: 'short', year: 'numeric' })}</span>
                    </div>
                    <button 
                      className="flex items-center px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors focus:outline-none group"
                      onClick={() => handleEventClick(event)}
                    >
                      <span>Read more</span>
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
