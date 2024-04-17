import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    const  token  = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded :', decoded);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}