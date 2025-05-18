// API Configuration for Spring Boot backend connection
const API_CONFIG = {
  // Sử dụng BASE_URL từ biến môi trường hoặc mặc định đến Spring Boot backend
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  
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