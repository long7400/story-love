import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Photo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryModalProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

export default function GalleryModal({ photos, initialIndex, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentPhoto = photos[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
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
            <Dialog.Overlay className="fixed inset-0 bg-black/90 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl relative">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10 p-2 rounded-full bg-black/30"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center justify-between w-full">
                <button
                  className="text-white hover:text-gray-300 focus:outline-none p-4"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>

                <div className="flex-1 mx-4">
                  <div className="relative">
                    <img
                      src={currentPhoto.imageUrl}
                      alt={currentPhoto.title}
                      className="w-full max-h-[70vh] object-contain rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h4 className="text-xl font-heading font-bold text-white mb-1">
                        {currentPhoto.title}
                      </h4>
                      <p className="text-gray-300">
                        {formatDate(currentPhoto.date)}
                      </p>
                      <p className="text-white mt-2">{currentPhoto.description}</p>
                    </div>
                  </div>
                </div>

                <button
                  className="text-white hover:text-gray-300 focus:outline-none p-4"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </div>

              <div className="flex justify-center mt-4 overflow-x-auto">
                <div className="flex space-x-2 p-2">
                  {photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      className={`w-12 h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? "border-primary/80 scale-110"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img
                        src={photo.imageUrl}
                        alt={`Thumbnail for ${photo.title}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
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
