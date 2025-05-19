import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageTransitionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageTransition({ src, alt, className = '' }: ImageTransitionProps) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Bắt đầu tải hình ảnh mới
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };
    
    img.onerror = () => {
      console.error('Failed to load image:', src);
      setLoading(false);
    };
    
    return () => {
      // Cleanup
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md"
          >
            <div className="w-10 h-10 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.img
            key="image"
            src={imageSrc || ''}
            alt={alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </AnimatePresence>
    </div>
  );
}