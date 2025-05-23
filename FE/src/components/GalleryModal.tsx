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
                className="absolute top-2 iphone:top-3 tablet:top-4 right-2 iphone:right-3 tablet:right-4 z-10 p-2 iphone:p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
                onClick={onClose}
              >
                <X className="h-4 w-4 iphone:h-5 iphone:w-5" />
              </motion.button>

              <div className="flex items-center justify-between w-full">
                <motion.button
                  whileHover={{ scale: 1.2, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-sm rounded-full p-2 iphone:p-2.5 tablet:p-3 text-white hover:bg-white/20 focus:outline-none transition-colors"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-5 w-5 iphone:h-5.5 iphone:w-5.5 tablet:h-6 tablet:w-6" />
                </motion.button>

                <div className="flex-1 mx-2 iphone:mx-3 tablet:mx-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative rounded-xl overflow-hidden"
                    >
                      <div className="bg-black w-full aspect-auto min-h-[40vh] flex items-center justify-center">
                        <img
                          src={currentPhoto.imageUrl}
                          alt={currentPhoto.title}
                          className="max-w-full max-h-[50vh] iphone:max-h-[55vh] tablet:max-h-[65vh] object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 iphone:p-4 tablet:p-6">
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center space-x-2 mb-1.5 iphone:mb-2">
                            <Heart className="h-3.5 w-3.5 iphone:h-4 iphone:w-4 text-pink-300" />
                            <h4 className="text-lg iphone:text-xl font-heading font-bold text-white">
                              {currentPhoto.title}
                            </h4>
                          </div>
                          <div className="flex flex-wrap items-center mb-2 iphone:mb-3 text-gray-300">
                            <Calendar className="h-3 w-3 iphone:h-3.5 iphone:w-3.5 mr-1" />
                            <p className="text-xs iphone:text-sm">{formatDate(currentPhoto.date)}</p>
                            <span className="mx-1.5 iphone:mx-2">•</span>
                            <Info className="h-3 w-3 iphone:h-3.5 iphone:w-3.5 mr-1" />
                            <p className="text-xs iphone:text-sm">{`Photo ${currentIndex + 1} of ${photos.length}`}</p>
                          </div>
                          {currentPhoto.htmlEnabled ? (
                            <div 
                              className="text-white/90 text-xs iphone:text-sm tablet:text-base photo-description" 
                              dangerouslySetInnerHTML={{ __html: currentPhoto.description }}
                            />
                          ) : (
                            <p className="text-white/90 text-xs iphone:text-sm tablet:text-base">{currentPhoto.description}</p>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.2, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-sm rounded-full p-2 iphone:p-2.5 tablet:p-3 text-white hover:bg-white/20 focus:outline-none transition-colors"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5 iphone:h-5.5 iphone:w-5.5 tablet:h-6 tablet:w-6" />
                </motion.button>
              </div>

              <div className="flex justify-center mt-4 iphone:mt-5 tablet:mt-6 overflow-x-auto px-2 max-w-full">
                <div className="flex space-x-1 iphone:space-x-1.5 tablet:space-x-3 p-1.5 iphone:p-2 bg-black/30 backdrop-blur-sm rounded-xl w-auto">
                  {photos.map((photo, index) => (
                    <motion.button
                      key={photo.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 iphone:w-12 iphone:h-12 iphoneplus:w-14 iphoneplus:h-14 tablet:w-16 tablet:h-16 rounded-md iphone:rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
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
