import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - No token' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'testsecret');

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden - Invalid token' });
  }
};

export default auth;
