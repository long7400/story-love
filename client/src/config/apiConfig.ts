// API Configuration for backend connection
const API_CONFIG = {
  // Spring Boot API base URL (default for development)
  BASE_URL: 'http://localhost:8080/api',
  
  // API endpoints
  ENDPOINTS: {
    LOVE_STORY_DATA: '/love-story-data',
    PROFILES: '/profiles',
    RELATIONSHIPS: '/relationships',
    EVENTS: '/events',
    PHOTOS: '/photos'
  }
};

export default API_CONFIG;