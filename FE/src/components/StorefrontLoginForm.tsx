import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

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
  
  const [, setLocation] = useLocation();

  const moveNoButton = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    setNoButtonPosition({ x: newX, y: newY });
  };

  const checkGender = async () => {
    try {
      const response = await axios.post(`${apiConfig.baseUrl}/api/storefront/check-gender`, {
        username,
        password: '' // Không cần mật khẩu cho endpoint này
      });
      
      if (response.data && response.data.message) {
        setGender(response.data.message as 'male' | 'female');
      }
      
      setStep('loveQuestion');
    } catch (err) {
      console.error('Lỗi khi kiểm tra giới tính:', err);
      setError('Không thể xác định người dùng. Vui lòng thử lại.');
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
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleYesClick = () => {
    // Đăng nhập khi người dùng đã trả lời "có"
    handleLogin(new Event('submit') as any);
  };

  // Reset vị trí nút "Không" khi component được tải
  useEffect(() => {
    if (step === 'loveQuestion') {
      setNoButtonPosition({ x: 0, y: 0 });
    }
  }, [step]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-red-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-red-500">
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

        {error && (
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
            <div className="w-full flex flex-col items-center space-y-6">
              <button
                onClick={handleYesClick}
                className="w-64 py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
              >
                Có
              </button>
              
              <button
                style={{
                  position: noButtonPosition.x !== 0 || noButtonPosition.y !== 0 ? 'fixed' : 'relative',
                  left: noButtonPosition.x,
                  top: noButtonPosition.y,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={moveNoButton}
                className="w-64 py-3 px-4 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Không
              </button>
            </div>
            
            <button
              onClick={() => setStep('credentials')}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Quay lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorefrontLoginForm;