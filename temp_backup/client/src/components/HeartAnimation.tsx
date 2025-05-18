import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeartAnimation() {
  const [hearts, setHearts] = useState<{ id: number; delay: number }[]>([]);

  useEffect(() => {
    // Create hearts with staggered delays
    const newHearts = [
      { id: 1, delay: 0 },
      { id: 2, delay: 2 },
      { id: 3, delay: 4 },
    ];
    setHearts(newHearts);

    // Continuously replace hearts
    const interval = setInterval(() => {
      setHearts((currentHearts) => {
        const oldestHeartId = Math.min(...currentHearts.map((h) => h.id));
        const newHeartId = Math.max(...currentHearts.map((h) => h.id)) + 1;
        return [
          ...currentHearts.filter((h) => h.id !== oldestHeartId),
          { id: newHeartId, delay: 0 },
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const floatVariants = {
    initial: { y: 0, opacity: 0, scale: 0.8 },
    animate: (delay: number) => ({
      y: -200,
      opacity: [0, 0.9, 0],
      scale: 1,
      transition: {
        y: {
          duration: 6,
          delay,
          ease: "easeOut",
        },
        opacity: {
          duration: 6,
          delay,
          times: [0, 0.15, 1],
          ease: "easeInOut",
        },
        scale: {
          duration: 1,
          delay,
        },
      },
    }),
  };

  return (
    <div className="heart-animation absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 z-10">
      {hearts.map(({ id, delay }) => (
        <motion.div
          key={id}
          className="absolute left-1/2 -translate-x-1/2 w-5 h-5 origin-center"
          style={{
            background: "linear-gradient(45deg, #FF758F, #FF8FA3)",
            transform: "rotate(45deg)",
          }}
          variants={floatVariants}
          initial="initial"
          animate="animate"
          custom={delay}
        >
          <div
            className="absolute w-5 h-5 rounded-full"
            style={{
              background: "inherit",
              top: "-2.5px",
              left: 0,
            }}
          ></div>
          <div
            className="absolute w-5 h-5 rounded-full"
            style={{
              background: "inherit",
              top: 0,
              left: "-2.5px",
            }}
          ></div>
        </motion.div>
      ))}
    </div>
  );
}
