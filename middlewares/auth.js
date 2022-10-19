require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        
        const token = req.header("Authorization");
        if(!token){
            return res.status(400).json({message: "Authentification invalide"});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) return res.status(400).json({message: "Authentification invalide"});

            req.user = user;
            next();
        })

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = auth;
