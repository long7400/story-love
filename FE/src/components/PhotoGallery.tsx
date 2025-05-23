import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Photo } from "@/lib/types";
import { useSound } from "@/lib/SoundContext";
import { Camera, Calendar, Eye } from "lucide-react";

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export default function PhotoGallery({ photos, onPhotoClick }: PhotoGalleryProps) {
  const visiblePhotos = photos.slice(0, 6);
  const remainingCount = Math.max(0, photos.length - 6);
  const { playHover, playClick } = useSound();

  const handlePhotoClick = (index: number) => {
    playClick();
    onPhotoClick(index);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-pink-50/60 to-white/60" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="mb-4 text-gray-400 tracking-[0.4em] text-xs uppercase">
            Photos
          </div>
          <h2 className="text-3xl md:text-4xl font-script mb-6 text-gray-800">
            Our Beautiful Memories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
            Each photo tells a story of our love, joy, and adventures together.
          </p>
        </div>

        <div className="grid grid-cols-1 iphone:grid-cols-2 tablet:grid-cols-3 gap-4 iphone:gap-6 tablet:gap-8">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer bg-white"
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handlePhotoClick(index)}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden group aspect-[3/4] iphone:aspect-[4/3]">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0"
                  loading="lazy"
                />
                
                {/* Overlay */}
                {index === 5 && remainingCount > 0 ? (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300">
                    <div className="text-center">
                      <span className="text-white text-3xl iphone:text-4xl font-bold flex items-center justify-center">
                        +{remainingCount}
                      </span>
                      <div className="flex items-center mt-2 text-white/90 text-xs iphone:text-sm">
                        <Eye className="w-3.5 h-3.5 iphone:w-4 iphone:h-4 mr-1" />
                        <span>View all photos</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-primary/70 transition-all duration-300 flex flex-col justify-end">
                    <div className="p-3 iphone:p-4 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-heading font-bold text-white text-base iphone:text-lg">{photo.title}</h4>
                      <div className="flex items-center text-white/80 text-xs iphone:text-sm mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <p>{formatDate(photo.date, { month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* View icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5 text-primary" />
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
