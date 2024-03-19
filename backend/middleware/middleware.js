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
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: 'Unauthorized: No token provided' });
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Invalid or expired token. Please login and logout again.' });
            }
            // Attach the decoded username to the request object
            req.username = decoded.username;
            next();
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


export { validate, authMiddleware };
