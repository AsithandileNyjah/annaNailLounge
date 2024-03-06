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

export { validate };