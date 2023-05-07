import jwt from 'jsonwebtoken';
const jwtSecret: string = process.env.JWT_SECRET;
const tokenExpirationInSeconds = process.env.TOKEN_EXPIRERS

class Auth {
    async validJWT(token) {
        try {
            let user = jwt.verify(token, jwtSecret);
            return user;
        } catch (err) {
            throw new Error(err.message)
        }

    }
    async createJWT(user: Object) {
        try {
            const token = jwt.sign(user, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });
            return token;
        } catch (err) {
            throw new Error(err.message)
        }
    }

}

export default new Auth();
