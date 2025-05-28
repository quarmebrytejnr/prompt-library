import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Router } from "express";
import { db } from "./storage";
import { users } from "../shared/schema";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateSessionToken } from "./utils/auth";
import { sessions } from "../shared/schema";
import { InsertUser, insertUserSchema } from "../shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const router = Router();

// Health check endpoint
router.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// User signup endpoint
router.post("/api/auth/signup", async (req, res) => {
  try {
    const validatedData = insertUserSchema.parse(req.body);
    
    // Check if email already exists
    const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1);
    
    if (existingUser.length > 0) {
      return res.status(400).json({ 
        message: "User with this email already exists" 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    // Create user
    const newUser = await db.insert(users).values({
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
    }).returning({ id: users.id, email: users.email, name: users.name });
    
    return res.status(201).json({ 
      message: "User created successfully",
      user: { 
        id: newUser[0].id, 
        email: newUser[0].email,
        name: newUser[0].name
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: fromZodError(error).message 
      });
    }
    
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// User login endpoint
router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Find user by email
    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existingUsers.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const user = existingUsers[0];
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Session expires in 7 days
    
    await db.insert(sessions).values({
      id: sessionToken,
      userId: user.id,
      expiresAt,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
    });
    
    // Set session cookie
    req.session.userId = user.id;
    req.session.sessionToken = sessionToken;
    
    return res.json({ 
      message: "Login successful",
      user: { 
        id: user.id, 
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// User logout endpoint
router.post("/api/auth/logout", async (req, res) => {
  try {
    const sessionToken = req.session.sessionToken;
    
    if (sessionToken) {
      // Delete session from database
      await db.delete(sessions).where(eq(sessions.id, sessionToken));
    }
    
    // Clear session
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get current user endpoint
router.get("/api/auth/me", async (req, res) => {
  try {
    const userId = req.session.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // Get user data
    const userResult = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      avatar: users.avatar,
      emailVerified: users.emailVerified
    }).from(users).where(eq(users.id, userId)).limit(1);
    
    if (userResult.length === 0) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: "User not found" });
    }
    
    return res.json({ user: userResult[0] });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
