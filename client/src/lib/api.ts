import API_CONFIG from '@/config/apiConfig';
import { 
  Event, 
  Photo, 
  Profile, 
  Relationship, 
  LoveStoryData 
} from '@/lib/types';

/**
 * API client for communicating with Spring Boot backend
 */
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  /**
   * Make API request with error handling
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `API request failed with status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API request error: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Get all love story data
   */
  async getLoveStoryData(): Promise<LoveStoryData> {
    return this.request<LoveStoryData>(API_CONFIG.ENDPOINTS.LOVE_STORY_DATA);
  }

  // Profile endpoints
  async getProfiles(): Promise<Profile[]> {
    return this.request<Profile[]>(API_CONFIG.ENDPOINTS.PROFILES);
  }

  async getProfile(id: number): Promise<Profile> {
    return this.request<Profile>(`${API_CONFIG.ENDPOINTS.PROFILES}/${id}`);
  }

  async createProfile(profile: Omit<Profile, 'id'>): Promise<Profile> {
    return this.request<Profile>(API_CONFIG.ENDPOINTS.PROFILES, {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async updateProfile(id: number, profile: Partial<Profile>): Promise<Profile> {
    return this.request<Profile>(`${API_CONFIG.ENDPOINTS.PROFILES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  async deleteProfile(id: number): Promise<void> {
    await this.request<void>(`${API_CONFIG.ENDPOINTS.PROFILES}/${id}`, {
      method: 'DELETE',
    });
  }

  // Relationship endpoints
  async getRelationship(): Promise<Relationship[]> {
    return this.request<Relationship[]>(API_CONFIG.ENDPOINTS.RELATIONSHIPS);
  }

  async createRelationship(relationship: Omit<Relationship, 'id'>): Promise<Relationship> {
    return this.request<Relationship>(API_CONFIG.ENDPOINTS.RELATIONSHIPS, {
      method: 'POST',
      body: JSON.stringify(relationship),
    });
  }

  async updateRelationship(id: number, relationship: Partial<Relationship>): Promise<Relationship> {
    return this.request<Relationship>(`${API_CONFIG.ENDPOINTS.RELATIONSHIPS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(relationship),
    });
  }

  // Event endpoints
  async getEvents(): Promise<Event[]> {
    return this.request<Event[]>(API_CONFIG.ENDPOINTS.EVENTS);
  }

  async getEvent(id: number): Promise<Event> {
    return this.request<Event>(`${API_CONFIG.ENDPOINTS.EVENTS}/${id}`);
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    return this.request<Event>(API_CONFIG.ENDPOINTS.EVENTS, {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateEvent(id: number, event: Partial<Event>): Promise<Event> {
    return this.request<Event>(`${API_CONFIG.ENDPOINTS.EVENTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
    });
  }

  async deleteEvent(id: number): Promise<void> {
    await this.request<void>(`${API_CONFIG.ENDPOINTS.EVENTS}/${id}`, {
      method: 'DELETE',
    });
  }

  // Photo endpoints
  async getPhotos(): Promise<Photo[]> {
    return this.request<Photo[]>(API_CONFIG.ENDPOINTS.PHOTOS);
  }

  async getPhoto(id: number): Promise<Photo> {
    return this.request<Photo>(`${API_CONFIG.ENDPOINTS.PHOTOS}/${id}`);
  }

  async createPhoto(photo: Omit<Photo, 'id'>): Promise<Photo> {
    return this.request<Photo>(API_CONFIG.ENDPOINTS.PHOTOS, {
      method: 'POST',
      body: JSON.stringify(photo),
    });
  }

  async updatePhoto(id: number, photo: Partial<Photo>): Promise<Photo> {
    return this.request<Photo>(`${API_CONFIG.ENDPOINTS.PHOTOS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(photo),
    });
  }

  async deletePhoto(id: number): Promise<void> {
    await this.request<void>(`${API_CONFIG.ENDPOINTS.PHOTOS}/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export API client instance
export const api = new ApiClient();