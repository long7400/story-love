#!/bin/bash

echo "===== Sửa lỗi CSS triệt để cho FE ====="

# 1. Di chuyển đến thư mục FE
cd FE || { echo "Không thể truy cập thư mục FE"; exit 1; }

# 2. Đảm bảo cấu hình tailwind đúng
echo "Cập nhật tailwind.config.ts..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(0 80% 60%)",
          foreground: "hsl(0 0% 100%)", 
        },
        background: "hsl(0 0% 98%)",
        foreground: "hsl(220 14.3% 4.1%)",
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(220 14.3% 4.1%)",
        },
        border: "hsl(0 0% 90%)",
        input: "hsl(0 0% 90%)",
        muted: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 45%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 95%)",
          foreground: "hsl(0 0% 30%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 30%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 10s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
EOF

# 3. Đảm bảo postcss.config.js đúng
echo "Cập nhật postcss.config.js..."
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# 4. Đảm bảo .env.local có cấu hình đúng
echo "Cập nhật .env.local..."
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env.local

# 5. Cập nhật API config để kết nối đúng với proxy của chúng ta
echo "Cập nhật apiConfig.ts..."
cat > src/config/apiConfig.ts << 'EOF'
// API Configuration
const API_CONFIG = {
  // Sử dụng BASE_URL từ biến môi trường hoặc mặc định đến proxy
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // API endpoints cơ bản
  ENDPOINTS: {
    // Dữ liệu chung
    LOVE_STORY_DATA: '/love-story-data',
    
    // Quản lý người dùng và xác thực
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      USER: '/auth/user'
    },
    
    // Quản lý dữ liệu cốt lõi
    PROFILES: '/profiles',
    RELATIONSHIPS: '/relationships',
    EVENTS: '/events',
    PHOTOS: '/photos',
    
    // Tính năng bản đồ
    LOCATION_MARKERS: '/location-markers',
    
    // Tính năng bưu thiếp
    POSTCARDS: '/postcards',
    
    // Tính năng đếm ngược
    COUNTDOWNS: '/countdowns',
    
    // Quản lý file
    FILES: {
      UPLOAD: '/files/upload',
      UPLOADS: '/files/uploads',
      DOWNLOAD: '/files/download',
      DELETE: '/files'
    }
  }
};

export default API_CONFIG;
EOF

echo "===== Hoàn thành sửa lỗi CSS cho FE ====="
echo "Hãy khởi động lại ứng dụng để áp dụng các thay đổi"