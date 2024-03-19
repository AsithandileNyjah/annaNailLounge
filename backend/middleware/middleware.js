import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.username = decoded.username; 
        } catch (error) {
            return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
        }
    }

    next();
};


export { authMiddleware };
