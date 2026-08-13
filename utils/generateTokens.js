import jwt from 'jsonwebtoken'

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

export {generateAccessToken, generateRefreshToken}