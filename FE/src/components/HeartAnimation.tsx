import React, { useState, useEffect, useCallback } from 'react';
import '../styles/loveQuestion.css';

interface HeartAnimationProps {
  isActive: boolean;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ isActive }) => {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number }[]>([]);

  // Tạo hiệu ứng trái tim bay lên khi nút "Có" được nhấn
  const createHearts = useCallback(() => {
    if (!isActive) return;

    const newHearts = [];
    const count = Math.floor(Math.random() * 3) + 4; // Tạo 4-6 trái tim

    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Date.now() + i,
        left: Math.random() * 100, // Vị trí ngẫu nhiên theo chiều ngang (%)
        size: Math.random() * 25 + 15, // Kích thước ngẫu nhiên từ 15px đến 40px
      });
    }

    setHearts((prevHearts) => [...prevHearts, ...newHearts]);

    // Xóa trái tim sau khi hoàn thành animation
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter(heart => !newHearts.includes(heart)));
    }, 4000);
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      // Khởi tạo hiệu ứng ban đầu
      createHearts();

      // Tạo hiệu ứng liên tục nếu trạng thái active
      const interval = setInterval(createHearts, 800);
      
      // Dọn dẹp
      return () => clearInterval(interval);
    }
  }, [isActive, createHearts]);

  return (
    <div className="heart-animation-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-animation"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          <span role="img" aria-label="heart" className="floating-heart">❤️</span>
        </div>
      ))}
    </div>
  );
};

export default HeartAnimation;