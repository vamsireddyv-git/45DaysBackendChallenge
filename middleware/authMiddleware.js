import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res , next) => {
        const accessToken = req.headers.authorization;

        if(!accessToken){
            return res.status(401).json({
                success : false,
                message : "Access token missing"
            })
        }
    try{
        const token = accessToken.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message : " Invalid or expired token"
        })
    }
}