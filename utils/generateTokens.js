import jwt from 'jsonwebtoken'
import crypto from "crypto"

const generateAccessToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn : "10s"}
    )
}

const generateRefreshToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_REFRESH,
        {expiresIn : "7d"}
    )
}
const generateCsrfToken = () => {
    return crypto.randomBytes(32).toString("hex");
}
const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

export {generateAccessToken, generateRefreshToken , hashToken , generateCsrfToken}