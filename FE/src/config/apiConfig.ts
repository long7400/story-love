// API Configuration
const apiConfig = {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',

    // Endpoints
    ENDPOINTS: {
        LOVE_STORY_DATA: '/api/love-story-data',

        AUTH: {
            LOGIN: '/api/bo/auth/login',
            REGISTER: '/api/bo/auth/register',
            USER: '/api/bo/auth/user'
        },

        PROFILES: '/api/profiles',
        RELATIONSHIPS: '/api/relationships',
        EVENTS: '/api/events',
        PHOTOS: '/api/photos',
        LOCATION_MARKERS: '/api/markers',
        POSTCARDS: '/api/postcards',
        COUNTDOWNS: '/api/countdowns',

        FILES: {
            UPLOAD: '/api/files/upload',
            DOWNLOAD: '/api/files/download'
        }
    }
};

export default apiConfig;
