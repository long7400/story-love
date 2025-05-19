import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lock, User, Heart } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useLocation } from "wouter";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginPageProps {
  onLogin: (isAuthenticated: boolean) => void;
}

export default function StorefrontLoginPage({ onLogin }: LoginPageProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoveQuestion, setShowLoveQuestion] = useState(false);
  const [userGender, setUserGender] = useState<"male" | "female" | null>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const controlsNo = useAnimation();
  const [, setLocation] = useLocation();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  // Kiểm tra nếu người dùng đã kích hoạt tài khoản trước đó
  useEffect(() => {
    const isActivated = localStorage.getItem("love_story_activated");
    if (isActivated === "true") {
      setShowLoveQuestion(false);
    }
  }, []);

  // Xử lý khi di chuột vào nút "Không"
  const handleNoButtonHover = () => {
    if (noButtonRef.current) {
      // Tạo vị trí ngẫu nhiên trên màn hình
      const randomX = Math.random() * (window.innerWidth - 100);
      const randomY = Math.random() * (window.innerHeight - 50);
      
      controlsNo.start({
        x: randomX,
        y: randomY,
        transition: { type: "spring", duration: 0.5 }
      });
    }
  };

  // Xử lý khi click nút "Có"
  const handleYesClick = () => {
    localStorage.setItem("love_story_activated", "true");
    setShowLoveQuestion(false);
    onLogin(true);
    setLocation("/");
  };
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");
    
    try {
      // Gọi API đăng nhập từ Spring Boot backend
      const response = await fetch(`/api/auth/login/storefront`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        }),
        credentials: 'same-origin'
      });
      
      if (response.ok) {
        const authData = await response.json();
        
        // Lưu token vào localStorage
        if (authData.token) {
          localStorage.setItem("love_story_auth_token", authData.token);
        }
        
        // Lưu thông tin đăng nhập
        localStorage.setItem("love_story_sf_auth", "true");
        
        // Xác định giới tính người dùng từ response data
        if (authData.gender === "female") {
          setUserGender("female");
        } else {
          setUserGender("male");
        }
        
        // Kiểm tra xem tài khoản đã được kích hoạt chưa
        const isActivated = localStorage.getItem("love_story_activated");
        if (isActivated === "true") {
          onLogin(true);
          setLocation("/");
        } else {
          // Hiển thị câu hỏi tình yêu
          setShowLoveQuestion(true);
        }
      } else {
        // Nếu phản hồi không thành công, hiển thị thông báo lỗi
        const errorData = await response.json();
        setError(errorData.message || "Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 p-4">
      {!showLoveQuestion ? (
        <motion.div 
          className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-pink-100/50 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Chào mừng đến với Love Story</h2>
            <p className="text-gray-600 mt-1">Đăng nhập để xem câu chuyện tình yêu của chúng ta</p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.username ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white/80`}
                    {...register("username", { required: "Vui lòng nhập tên đăng nhập" })}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white/80`}
                    {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-pink-400 hover:from-primary/90 hover:to-pink-400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Đăng nhập"}
                </motion.button>
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Đây là không gian riêng tư của chúng ta.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-pink-100/50 p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              {userGender === "female" ? "EM CÓ YÊU ANH KHÔNG?" : "ANH CÓ YÊU EM KHÔNG?"}
            </h2>
          </motion.div>
          
          <div className="flex justify-center space-x-8 mt-10">
            <motion.button
              className="px-8 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
            >
              Có
            </motion.button>
            
            <motion.button
              ref={noButtonRef}
              className="px-8 py-3 bg-gray-500 text-white rounded-full font-bold shadow-lg absolute"
              animate={controlsNo}
              onMouseEnter={handleNoButtonHover}
              onClick={handleNoButtonHover}
              whileHover={{ scale: 0.9 }}
            >
              Không
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}