import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import apiConfig from '../config/apiConfig';
import HeartAnimation from './HeartAnimation';
import '../styles/loveQuestion.css';

interface LoginFormProps {
  onSuccess: (token: string) => void;
}

const StorefrontLoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'credentials' | 'loveQuestion'>('credentials');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  
  const [, setLocation] = useLocation();

  // Hàm di chuyển nút "Không" khi chuột tới gần
  const moveNoButton = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    setNoButtonPosition({ x: newX, y: newY });
  };
  
  // Cảm biến khi chuột di chuyển gần nút "Không"
  const handleMouseMove = (e: React.MouseEvent) => {
    if (step !== 'loveQuestion' || !noButtonRef.current) return;
    
    // Lấy vị trí của nút và vị trí chuột
    const rect = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    // Tính khoảng cách từ chuột đến trung tâm nút
    const dx = e.clientX - buttonCenterX;
    const dy = e.clientY - buttonCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Nếu chuột di chuyển lại gần nút, di chuyển nút đi nơi khác
    const proximityThreshold = 150; // px
    if (distance < proximityThreshold) {
      moveNoButton();
    }
  };

  const checkGender = async () => {
    try {
      // Kiểm tra thông tin tài khoản và chuyển sang bước kích hoạt
      const response = await axios.post(`${apiConfig.baseUrl}/api/storefront/check-account`, {
        username,
        password
      });
      
      // Giả định response thành công và đây là tài khoản PARTNER
      setGender('male'); // Mặc định giá trị (sẽ được cập nhật sau khi đăng nhập thành công)
      setStep('loveQuestion');
    } catch (err: any) {
      console.error('Lỗi khi xác thực tài khoản:', err);
      
      // Nếu lỗi 401 Unauthorized, vẫn chuyển sang màn hình kích hoạt
      if (err.response && err.response.status === 401) {
        setStep('loveQuestion');
        setError(''); // Xóa thông báo lỗi nếu có
      } else {
        setError('Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (step === 'credentials') {
        // Kiểm tra giới tính trước khi chuyển sang bước câu hỏi tình yêu
        await checkGender();
      } else {
        // Đăng nhập thực sự
        const response = await axios.post(`${apiConfig.baseUrl}/api/storefront/login`, {
          username,
          password
        });
        
        if (response.data && response.data.accessToken) {
          // Lưu token vào localStorage
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('user', JSON.stringify({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            roles: response.data.roles
          }));
          
          // Thông báo đăng nhập thành công
          onSuccess(response.data.accessToken);
          
          // Chuyển hướng đến trang chính
          setLocation('/');
        }
      }
    } catch (err: any) {
      console.error('Lỗi đăng nhập:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        // Đây là giai đoạn kích hoạt tài khoản
        setError('');
        setStep('loveQuestion');
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleYesClick = async () => {
    // Kích hoạt hiệu ứng trái tim
    setShowHeartAnimation(true);
    setLoading(true);
    
    try {
      // Gọi API kích hoạt tài khoản
      const response = await axios.post(`${apiConfig.baseUrl}/api/storefront/activate-account`, {
        username,
        password
      });
      
      if (response.data && response.data.accessToken) {
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles
        }));
        
        // Thông báo đăng nhập thành công và để component cha xử lý chuyển hướng
        onSuccess(response.data.accessToken);
      }
    } catch (err) {
      console.error('Lỗi khi kích hoạt tài khoản:', err);
      setError('Kích hoạt tài khoản thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      
      // Tắt hiệu ứng sau 5 giây
      setTimeout(() => {
        setShowHeartAnimation(false);
      }, 5000);
    }
  };

  // Reset vị trí nút "Không" khi component được tải
  useEffect(() => {
    if (step === 'loveQuestion') {
      setNoButtonPosition({ x: 0, y: 0 });
    }
  }, [step]);

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen love-background"
      onMouseMove={handleMouseMove}
    >
      {/* Hiệu ứng trái tim khi nhấn "Có" */}
      <HeartAnimation isActive={showHeartAnimation} />
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl md:p-10 love-question-container">
        <div className="text-center">
          <h1 className={`text-3xl font-extrabold ${step === 'loveQuestion' ? 'love-question-title' : 'text-red-500'}`}>
            {step === 'credentials' ? 'Đăng nhập Storefront' : 'Câu hỏi tình yêu'}
          </h1>
          <p className="mt-2 text-gray-600">
            {step === 'credentials' 
              ? 'Nhập thông tin đăng nhập để tiếp tục' 
              : gender === 'male' 
                ? 'Em có yêu anh không?' 
                : 'Anh có yêu em không?'}
          </p>
        </div>

        {error && step === 'credentials' && (
          <div className="p-3 text-sm text-white bg-red-500 rounded-md">
            {error}
          </div>
        )}

        {step === 'credentials' ? (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Tên đăng nhập</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Mật khẩu</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6 flex flex-col items-center">
            {/* Không hiển thị thông báo "Full authentication..." ở màn hình câu hỏi tình yêu */}
            <div className="w-full flex flex-col items-center space-y-6">
              <button
                onClick={handleYesClick}
                className="w-64 py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white yes-button heartbeat-animation"
              >
                Có
              </button>
              
              <button
                ref={noButtonRef}
                style={{
                  position: noButtonPosition.x !== 0 || noButtonPosition.y !== 0 ? 'fixed' : 'relative',
                  left: noButtonPosition.x,
                  top: noButtonPosition.y,
                  zIndex: 100
                }}
                onMouseEnter={moveNoButton}
                className="w-64 py-3 px-4 text-lg font-medium rounded-md no-button"
              >
                Không
              </button>
            </div>
            
            <button
              onClick={() => setStep('credentials')}
              className="text-sm text-red-500 hover:text-red-600 mt-4"
            >
              Quay lại
            </button>
          </div>
        )}
      </div>
      
      {/* Responsive design info */}
      <div className="absolute bottom-4 right-4 text-xs text-pink-800 hidden md:block">
        <p>💖 Designed with love 💖</p>
      </div>
    </div>
  );
};

export default StorefrontLoginForm;