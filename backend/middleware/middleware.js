import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const validate = (req, res, next) => {
    let { cookie } = req.headers;
    let tokenInHeader = cookie && cookie.split('=')[1];
    if (!tokenInHeader) {
        return res.sendStatus(401);
    }
    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
    }
};

export { validate, authMiddleware };