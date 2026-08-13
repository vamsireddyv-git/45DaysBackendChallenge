import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res , next) => {
        const accessToken = req.headers.authorization;

        if(!accessToken){
            return res.status(401).json({
                success : false,
                code : "ACCESS_TOKEN_MISSING",
                message : "Access token missing"
            })
        }
    try{
        const token = accessToken.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({
                code : "ACCESS_TOKEN_EXPIRED",
                message : "access token expired"
            })
        }
        return res.status(401).json({
            code : "INVALID_ACCESS_TOKEN",
            message  : "Invalid Access Token"
        })
    }
}