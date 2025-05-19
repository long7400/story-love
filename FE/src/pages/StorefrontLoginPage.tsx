import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import StorefrontLoginForm from '../components/StorefrontLoginForm';

const StorefrontLoginPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng ngay lập tức về trang chủ
  useEffect(() => {
    if (localStorage.getItem('love_story_sf_auth') === 'true') {
      setLocation('/');
    }
  }, [setLocation]);

  const handleLoginSuccess = (token: string) => {
    setLoginSuccess(true);
    setTimeout(() => {
      setLocation('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100">
      {loginSuccess ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Đăng nhập thành công!</h2>
            <p className="text-gray-600">Đang chuyển hướng đến trang chủ...</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      ) : (
        <StorefrontLoginForm onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default StorefrontLoginPage;