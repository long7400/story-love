export interface Profile {
  name: string;
  birthday: string;
}

export interface Relationship {
  startDate: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
}

export interface Photo {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

export interface LoveStoryData {
  profiles: {
    profile1: Profile;
    profile2: Profile;
  };
  relationship: Relationship;
  events: Event[];
  photos: Photo[];
}
