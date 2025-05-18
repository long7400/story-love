import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/lib/SoundContext';

interface LoveButtonProps {
  className?: string;
}

export default function LoveButton({ className = '' }: LoveButtonProps) {
  // Always start with heart active by default
  const [isActive, setIsActive] = useState(true);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; scale: number; rotation: number }[]>([]);
  const { playClick } = useSound();

  // Load saved state on initial render
  useEffect(() => {
    // We just set it to true by default, no need to check localStorage
    // since we want it to always be in active state
    setIsActive(true);
    
    // Create initial hearts animation when page loads
    setTimeout(() => {
      createHeartBurst();
    }, 1000);
  }, []);

  // Create heart animation (but don't toggle state)
  const triggerHeartAnimation = () => {
    playClick();
    createHeartBurst();
  };

  // Generate random hearts for the burst animation
  const createHeartBurst = () => {
    const newHearts = [];
    const numHearts = 15;

    for (let i = 0; i < numHearts; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 200 - 100, // Random x offset
        y: Math.random() * -250, // Random y offset
        scale: 0.5 + Math.random() * 1.5, // Random size
        rotation: Math.random() * 360 // Random rotation
      });
    }

    setHearts(newHearts);
  };

  // Clear hearts after animation is complete
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div className={`fixed z-50 bottom-20 right-6 ${className}`}>
      <motion.button
        className="w-12 h-12 rounded-full shadow-lg bg-white flex items-center justify-center"
        onClick={triggerHeartAnimation}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Always red heart */}
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
      </motion.button>

      {/* Heart burst animation container */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0,
                rotate: 0 
              }}
              animate={{ 
                x: heart.x, 
                y: heart.y, 
                scale: heart.scale,
                opacity: [0, 1, 0],
                rotate: heart.rotation 
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 2 + Math.random(),
                ease: "easeOut",
              }}
            >
              <Heart className="fill-red-500 text-red-500 w-6 h-6" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full screen love overlay when active - Always active */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Floating hearts animation in active state */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5 + Math.random() * 1.5,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 0.7, 0],
              transition: {
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 5
              }
            }}
          >
            <Heart className="w-4 h-4 fill-red-500 opacity-30" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}