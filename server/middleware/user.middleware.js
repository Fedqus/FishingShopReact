const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    
    try {
       
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(403).json({
                message: 'Користувач не авторизований'
            });
        }
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({
            message: 'Користувач не авторизований'
        });
    }

}