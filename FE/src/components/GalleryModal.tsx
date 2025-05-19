import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Photo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, Calendar, Info, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/lib/SoundContext";

interface GalleryModalProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

export default function GalleryModal({ photos, initialIndex, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentPhoto = photos[currentIndex];
  const { playClick, playSuccess } = useSound();

  const handleNext = () => {
    playClick();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    playClick();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    // Play success sound when modal opens
    playSuccess();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl relative">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </motion.button>

              <div className="flex items-center justify-between w-full">
                <motion.button
                  whileHover={{ scale: 1.2, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 focus:outline-none transition-colors"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>

                <div className="flex-1 mx-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative rounded-xl overflow-hidden"
                    >
                      <div className="bg-black w-full aspect-[16/10] flex items-center justify-center">
                        <img
                          src={currentPhoto.imageUrl}
                          alt={currentPhoto.title}
                          className="max-w-full max-h-[70vh] object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Heart className="h-4 w-4 text-pink-300" />
                            <h4 className="text-xl font-heading font-bold text-white">
                              {currentPhoto.title}
                            </h4>
                          </div>
                          <div className="flex items-center mb-3 text-gray-300">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <p>{formatDate(currentPhoto.date)}</p>
                            <span className="mx-2">•</span>
                            <Info className="h-3.5 w-3.5 mr-1.5" />
                            <p className="text-sm">{`Photo ${currentIndex + 1} of ${photos.length}`}</p>
                          </div>
                          {currentPhoto.htmlEnabled ? (
                            <div 
                              className="text-white/90 photo-description" 
                              dangerouslySetInnerHTML={{ __html: currentPhoto.description }}
                            />
                          ) : (
                            <p className="text-white/90">{currentPhoto.description}</p>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.2, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 focus:outline-none transition-colors"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="flex justify-center mt-6 overflow-x-auto px-2 max-w-full">
                <div className="flex space-x-2 p-2 bg-black/30 backdrop-blur-sm rounded-xl w-auto">
                  {photos.map((photo, index) => (
                    <motion.button
                      key={photo.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? "border-primary shadow-lg shadow-primary/20 scale-110"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => {
                        playClick();
                        setCurrentIndex(index);
                      }}
                    >
                      <img
                        src={photo.imageUrl}
                        alt={`Thumbnail for ${photo.title}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
