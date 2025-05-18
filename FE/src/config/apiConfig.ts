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
