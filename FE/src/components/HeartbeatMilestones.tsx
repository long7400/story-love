import { useState, useEffect, useRef } from 'react';
import { useSound } from '@/lib/SoundContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Milestone {
  id: number;
  date: string;
  title: string;
  days: number;
}

interface HeartbeatMilestonesProps {
  startDate: string;
  profile1Name: string;
  profile2Name: string;
}

export default function HeartbeatMilestones({ startDate, profile1Name, profile2Name }: HeartbeatMilestonesProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [heartbeatSpeed, setHeartbeatSpeed] = useState(1000); // ms between beats
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [daysTotal, setDaysTotal] = useState(0);
  const heartRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSound();

  // Hiệu ứng nhịp tim và âm thanh
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Tính số ngày yêu nhau
  useEffect(() => {
    if (!startDate) return;
    
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysTotal(diffDays);
    
    // Tạo các cột mốc
    const milestonesList: Milestone[] = [
      { id: 1, date: formatDate(start), title: 'Ngày bắt đầu', days: 0 },
      { id: 2, date: formatDate(addDays(start, 100)), title: '100 ngày yêu', days: 100 },
      { id: 3, date: formatDate(addDays(start, 365)), title: '1 năm bên nhau', days: 365 },
      { id: 4, date: formatDate(addDays(start, 500)), title: '500 ngày yêu', days: 500 },
      { id: 5, date: formatDate(addDays(start, 730)), title: '2 năm bên nhau', days: 730 },
      { id: 6, date: formatDate(addDays(start, 1000)), title: '1000 ngày yêu', days: 1000 },
      { id: 7, date: formatDate(addDays(start, 1095)), title: '3 năm bên nhau', days: 1095 },
      { id: 8, date: formatDate(addDays(start, 1461)), title: '4 năm bên nhau', days: 1461 },
      { id: 9, date: formatDate(addDays(start, 1825)), title: '5 năm bên nhau', days: 1825 },
    ].filter(m => m.days <= diffDays + 365); // Chỉ hiện các cột mốc đã qua và sắp tới
    
    setMilestones(milestonesList);
    
    // Đặt nhịp tim dựa trên số ngày
    if (diffDays < 100) {
      setHeartbeatSpeed(800); // Nhanh hơn - tình yêu mới
    } else if (diffDays < 365) {
      setHeartbeatSpeed(900);
    } else if (diffDays < 1000) {
      setHeartbeatSpeed(1000);
    } else {
      setHeartbeatSpeed(1100); // Chậm hơn - tình yêu chín muồi
    }
  }, [startDate]);

  // Hiệu ứng nhịp tim
  useEffect(() => {
    if (!heartRef.current) return;
    
    // Tạo hiệu ứng nhịp tim
    const heartbeat = () => {
      if (!heartRef.current) return;
      
      heartRef.current.classList.add('scale-110');
      setTimeout(() => {
        if (heartRef.current) {
          heartRef.current.classList.remove('scale-110');
        }
      }, heartbeatSpeed / 4);

      // Phát âm thanh nhịp tim nếu hiển thị chi tiết
      if (showDetails && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.log('Error playing heartbeat sound:', err));
      }
    };
    
    // Bắt đầu nhịp tim
    const intervalId = setInterval(heartbeat, heartbeatSpeed);
    
    // Cleanup khi component unmount
    return () => clearInterval(intervalId);
  }, [heartbeatSpeed, showDetails]);

  // Helper functions
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const addDays = (date: Date, days: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };
  
  const handleToggleDetails = () => {
    playClick();
    setShowDetails(!showDetails);
  };
  
  const handleMilestoneHover = (milestone: Milestone) => {
    setActiveMilestone(milestone);
  };
  
  const progressPercentage = (milestone: Milestone) => {
    if (milestone.days <= daysTotal) return 100;
    const nextMilestone = milestones.find(m => m.days > daysTotal);
    if (!nextMilestone || nextMilestone.id !== milestone.id) return 0;
    
    const prevMilestone = milestones.find(m => m.days <= daysTotal && m.id === milestone.id - 1);
    const startCount = prevMilestone ? prevMilestone.days : 0;
    const totalDiff = milestone.days - startCount;
    const currentDiff = daysTotal - startCount;
    
    return Math.min(100, Math.max(0, (currentDiff / totalDiff) * 100));
  };

  return (
    <div className="px-4 py-8 bg-white rounded-lg shadow-md relative overflow-hidden">
      <audio 
        ref={audioRef}
        src="/sounds/heartbeat.mp3" 
        preload="auto"
        className="hidden"
      />

      {/* Nền trái tim trang trí */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -right-12 -top-12 text-primary" style={{ fontSize: '20rem' }}>
          ❤
        </div>
        <div className="absolute -left-12 -bottom-12 text-primary" style={{ fontSize: '20rem' }}>
          ❤
        </div>
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl font-heading font-medium text-center mb-1">Nhịp đập trái tim</h2>
        <p className="text-gray-500 text-center mb-6">
          {daysTotal} ngày bên nhau và đang tiếp tục
        </p>
        
        <div className="flex flex-col items-center mb-4">
          <div 
            ref={heartRef}
            className="text-primary text-6xl iphone:text-6xl iphoneplus:text-7xl tablet:text-8xl cursor-pointer transform transition-transform duration-300"
            onClick={handleToggleDetails}
            style={{ textShadow: '0 0 15px rgba(239, 68, 68, 0.3)' }}
            aria-label="Trái tim nhịp đập - Nhấn để xem chi tiết"
          >
            ❤
          </div>
          
          <button 
            onClick={handleToggleDetails}
            className="mt-3 text-sm text-gray-600 flex items-center hover:text-primary transition-colors"
          >
            <span>{showDetails ? "Ẩn cột mốc" : "Xem cột mốc"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${showDetails ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-100 pt-4 pb-2">
                <p className="text-center text-gray-800 mb-4">
                  Tình yêu của {profile1Name} & {profile2Name} đã trải qua nhiều cột mốc đáng nhớ.
                </p>
                
                <div className="space-y-4 max-w-xl mx-auto">
                  {milestones.map((milestone) => {
                    const isCompleted = milestone.days <= daysTotal;
                    const isActive = activeMilestone?.id === milestone.id;
                    const isCurrent = daysTotal >= milestone.days && (!milestones[milestone.id] || milestones[milestone.id]?.days > daysTotal);
                    const progress = progressPercentage(milestone);
                    
                    return (
                      <div 
                        key={milestone.id}
                        className={`relative p-3 rounded-lg transition-colors ${
                          isActive ? 'bg-red-50' : ''
                        }`}
                        onMouseEnter={() => handleMilestoneHover(milestone)}
                        onMouseLeave={() => setActiveMilestone(null)}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="flex items-center">
                            {isCompleted ? (
                              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center flex-shrink-0">
                                {progress > 0 && (
                                  <div 
                                    className="bg-red-200 rounded-full"
                                    style={{ 
                                      width: `${(progress / 100) * 18}px`, 
                                      height: `${(progress / 100) * 18}px` 
                                    }}
                                  ></div>
                                )}
                              </div>
                            )}
                            <div>
                              <h3 className={`font-medium ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>
                                {milestone.title}
                              </h3>
                              <p className="text-xs text-gray-500">{milestone.date}</p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0 ml-9 sm:ml-0">
                            <span className={`
                              ${isCompleted ? 'text-primary' : 'text-gray-400'}
                              ${isCurrent ? 'font-bold' : 'font-medium'}
                            `}>
                              {milestone.days} ngày
                            </span>
                          </div>
                        </div>
                        
                        {/* Thanh tiến trình */}
                        {progress > 0 && progress < 100 && (
                          <div className="mt-2 h-1 bg-gray-100 rounded overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}