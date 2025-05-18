import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get love story data
  app.get("/api/love-story-data", async (req, res) => {
    try {
      // Read data from JSON file
      const dataPath = path.join(process.cwd(), "public", "data.json");
      const fileExists = fs.existsSync(dataPath);
      
      if (!fileExists) {
        return res.status(404).json({ 
          message: "Love story data file not found. Make sure data.json exists in the public directory." 
        });
      }
      
      const jsonData = await fs.promises.readFile(dataPath, "utf-8");
      const loveStoryData = JSON.parse(jsonData);
      
      return res.status(200).json(loveStoryData);
    } catch (error) {
      console.error("Error fetching love story data:", error);
      return res.status(500).json({ 
        message: "Failed to load love story data. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
