import { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Kiểm tra token khi component được tải
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
        return;
      }

      try {
        // Lấy thông tin user từ token
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        
        // Kiểm tra xem token còn hợp lệ không bằng cách gửi request đến backend
        await axios.get(`${apiConfig.baseUrl}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } catch (error) {
        // Token không hợp lệ, xóa khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false,
      error: null,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}