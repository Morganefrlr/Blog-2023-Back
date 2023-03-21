import jwt from 'jsonwebtoken'

export const auth = ( req, res, next) =>{
    try {
        const token = req.cookies.accessToken
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const userId = decodedToken.userId
        req.auth = {
            userId : userId
        };
        next();
    } catch(error){
        res.status(401).json({error})
    }
}
