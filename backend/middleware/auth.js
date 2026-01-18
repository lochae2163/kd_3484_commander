/**
 * Simple password authentication middleware
 * Checks for password in Authorization header or x-password header
 */
export const authMiddleware = (req, res, next) => {
  const password = req.headers.authorization || req.headers['x-password'];

  if (!process.env.SITE_PASSWORD) {
    // If no password is set, allow access
    return next();
  }

  if (!password) {
    return res.status(401).json({ error: 'Password required' });
  }

  if (password !== process.env.SITE_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  next();
};

/**
 * Verify password endpoint handler
 */
export const verifyPassword = (req, res) => {
  const { password } = req.body;

  if (!process.env.SITE_PASSWORD) {
    // If no password is set, any password works
    return res.status(200).json({ success: true });
  }

  if (password === process.env.SITE_PASSWORD) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid password' });
};
