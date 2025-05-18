import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useSound } from "@/lib/SoundContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MoodData {
  date: string;
  profile1Mood: number;
  profile2Mood: number;
}

interface MoodDashboardProps {
  profile1Name: string;
  profile2Name: string;
}

export default function MoodDashboard({ profile1Name, profile2Name }: MoodDashboardProps) {
  const [currentPeriod, setCurrentPeriod] = useState<'week' | 'month' | 'year'>('week');
  const { playClick } = useSound();
  
  // Giả định có API endpoint lấy dữ liệu tâm trạng
  // Trong thực tế, bạn sẽ có API riêng cho tính năng này
  const { data: moods, isLoading } = useQuery<MoodData[]>({
    queryKey: ['/api/moods', currentPeriod],
    // Sử dụng dữ liệu mẫu khi đang phát triển
    placeholderData: generateMockMoodData(currentPeriod, profile1Name, profile2Name),
  });

  function generateMockMoodData(period: 'week' | 'month' | 'year', name1: string, name2: string): MoodData[] {
    const data: MoodData[] = [];
    let days = period === 'week' ? 7 : period === 'month' ? 30 : 12;
    const labels = period === 'year' ? 
      ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'] : 
      Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        return period === 'week' ? 
          ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()] : 
          date.getDate().toString();
      });

    labels.forEach((label, index) => {
      // Tạo tâm trạng ngẫu nhiên từ 3-10 (thang điểm 10)
      // Có xu hướng biến động nhẹ theo ngày gần nhau
      let profile1Base = 7 + Math.sin(index * 0.5) * 2;
      let profile2Base = 7 + Math.cos(index * 0.5) * 2;

      // Thêm yếu tố ngẫu nhiên nhỏ
      const profile1Mood = Math.max(3, Math.min(10, profile1Base + (Math.random() - 0.5)));
      const profile2Mood = Math.max(3, Math.min(10, profile2Base + (Math.random() - 0.5)));

      data.push({
        date: label,
        profile1Mood: parseFloat(profile1Mood.toFixed(1)),
        profile2Mood: parseFloat(profile2Mood.toFixed(1))
      });
    });

    return data;
  }

  // Hiệu ứng chuyển cảnh
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Các hàm trợ giúp để hiện thị tâm trạng
  const getMoodText = (value: number): string => {
    if (value >= 9) return 'Hạnh phúc tuyệt vời';
    if (value >= 8) return 'Rất vui';
    if (value >= 7) return 'Vui vẻ';
    if (value >= 6) return 'Khá ổn';
    if (value >= 5) return 'Bình thường';
    if (value >= 4) return 'Hơi buồn';
    return 'Không tốt lắm';
  };

  const getMoodColor = (value: number): string => {
    if (value >= 9) return 'text-pink-500';
    if (value >= 8) return 'text-rose-400';
    if (value >= 7) return 'text-orange-400';
    if (value >= 6) return 'text-amber-400';
    if (value >= 5) return 'text-yellow-400';
    if (value >= 4) return 'text-blue-400';
    return 'text-blue-600';
  };

  const getAverageMood = (data: MoodData[], key: 'profile1Mood' | 'profile2Mood'): number => {
    if (!data || data.length === 0) return 0;
    const sum = data.reduce((acc, item) => acc + item[key], 0);
    return parseFloat((sum / data.length).toFixed(1));
  };

  if (isLoading || !moods) {
    return (
      <div className="px-4 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-heading font-medium text-center mb-6">Đang tải tâm trạng...</h2>
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const profile1Avg = getAverageMood(moods, 'profile1Mood');
  const profile2Avg = getAverageMood(moods, 'profile2Mood');
  const relationshipAvg = parseFloat(((profile1Avg + profile2Avg) / 2).toFixed(1));

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} px-4 py-8 bg-white rounded-lg shadow-md`}>
      <h2 className="text-2xl font-heading font-medium text-center mb-2">Bảng điều khiển tâm trạng</h2>
      <p className="text-gray-500 text-center mb-6">Theo dõi hành trình cảm xúc của cả hai</p>
      
      {/* Tóm tắt tâm trạng */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg flex-1 text-center">
          <h3 className="font-medium text-lg mb-1">{profile1Name}</h3>
          <div className={`text-3xl font-bold ${getMoodColor(profile1Avg)}`}>{profile1Avg}</div>
          <p className="text-sm text-gray-600">{getMoodText(profile1Avg)}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg flex-1 text-center">
          <h3 className="font-medium text-lg mb-1">Chúng mình</h3>
          <div className="text-4xl font-bold text-primary">{relationshipAvg}</div>
          <p className="text-sm text-gray-600">{getMoodText(relationshipAvg)}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg flex-1 text-center">
          <h3 className="font-medium text-lg mb-1">{profile2Name}</h3>
          <div className={`text-3xl font-bold ${getMoodColor(profile2Avg)}`}>{profile2Avg}</div>
          <p className="text-sm text-gray-600">{getMoodText(profile2Avg)}</p>
        </div>
      </div>
      
      {/* Bộ lọc thời gian */}
      <div className="flex justify-center gap-2 mb-6">
        {(['week', 'month', 'year'] as const).map((period) => (
          <button
            key={period}
            onClick={() => {
              playClick();
              setCurrentPeriod(period);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentPeriod === period 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {period === 'week' ? 'Tuần' : period === 'month' ? 'Tháng' : 'Năm'}
          </button>
        ))}
      </div>
      
      {/* Biểu đồ tâm trạng */}
      <div className="w-full h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={moods}
            margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip 
              formatter={(value, name) => {
                const displayName = name === 'profile1Mood' ? profile1Name : profile2Name;
                return [`${value} - ${getMoodText(Number(value))}`, displayName];
              }}
            />
            <Legend 
              payload={[
                { value: profile1Name, type: 'rect', color: '#f87171' },
                { value: profile2Name, type: 'rect', color: '#60a5fa' }
              ]}
            />
            <Bar dataKey="profile1Mood" name="profile1Mood" fill="#f87171" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profile2Mood" name="profile2Mood" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Ghi chú */}
      <p className="text-xs text-gray-500 text-center mt-4 italic">
        Tâm trạng được đo trên thang điểm 10, với 10 là hạnh phúc nhất
      </p>
    </div>
  );
}