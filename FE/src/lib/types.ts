export interface Profile {
    id: number;
    name: string;
    birthday: string;
    avatarUrl?: string;
    bio?: string;
    favoriteQuote?: string;
    relationship?: Relationship;
}

export interface Relationship {
    id: number;
    startDate: string;
    title?: string;
    description?: string;
    anniversaryMessage?: string;
}

export interface Event {
    id: number;
    title: string;
    date: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    htmlEnabled?: boolean;
    relationship?: 1;
}

export interface Photo {
    id: number;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
    location?: string;
    tags?: string;
    htmlEnabled?: boolean;
    relationship?: Relationship;
}

export interface LocationMarker {
    id: number;
    name: string;
    description: string;
    date: string;
    latitude: number;
    longitude: number;
    isSpecial: boolean;
    imageUrl?: string;
    relationship?: Relationship;
}

export interface Postcard {
    id: number;
    title: string;
    message: string;
    imageUrl?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fromName: string;
    toName: string;
    createdAt: string;
    deliveredAt?: string;
    htmlEnabled?: boolean;
    relationship?: Relationship;
    creator?: User;
}

export interface Countdown {
    id: number;
    title: string;
    targetDate: string;
    description?: string;
    imageUrl?: string;
    backgroundColor?: string;
    fontColor?: string;
    relationship?: Relationship;
}

export interface User {
    id: string;
    username: string;
    email: string;
    roles: string[];
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    gender: string;
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
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
