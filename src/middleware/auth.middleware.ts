import jwt from "jsonwebtoken";
const jwtSecret: string = process.env.JWT_SECRET;
class AuthMiddleware {
    async validAccessToken(req) {
        try {
            if (req.headers["authorization"]) {
                const authorization = req.headers["authorization"].split(" ");
                //check if authorization is Bearer
                if (authorization[0] !== "Bearer") {
                    throw new Error("Invalid authorization type")
                } else {
                    let user = jwt.verify(authorization[1], jwtSecret);
                    return user;
                }
            } else {
                throw new Error("No authorization token found")
            }
        } catch (err) {
            throw new Error(err.message)
        }

    }
}
export default new AuthMiddleware();