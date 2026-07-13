
import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiting for public API endpoints — 60 requests per minute per IP
const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,  // sends Retry-After and RateLimit-* headers
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use("/api", apiRateLimiter);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let responseData: Record<string, any> | undefined;

  // Capture JSON response
  const originalJson = res.json;
  res.json = function(body, ...args) {
    responseData = body;
    return originalJson.apply(res, [body, ...args]);
  };

  // Log API requests on completion
  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Only log body for successful responses to avoid logging sensitive error details
      if (responseData && res.statusCode >= 200 && res.statusCode < 400) {
        const responseStr = JSON.stringify(responseData);
        logLine += ` :: ${responseStr.length > 80 ? responseStr.slice(0, 79) + "…" : responseStr}`;
      } else if (res.statusCode >= 400) {
        // For errors, just log the status code without the response body
        logLine += ' :: Error response';
      }
      
      log(logLine);
    }
  });

  next();
});

// Start server
(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Log error for debugging
    console.error(`Error ${status}: ${message}`, err.stack);
    
    // Send error response to client (don't expose stack trace)
    res.status(status).json({ message });
    
    // Don't throw the error again as it will crash the app
    // and cause a new instance to spin up in Autoscale deployments
  });

  // Setup Vite or static serving
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start listening
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
