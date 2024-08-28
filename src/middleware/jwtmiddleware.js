
import { verifyToken } from "../utils/genarateToken.js";



export default async function jwtTokenVerification(req, res, next) {
    let token = '';
   
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
 

    if (!token) {
        return res.status(401).json({ status: false, message: 'Token not found' });
    }

    try {
        const payload = await verifyToken(token);
 
        req.user_id=payload.id,
        next();
    } catch (err) {
        return res.status(401).json({ status: false, message: 'UnAuthorized User' });
    }
}
