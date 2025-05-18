#!/bin/bash

echo "===== Sửa lỗi tải dữ liệu API ====="

# 1. Đảm bảo public/data.json tồn tại
echo "Kiểm tra và cập nhật file data.json..."
cat > public/data.json << 'EOF'
{
  "profiles": {
    "profile1": {
      "id": 1,
      "name": "Minh",
      "birthday": "1995-05-10",
      "bio": "Yêu thích âm nhạc, nghệ thuật và khám phá những địa điểm mới.",
      "favoriteColor": "#FF5757",
      "imageUrl": "/images/profile1.jpg"
    },
    "profile2": {
      "id": 2,
      "name": "Linh",
      "birthday": "1996-08-15",
      "bio": "Đam mê đọc sách, nấu ăn và đi du lịch cùng người yêu.",
      "favoriteColor": "#5D9CEC",
      "imageUrl": "/images/profile2.jpg"
    }
  },
  "relationship": {
    "id": 1,
    "startDate": "2020-11-09",
    "title": "Mối tình đẹp",
    "description": "Một hành trình tình yêu tràn đầy kỷ niệm đẹp, niềm vui và sự tôn trọng lẫn nhau.",
    "song": "Em Của Ngày Hôm Qua - Sơn Tùng MTP",
    "songUrl": "/sounds/love-song.mp3",
    "coupleImageUrl": "/images/couple.jpg"
  },
  "events": [
    {
      "id": 1,
      "title": "Ngày đầu tiên gặp nhau",
      "date": "2020-11-02",
      "shortDescription": "Chúng mình gặp nhau lần đầu tại quán cà phê ở phố cổ.",
      "fullDescription": "Hôm đó là một ngày thu đẹp trời, tình cờ chúng mình gặp nhau tại quán cà phê yên tĩnh ở phố cổ. Cuộc trò chuyện đầu tiên đã kéo dài hơn 3 tiếng đồng hồ mà không ai muốn kết thúc. Từ âm nhạc, sách, đến những ước mơ trong tương lai - chúng mình đã chia sẻ mọi thứ như đã quen nhau từ rất lâu.",
      "imageUrl": "/images/first-meet.jpg"
    },
    {
      "id": 2,
      "title": "Bắt đầu hẹn hò",
      "date": "2020-11-09",
      "shortDescription": "Chính thức trở thành một cặp sau buổi hẹn dưới trời sao.",
      "fullDescription": "Sau một tuần nói chuyện liên tục qua điện thoại, chúng mình quyết định gặp nhau lần nữa tại công viên. Dưới bầu trời đầy sao, chúng mình đã chia sẻ những cảm xúc chân thành và quyết định bắt đầu một hành trình mới cùng nhau. Đó là khoảnh khắc mà cả hai đều biết rằng điều gì đó rất đặc biệt đang bắt đầu.",
      "imageUrl": "/images/start-dating.jpg"
    },
    {
      "id": 3,
      "title": "Kỷ niệm 100 ngày yêu",
      "date": "2021-02-17",
      "shortDescription": "Cùng nhau đón kỷ niệm 100 ngày yêu tại Đà Lạt.",
      "fullDescription": "Để kỷ niệm 100 ngày bên nhau, chúng mình đã quyết định đi Đà Lạt - nơi mà cả hai đều mơ ước được đến cùng nhau. Những ngày tại thành phố mộng mơ đã để lại nhiều kỷ niệm khó quên: cùng nhau đạp xe quanh hồ Xuân Hương, thưởng thức cà phê trong sáng sớm se lạnh và nắm tay nhau dạo bước dưới những hàng thông. Đây là chuyến đi đầu tiên của chúng mình và cũng là lúc chúng mình biết rằng chúng mình có thể cùng nhau đi đến bất cứ đâu.",
      "imageUrl": "/images/100-days.jpg"
    }
  ],
  "photos": [
    {
      "id": 1,
      "title": "Lần đầu đi xem phim cùng nhau",
      "date": "2020-11-20",
      "description": "Buổi tối đi xem 'Tenet' tại rạp sau ngày làm việc mệt mỏi.",
      "imageUrl": "/images/movie-date.jpg"
    },
    {
      "id": 2,
      "title": "Picnic cuối tuần",
      "date": "2021-03-27",
      "description": "Buổi picnic đầu tiên tại công viên thành phố vào một ngày xuân đẹp trời.",
      "imageUrl": "/images/picnic.jpg"
    },
    {
      "id": 3,
      "title": "Sinh nhật của Linh",
      "date": "2021-08-15",
      "description": "Bữa tiệc sinh nhật bất ngờ cho Linh tại nhà với bạn bè thân thiết.",
      "imageUrl": "/images/birthday-linh.jpg"
    }
  ]
}
EOF

# 2. Cập nhật server/routes.ts để đảm bảo API hoạt động
echo "Cập nhật server/routes.ts..."
cat > server/routes.ts << 'EOF'
import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import http from "http";

// Chuyển tiếp yêu cầu đến Spring Boot backend
function proxyRequest(req: any, res: any, endpoint: string) {
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: endpoint,
    method: req.method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.statusCode = proxyRes.statusCode || 200;
    
    // Đảm bảo header CORS cho phép tất cả
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Sao chép headers từ phản hồi Spring Boot
    Object.keys(proxyRes.headers).forEach(key => {
      res.setHeader(key, proxyRes.headers[key] || '');
    });
    
    let data = '';
    proxyRes.on('data', (chunk) => {
      data += chunk;
    });
    
    proxyRes.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (e) {
        res.end(data);
      }
    });
  });
  
  proxyReq.on('error', (error) => {
    console.error('Proxy error:', error);
    // Nếu không kết nối được đến Spring Boot, sử dụng dữ liệu mặc định từ file
    try {
      // Đọc từ file local
      const dataPath = path.join(process.cwd(), "public", "data.json");
      if (fs.existsSync(dataPath)) {
        const jsonData = fs.readFileSync(dataPath, "utf-8");
        const loveStoryData = JSON.parse(jsonData);
        res.status(200).json(loveStoryData);
      } else {
        res.status(500).json({ 
          message: "Failed to connect to Spring Boot backend and no local data found." 
        });
      }
    } catch (err) {
      res.status(500).json({ 
        message: "Failed to load fallback data. Please try again later." 
      });
    }
  });
  
  if (req.body) {
    proxyReq.write(JSON.stringify(req.body));
  }
  
  proxyReq.end();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get love story data - đọc từ file local hoặc chuyển tiếp đến Spring Boot
  app.get("/api/love-story-data", async (req, res) => {
    try {
      // Thử đọc từ file local trước
      const dataPath = path.join(process.cwd(), "public", "data.json");
      const fileExists = fs.existsSync(dataPath);
      
      if (fileExists) {
        const jsonData = await fs.promises.readFile(dataPath, "utf-8");
        const loveStoryData = JSON.parse(jsonData);
        return res.status(200).json(loveStoryData);
      }
      
      // Nếu không có file local, chuyển tiếp đến Spring Boot
      proxyRequest(req, res, '/love-story-data');
    } catch (error) {
      console.error("Error fetching love story data:", error);
      // Thử chuyển tiếp đến Spring Boot nếu xử lý local bị lỗi
      proxyRequest(req, res, '/love-story-data');
    }
  });

  // Chuyển tiếp tất cả yêu cầu API khác đến Spring Boot
  app.all("/api/*", (req, res) => {
    const endpoint = req.originalUrl.replace('/api', '');
    proxyRequest(req, res, endpoint);
  });

  const httpServer = createServer(app);
  return httpServer;
}
EOF

# 3. Đảm bảo FE tìm data đúng
echo "Cập nhật apiConfig trong FE..."
cat > FE/src/config/apiConfig.ts << 'EOF'
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

echo "===== Hoàn thành sửa lỗi tải dữ liệu API ====="
echo "Khởi động lại ứng dụng để áp dụng các thay đổi"