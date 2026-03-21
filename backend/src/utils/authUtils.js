import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../configs/serverConfigs.js";

export const createJWT = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    return token;
}