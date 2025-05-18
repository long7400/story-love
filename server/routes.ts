import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import http from "http";

// Chuyển tiếp yêu cầu đến Spring Boot backend
function proxyRequest(req: any, res: any, endpoint: string) {
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: endpoint,
    method: req.method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.statusCode = proxyRes.statusCode || 200;
    
    // Đảm bảo header CORS cho phép tất cả
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Sao chép headers từ phản hồi Spring Boot
    Object.keys(proxyRes.headers).forEach(key => {
      res.setHeader(key, proxyRes.headers[key] || '');
    });
    
    let data = '';
    proxyRes.on('data', (chunk) => {
      data += chunk;
    });
    
    proxyRes.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (e) {
        res.end(data);
      }
    });
  });
  
  proxyReq.on('error', (error) => {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      message: "Failed to connect to Spring Boot backend. Please make sure it's running." 
    });
  });
  
  if (req.body) {
    proxyReq.write(JSON.stringify(req.body));
  }
  
  proxyReq.end();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get love story data - đọc từ file local hoặc chuyển tiếp đến Spring Boot
  app.get("/api/love-story-data", async (req, res) => {
    try {
      // Thử đọc từ file local trước
      const dataPath = path.join(process.cwd(), "FE/public", "data.json");
      const fileExists = fs.existsSync(dataPath);
      
      if (fileExists) {
        const jsonData = await fs.promises.readFile(dataPath, "utf-8");
        const loveStoryData = JSON.parse(jsonData);
        return res.status(200).json(loveStoryData);
      }
      
      // Nếu không có file local, chuyển tiếp đến Spring Boot
      proxyRequest(req, res, '/love-story-data');
    } catch (error) {
      console.error("Error fetching love story data:", error);
      // Thử chuyển tiếp đến Spring Boot nếu xử lý local bị lỗi
      proxyRequest(req, res, '/love-story-data');
    }
  });

  // Chuyển tiếp tất cả yêu cầu API khác đến Spring Boot
  app.all("/api/*", (req, res) => {
    const endpoint = req.originalUrl.replace('/api', '');
    proxyRequest(req, res, endpoint);
  });

  const httpServer = createServer(app);
  return httpServer;
}
