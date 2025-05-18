// API Configuration for backend connection
const API_CONFIG = {
  // Sử dụng BASE_URL tương đối khi triển khai 
  // Hoặc URL tuyệt đối khi phát triển cục bộ
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  
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