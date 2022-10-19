require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1d'});
};

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
};

const refreshToken = (req, res) => {
    const rf_token = req.cookies.refreshtoken;

    res.json({rf_token});
}

const register = async (req, res, next) => {
    try {
        
        const { name, email, password } = req.body;
        const user = await Users.findOne({email});

        if(user){
            return res.status(400).json({message: "L'email existe déja !"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Le mot de passe doit contenir au moins 6 catactéres !"});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new Users({
            name, email, password: passwordHash
        });

        await newUser.save();

        //jwt
        const accesstoken = createAccessToken({id: newUser._id});
        const refreshtoken = createRefreshToken({id: newUser._id});

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });

        res.json({accesstoken});
        // res.json({message: " Utilisateur créé avec succés !"});

    } catch (err) {
        return res.status(500).json({
            msg: err.message
        });
    }
};

const login = async (req, res, next) => {
    
    try {
        
        const {email, password} = req.body;

        const user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({message: "L'utilisateur n'existe pas"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "L'email ou le mot de passe incorrect."});
        }

        // res.json({message: "Connexion avec succes !"});
        //jwt
        const accesstoken = createAccessToken({id: user._id});
        const refreshtoken = createRefreshToken({id: user._id});

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });

        res.json({accesstoken});

    } catch (err) {
        return res.status(500).json({
            msg: err.message
        });
    }

};

const logout = async (req, res, next) => {

    try {

        res.clearCookie('refreshtoken', {path: '/user/refresh_token'});
        return res.json({message: "Logged out"});
        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

};

const getUser = async (req, res, next) => {
    try {
        
        const user = await Users.findById(req.user.id).select('-password');
        if(!user) return res.status(400).json({message: " L'utilisateur n'existe pas."})

        res.json(user);

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}
module.exports = {
    login,
    register,
    logout,
    getUser,
    refreshToken
};