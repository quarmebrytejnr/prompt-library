import crypto from 'crypto';

/**
 * Generate a random session token
 * @returns A random session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Check if a user is authenticated
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export function isAuthenticated(req: any, res: any, next: any) {
  if (req.session && req.session.userId) {
    return next();
  }
  
  return res.status(401).json({ message: 'Authentication required' });
}

/**
 * Check if a user has admin role
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export function isAdmin(req: any, res: any, next: any) {
  if (req.session && req.session.userId && req.user && req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ message: 'Admin access required' });
}

/**
 * Add user to request if authenticated
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export async function addUserToRequest(req: any, res: any, next: any) {
  try {
    if (req.session && req.session.userId) {
      // You would normally fetch user from database here
      // const user = await db.select().from(users).where(eq(users.id, req.session.userId)).limit(1);
      // if (user.length > 0) {
      //   req.user = user[0];
      // }
    }
    
    next();
  } catch (error) {
    console.error('Error adding user to request:', error);
    next();
  }
} 