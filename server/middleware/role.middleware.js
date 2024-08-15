const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Користувач не авторизований'
                });
            }
            const { roles: userRoles } = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({
                    message: 'У вас немає прав для виконання цієї дії'
                });
            }
            next();
        } catch (error) {
            console.log(error.message);
            return res.status(401).json({
                message: 'Користувач не авторизований'
            });
        }

    }
};