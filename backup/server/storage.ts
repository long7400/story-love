import { 
  type Profile, 
  type InsertProfile,
  type Relationship,
  type InsertRelationship,
  type Event,
  type InsertEvent,
  type Photo,
  type InsertPhoto,
  type LoveStoryData
} from "@shared/schema";

// Interface for love story storage operations
export interface IStorage {
  // Profile operations
  getProfiles(): Promise<{ profile1: Profile; profile2: Profile }>;
  getProfile(id: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Relationship operations
  getRelationship(): Promise<Relationship | undefined>;
  createRelationship(relationship: InsertRelationship): Promise<Relationship>;
  updateRelationship(id: number, relationship: Partial<InsertRelationship>): Promise<Relationship | undefined>;
  
  // Events operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Photos operations
  getPhotos(): Promise<Photo[]>;
  getPhoto(id: number): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  updatePhoto(id: number, photo: Partial<InsertPhoto>): Promise<Photo | undefined>;
  deletePhoto(id: number): Promise<boolean>;
  
  // Get all love story data
  getLoveStoryData(): Promise<LoveStoryData>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private relationships: Map<number, Relationship>;
  private events: Map<number, Event>;
  private photos: Map<number, Photo>;
  private profileId: number;
  private relationshipId: number;
  private eventId: number;
  private photoId: number;

  constructor() {
    this.profiles = new Map();
    this.relationships = new Map();
    this.events = new Map();
    this.photos = new Map();
    this.profileId = 1;
    this.relationshipId = 1;
    this.eventId = 1;
    this.photoId = 1;
  }

  // Profile methods
  async getProfiles(): Promise<{ profile1: Profile; profile2: Profile }> {
    const allProfiles = Array.from(this.profiles.values());
    const profile1 = allProfiles.find(p => p.profileType === "profile1");
    const profile2 = allProfiles.find(p => p.profileType === "profile2");
    
    if (!profile1 || !profile2) {
      throw new Error("Profiles not found");
    }
    
    return { profile1, profile2 };
  }

  async getProfile(id: number): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const id = this.profileId++;
    const newProfile: Profile = { ...profile, id };
    this.profiles.set(id, newProfile);
    return newProfile;
  }

  async updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined> {
    const existingProfile = this.profiles.get(id);
    if (!existingProfile) return undefined;
    
    const updatedProfile: Profile = { ...existingProfile, ...profile };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  // Relationship methods
  async getRelationship(): Promise<Relationship | undefined> {
    if (this.relationships.size === 0) return undefined;
    return Array.from(this.relationships.values())[0];
  }

  async createRelationship(relationship: InsertRelationship): Promise<Relationship> {
    const id = this.relationshipId++;
    const newRelationship: Relationship = { ...relationship, id };
    this.relationships.set(id, newRelationship);
    return newRelationship;
  }

  async updateRelationship(id: number, relationship: Partial<InsertRelationship>): Promise<Relationship | undefined> {
    const existingRelationship = this.relationships.get(id);
    if (!existingRelationship) return undefined;
    
    const updatedRelationship: Relationship = { ...existingRelationship, ...relationship };
    this.relationships.set(id, updatedRelationship);
    return updatedRelationship;
  }

  // Events methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    const newEvent: Event = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;
    
    const updatedEvent: Event = { ...existingEvent, ...event };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  // Photos methods
  async getPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async createPhoto(photo: InsertPhoto): Promise<Photo> {
    const id = this.photoId++;
    const newPhoto: Photo = { ...photo, id };
    this.photos.set(id, newPhoto);
    return newPhoto;
  }

  async updatePhoto(id: number, photo: Partial<InsertPhoto>): Promise<Photo | undefined> {
    const existingPhoto = this.photos.get(id);
    if (!existingPhoto) return undefined;
    
    const updatedPhoto: Photo = { ...existingPhoto, ...photo };
    this.photos.set(id, updatedPhoto);
    return updatedPhoto;
  }

  async deletePhoto(id: number): Promise<boolean> {
    return this.photos.delete(id);
  }

  // Get all love story data
  async getLoveStoryData(): Promise<LoveStoryData> {
    try {
      const { profile1, profile2 } = await this.getProfiles();
      const relationship = await this.getRelationship();
      const events = await this.getEvents();
      const photos = await this.getPhotos();
      
      if (!relationship) {
        throw new Error("Relationship data not found");
      }
      
      return {
        profiles: {
          profile1: {
            name: profile1.name,
            birthday: profile1.birthday
          },
          profile2: {
            name: profile2.name,
            birthday: profile2.birthday
          }
        },
        relationship: {
          startDate: relationship.startDate.toISOString()
        },
        events: events.map(event => ({
          id: event.id,
          title: event.title,
          date: event.date.toISOString(),
          shortDescription: event.shortDescription,
          fullDescription: event.fullDescription,
          imageUrl: event.imageUrl
        })),
        photos: photos.map(photo => ({
          id: photo.id,
          title: photo.title,
          date: photo.date.toISOString(),
          description: photo.description,
          imageUrl: photo.imageUrl
        }))
      };
    } catch (error) {
      console.error("Error getting love story data:", error);
      throw error;
    }
  }
}

export const storage = new MemStorage();
