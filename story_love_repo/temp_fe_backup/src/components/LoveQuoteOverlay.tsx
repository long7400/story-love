import { useState, useEffect } from 'react';
import { useSound } from '@/lib/SoundContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  {
    text: "Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhìn về một hướng.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    text: "Tình yêu bắt đầu bằng một nụ cười, phát triển bằng một nụ hôn, và kết thúc bằng một giọt nước mắt.",
    author: "Dân gian"
  },
  {
    text: "Khi tình yêu không trọn vẹn, nó sẽ không bao giờ đủ; sự thỏa mãn duy nhất là yêu cho đến tận cùng.",
    author: "Minh Hiền"
  },
  {
    text: "Nếu tôi biết điều gì về tình yêu, đó là nhờ có em.",
    author: "Hermann Hesse"
  },
  {
    text: "Tình yêu không hề mù quáng - nó chỉ nhìn thấy những gì quan trọng thật sự.",
    author: "William Shakespeare"
  },
  {
    text: "Yêu nhau không phải là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng.",
    author: "Antoine de Saint-Exupéry"
  },
  {
    text: "Tình yêu là khi hạnh phúc của người khác trở nên thiết yếu như hạnh phúc của chính bạn.",
    author: "Robert A. Heinlein"
  },
  {
    text: "Tôi yêu em, không phải vì em là ai, mà vì khi ở bên em, tôi là chính mình.",
    author: "Roy Croft"
  },
  {
    text: "Người ta có thể quên đi một người, nhưng không thể quên đi một cảm xúc.",
    author: "Nguyễn Ngọc Tư"
  },
  {
    text: "Đừng yêu một ai đó vì vẻ đẹp bên ngoài, nó sẽ phai tàn theo năm tháng. Đừng yêu một ai đó vì giọng nói, nó sẽ im lặng trước cái chết. Hãy yêu một người mà trái tim bạn thủ thỉ 'đây chính là người ấy.'",
    author: "Dân gian"
  },
  {
    text: "Tình yêu không đến với những người tìm kiếm nó, mà đến với những người chờ đợi nó.",
    author: "Oscar Wilde"
  },
  {
    text: "Tình yêu không là điều bạn tìm thấy. Tình yêu là điều tìm thấy bạn.",
    author: "Loretta Young"
  }
];

export default function LoveQuoteOverlay() {
  const [visible, setVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { playClick } = useSound();

  // Hiển thị trích dẫn khi người dùng cuộn đến vị trí nhất định
  useEffect(() => {
    const handleScroll = () => {
      // Hiển thị trích dẫn khi người dùng cuộn xuống khoảng 30% trang
      const scrollTrigger = window.innerHeight * 0.3;
      if (window.scrollY > scrollTrigger && !visible) {
        setVisible(true);
      } else if (window.scrollY < scrollTrigger && visible) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  // Thay đổi trích dẫn tự động sau mỗi 15 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Cập nhật trích dẫn hiện tại khi index thay đổi
  useEffect(() => {
    setCurrentQuote(quotes[quoteIndex]);
  }, [quoteIndex]);

  // Thay đổi trích dẫn khi người dùng nhấp
  const handleChangeQuote = () => {
    playClick();
    setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 right-8 max-w-md z-40"
        >
          <div 
            className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-6 border border-pink-100"
            style={{ boxShadow: '0 8px 32px rgba(252, 165, 165, 0.2)' }}
          >
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setVisible(false)}
              aria-label="Đóng trích dẫn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex items-start mb-4">
              <svg className="text-pink-400 h-8 w-8 flex-shrink-0 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div>
                <motion.p 
                  key={currentQuote.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-gray-800 font-medium leading-relaxed italic mb-2"
                >
                  {currentQuote.text}
                </motion.p>
                <motion.p 
                  key={currentQuote.author}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-right text-gray-500 text-sm"
                >
                  — {currentQuote.author}
                </motion.p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {quotes.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-1.5 h-1.5 rounded-full ${index === quoteIndex ? 'bg-primary' : 'bg-gray-300'}`} 
                  />
                ))}
              </div>
              
              <button 
                onClick={handleChangeQuote}
                className="text-xs text-primary hover:text-primary-dark transition-colors flex items-center"
              >
                <span>Trích dẫn khác</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}