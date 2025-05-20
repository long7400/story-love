import API_CONFIG from '../config/apiConfig';
import {
    AuthResponse,
    Countdown,
    Event,
    LocationMarker,
    LoveStoryData,
    Photo,
    Postcard,
    Profile,
    Relationship,
    UserCredentials,
} from '../lib/types';

/**
 * API client for communicating with the Spring Boot backend.
 * Automatically adds Authorization header and handles token-related errors.
 */
class ApiClient {
    private token: string | null = null;

    constructor() {
        this.token = localStorage.getItem('love_story_auth_token') || sessionStorage.getItem('love_story_auth_token');
    }

    /**
     * Create headers: automatically add Authorization if token exists.
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
     * Save token when user successfully logs in.
     */
    setAuthToken(token: string): void {
        this.token = token;
        sessionStorage.setItem('love_story_auth_token', token);
    }


    /**
     * Clear token when user logs out.
     */
    clearAuthToken(): void {
        this.token = null;
        localStorage.removeItem('love_story_auth_token');
        sessionStorage.removeItem('love_story_auth_token');
    }

    /**
     * Main function to handle all requests to the backend.
     */
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const method = options.method?.toUpperCase();

        const isAuthRequired = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '');
        const headers = isAuthRequired
            ? {...this.getHeaders(), ...options.headers}
            : {...options.headers};

        try {
            const response = await fetch(endpoint, {
                ...options,
                headers,
                credentials: 'include',
            });

            if (response.status === 401) {
                // this.clearAuthToken();
                window.location.href = '/admin';
                throw new Error('Your session has expired. Please log in again.');
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message || `API request failed with status ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error(`API Request Error [${method || 'GET'}] ${endpoint}:`, error);
            throw error;
        }
    }

    /** -----------------------------------
     * API authentication endpoints
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

    /** -----------------------------------
     * API profile endpoints
     */
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

    /** -----------------------------------
     * API relationship endpoints
     */
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

    /** -----------------------------------
     * API countdown endpoints
     */
    async getCountdowns(): Promise<Countdown[]> {
        return this.request<Countdown[]>(API_CONFIG.ENDPOINTS.COUNTDOWNS);
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

    /** ------------------------------------------------------------------
     * APIs related to events (timeline management)
     */

    /** Get all events and story data */
    async getLoveStoryData(): Promise<LoveStoryData> {
        return this.request<LoveStoryData>(API_CONFIG.ENDPOINTS.LOVE_STORY_DATA);
    }

    /** Create a new event */
    async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
        return this.request<Event>(API_CONFIG.ENDPOINTS.EVENTS, {
            method: 'POST',
            body: JSON.stringify(event),
        });
    }

    /** Update an event */
    async updateEvent(id: number, event: Partial<Event>): Promise<Event> {
        return this.request<Event>(`${API_CONFIG.ENDPOINTS.EVENTS}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(event),
        });
    }

    /** Delete an event */
    async deleteEvent(id: number): Promise<void> {
        await this.request<void>(`${API_CONFIG.ENDPOINTS.EVENTS}/${id}`, {
            method: 'DELETE',
        });
    }

    /** Delete a photo */
    async deletePhoto(id: number): Promise<void> {
        await this.request<void>(`${API_CONFIG.ENDPOINTS.PHOTOS}/${id}`, {
            method: 'DELETE',
        });
    }

}

// Export an instance of the API Client
export const api = new ApiClient();
