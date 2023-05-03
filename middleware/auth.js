
const jwt = require('jsonwebtoken');
const config = require('config');

async function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Acces denied. NO token provided');

    try{
        const jsonPayload = jwt.verify(token,config.get('JWT_PRIVATE_KEY'));
        req.user = jsonPayload;
        next();
    }
    catch(error){
        return res.status(400).send('Invalid token');
    }
}

module.exports = auth;