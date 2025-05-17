import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Photo } from "@/lib/types";

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export default function PhotoGallery({ photos, onPhotoClick }: PhotoGalleryProps) {
  const visiblePhotos = photos.slice(0, 6);
  const remainingCount = Math.max(0, photos.length - 6);

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900">
            Our Beautiful Memories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each photo tells a story of our love, joy, and adventures together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
              whileHover={{ y: -5 }}
              onClick={() => onPhotoClick(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {index === 5 && remainingCount > 0 ? (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">+{remainingCount}</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h4 className="font-heading font-bold">{photo.title}</h4>
                      <p className="text-sm">{formatDate(photo.date, { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
