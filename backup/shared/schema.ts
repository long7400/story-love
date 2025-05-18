import { pgTable, text, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Profiles table
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  birthday: varchar("birthday", { length: 50 }).notNull(),
  profileType: varchar("profile_type", { length: 20 }).notNull(), // "profile1" or "profile2"
});

// Relationship table
export const relationships = pgTable("relationships", {
  id: serial("id").primaryKey(),
  startDate: timestamp("start_date").notNull(),
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  date: timestamp("date").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  imageUrl: text("image_url").notNull(),
});

// Photos table
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

// Insert schemas
export const insertProfileSchema = createInsertSchema(profiles, {
  name: z.string().min(1).max(100),
  birthday: z.string().min(1).max(50),
  profileType: z.enum(["profile1", "profile2"]),
});

export const insertRelationshipSchema = createInsertSchema(relationships);

export const insertEventSchema = createInsertSchema(events, {
  title: z.string().min(1).max(200),
  shortDescription: z.string().min(1),
  fullDescription: z.string().min(1),
  imageUrl: z.string().url(),
});

export const insertPhotoSchema = createInsertSchema(photos, {
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  imageUrl: z.string().url(),
});

// Types
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Relationship = typeof relationships.$inferSelect;
export type InsertRelationship = z.infer<typeof insertRelationshipSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;

// API Response type for love story data
export interface LoveStoryData {
  profiles: {
    profile1: {
      name: string;
      birthday: string;
    };
    profile2: {
      name: string;
      birthday: string;
    };
  };
  relationship: {
    startDate: string;
  };
  events: Array<{
    id: number;
    title: string;
    date: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
  }>;
  photos: Array<{
    id: number;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
  }>;
}
