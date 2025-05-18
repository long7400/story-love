import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { X, Calendar, Heart } from "lucide-react";
import { useSound } from "@/lib/SoundContext";
import { motion } from "framer-motion";

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const { playSuccess } = useSound();
  
  useEffect(() => {
    // Play success sound when modal opens
    playSuccess();
    
    // Add escape key listener
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, playSuccess]);

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-pink-200/30 w-full max-w-2xl overflow-hidden transform transition-all">
              <div className="relative">
                {/* Header Image with Gradient Overlay */}
                <div className="relative w-full overflow-hidden aspect-video">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent">
                    <div className="p-6 text-white">
                      <div className="flex justify-between items-start">
                        <Dialog.Title className="text-2xl font-heading font-bold">
                          {event.title}
                        </Dialog.Title>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 focus:outline-none"
                          onClick={onClose}
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </div>
                      <div className="flex items-center mt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-white/90 text-sm">
                          {formatDate(event.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="h-px w-12 bg-primary opacity-30"></div>
                      <Heart className="h-4 w-4 mx-3 text-primary" />
                      <div className="h-px w-12 bg-primary opacity-30"></div>
                    </div>
                    <div 
                      className="text-gray-700 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.fullDescription }}
                    />
                  </div>
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary to-pink-400 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300"
                      onClick={onClose}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
