import API_CONFIG from '../config/apiConfig';
import { 
  Event, 
  Photo, 
  Profile, 
  Relationship, 
  LoveStoryData,
  LocationMarker,
  Postcard,
  Countdown,
  AuthResponse,
  UserCredentials
} from '@/lib/types';

/**
 * API client for communicating with Spring Boot backend
 */
class ApiClient {
  private token: string | null = null;

  constructor() {
    // Kiểm tra nếu đã có token trong local storage
    this.token = localStorage.getItem('auth_token');
  }

  /**
   * Thêm token xác thực vào header nếu có
   */
  private getHeaders(contentType = true): HeadersInit {
    const headers: HeadersInit = {};
    
    if (contentType) {
      headers['Content-Type'] = 'application/json';
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  /**
   * Lưu token khi đăng nhập thành công
   */
  setAuthToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Xóa token khi đăng xuất
   */
  clearAuthToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  /**
   * Make API request with error handling
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Sử dụng đường dẫn tương đối thay vì base URL
    const url = endpoint;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        credentials: 'include',
      });

      // Xử lý trường hợp 401 Unauthorized - token hết hạn
      if (response.status === 401) {
        this.clearAuthToken();
        // Chuyển hướng người dùng đến trang đăng nhập
        window.location.href = '/login';
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }

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
   * Upload file
   */
  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const url = API_CONFIG.ENDPOINTS.FILES.UPLOAD;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `File upload failed with status ${response.status}`
        );
      }

      const data = await response.json();
      // Trả về URL của file đã tải lên
      return data.fileDownloadUri;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const url = API_CONFIG.ENDPOINTS.FILES.UPLOADS;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Files upload failed with status ${response.status}`
        );
      }

      const data = await response.json();
      // Trả về danh sách URL của các file đã tải lên
      return data.map((item: any) => item.fileDownloadUri);
    } catch (error) {
      console.error('Files upload error:', error);
      throw error;
    }
  }

  /**
   * Authentication endpoints
   */
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response && response.token) {
      this.setAuthToken(response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    this.clearAuthToken();
  }

  async getCurrentUser(): Promise<any> {
    return this.request<any>(API_CONFIG.ENDPOINTS.AUTH.USER);
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
  async getActiveRelationship(): Promise<Relationship> {
    return this.request<Relationship>(`${API_CONFIG.ENDPOINTS.RELATIONSHIPS}/active`);
  }

  async getRelationships(): Promise<Relationship[]> {
    return this.request<Relationship[]>(API_CONFIG.ENDPOINTS.RELATIONSHIPS);
  }

  async getRelationship(id: number): Promise<Relationship> {
    return this.request<Relationship>(`${API_CONFIG.ENDPOINTS.RELATIONSHIPS}/${id}`);
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

  async deleteRelationship(id: number): Promise<void> {
    await this.request<void>(`${API_CONFIG.ENDPOINTS.RELATIONSHIPS}/${id}`, {
      method: 'DELETE',
    });
  }

  // Event endpoints
  async getEvents(): Promise<Event[]> {
    return this.request<Event[]>(API_CONFIG.ENDPOINTS.EVENTS);
  }

  async getEventsByRelationship(relationshipId: number): Promise<Event[]> {
    return this.request<Event[]>(`${API_CONFIG.ENDPOINTS.EVENTS}/relationship/${relationshipId}`);
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

  async getPhotosByRelationship(relationshipId: number): Promise<Photo[]> {
    return this.request<Photo[]>(`${API_CONFIG.ENDPOINTS.PHOTOS}/relationship/${relationshipId}`);
  }

  async searchPhotos(term: string): Promise<Photo[]> {
    return this.request<Photo[]>(`${API_CONFIG.ENDPOINTS.PHOTOS}/search?term=${encodeURIComponent(term)}`);
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

  // Location markers endpoints
  async getLocationMarkers(): Promise<LocationMarker[]> {
    return this.request<LocationMarker[]>(API_CONFIG.ENDPOINTS.LOCATION_MARKERS);
  }

  async getLocationMarkersByRelationship(relationshipId: number): Promise<LocationMarker[]> {
    return this.request<LocationMarker[]>(`${API_CONFIG.ENDPOINTS.LOCATION_MARKERS}/relationship/${relationshipId}`);
  }

  async getSpecialLocationMarkers(relationshipId: number): Promise<LocationMarker[]> {
    return this.request<LocationMarker[]>(`${API_CONFIG.ENDPOINTS.LOCATION_MARKERS}/special/${relationshipId}`);
  }

  async getLocationMarker(id: number): Promise<LocationMarker> {
    return this.request<LocationMarker>(`${API_CONFIG.ENDPOINTS.LOCATION_MARKERS}/${id}`);
  }

  async createLocationMarker(marker: Omit<LocationMarker, 'id'>): Promise<LocationMarker> {
    return this.request<LocationMarker>(API_CONFIG.ENDPOINTS.LOCATION_MARKERS, {
      method: 'POST',
      body: JSON.stringify(marker),
    });
  }

  async updateLocationMarker(id: number, marker: Partial<LocationMarker>): Promise<LocationMarker> {
    return this.request<LocationMarker>(`${API_CONFIG.ENDPOINTS.LOCATION_MARKERS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(marker),
    });
  }

  async deleteLocationMarker(id: number): Promise<void> {
    await this.request<void>(`${API_CONFIG.ENDPOINTS.LOCATION_MARKERS}/${id}`, {
      method: 'DELETE',
    });
  }

  // Postcard endpoints
  async getPostcards(): Promise<Postcard[]> {
    return this.request<Postcard[]>(API_CONFIG.ENDPOINTS.POSTCARDS);
  }

  async getPostcard(id: number): Promise<Postcard> {
    return this.request<Postcard>(`${API_CONFIG.ENDPOINTS.POSTCARDS}/${id}`);
  }

  async createPostcard(postcard: Omit<Postcard, 'id'>): Promise<Postcard> {
    return this.request<Postcard>(API_CONFIG.ENDPOINTS.POSTCARDS, {
      method: 'POST',
      body: JSON.stringify(postcard),
    });
  }

  async updatePostcard(id: number, postcard: Partial<Postcard>): Promise<Postcard> {
    return this.request<Postcard>(`${API_CONFIG.ENDPOINTS.POSTCARDS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postcard),
    });
  }

  async markPostcardAsDelivered(id: number): Promise<Postcard> {
    return this.request<Postcard>(`${API_CONFIG.ENDPOINTS.POSTCARDS}/${id}/deliver`, {
      method: 'PUT',
    });
  }

  async deletePostcard(id: number): Promise<void> {
    await this.request<void>(`${API_CONFIG.ENDPOINTS.POSTCARDS}/${id}`, {
      method: 'DELETE',
    });
  }

  // Countdown endpoints
  async getCountdowns(): Promise<Countdown[]> {
    return this.request<Countdown[]>(API_CONFIG.ENDPOINTS.COUNTDOWNS);
  }

  async getFutureCountdowns(): Promise<Countdown[]> {
    return this.request<Countdown[]>(`${API_CONFIG.ENDPOINTS.COUNTDOWNS}/future`);
  }

  async getCountdown(id: number): Promise<Countdown> {
    return this.request<Countdown>(`${API_CONFIG.ENDPOINTS.COUNTDOWNS}/${id}`);
  }

  async createCountdown(countdown: Omit<Countdown, 'id'>): Promise<Countdown> {
    return this.request<Countdown>(API_CONFIG.ENDPOINTS.COUNTDOWNS, {
      method: 'POST',
      body: JSON.stringify(countdown),
    });
  }

  async updateCountdown(id: number, countdown: Partial<Countdown>): Promise<Countdown> {
    return this.request<Countdown>(`${API_CONFIG.ENDPOINTS.COUNTDOWNS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(countdown),
    });
  }

  async deleteCountdown(id: number): Promise<void> {
    await this.request<void>(`${API_CONFIG.ENDPOINTS.COUNTDOWNS}/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export API client instance
export const api = new ApiClient();