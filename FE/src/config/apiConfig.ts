// API Configuration
const API_CONFIG = {
  // Sử dụng BASE_URL từ biến môi trường hoặc mặc định đến backend Spring Boot
  BASE_URL: '',
  
  // API endpoints cơ bản
  ENDPOINTS: {
    // Dữ liệu chung
    LOVE_STORY_DATA: '/api/love-story-data',
    
    // Quản lý người dùng và xác thực
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      USER: '/api/auth/user'
    },
    
    // Quản lý dữ liệu cốt lõi
    PROFILES: '/api/profiles',
    RELATIONSHIPS: '/api/relationships',
    EVENTS: '/api/events',
    PHOTOS: '/api/photos',
    
    // Tính năng bản đồ
    LOCATION_MARKERS: '/api/location-markers',
    
    // Tính năng bưu thiếp
    POSTCARDS: '/api/postcards',
    
    // Tính năng đếm ngược
    COUNTDOWNS: '/api/countdowns',
    
    // Quản lý file
    FILES: {
      UPLOAD: '/api/files/upload',
      UPLOADS: '/api/files/uploads',
      DOWNLOAD: '/api/files/download',
      DELETE: '/api/files'
    }
  }
};

export default API_CONFIG;
