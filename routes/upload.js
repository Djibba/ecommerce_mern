require('dotenv').config();

const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');
const auth  = require('../middlewares/auth');
const authAdmin  = require('../middlewares/authAdmin');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

router.post('/upload',(req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({message: "Aucun fichier n'est uploadé !"});
        }

        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTemp(file.tempFilePath);
            return res.status(400).json({message: "Taille de trop grand !"});
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg'){
            removeTemp(file.tempFilePath);
            return res.status(400).json({message: "Format du fichier incorrect !"});
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result) => {
            if(err) throw err
            removeTemp(file.tempFilePath);

            res.json({public_id: result.public_id, url: result.secure_url});
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});

router.post('/destroy', (req, res) => {
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({message: "Pas d'image selectionné!"});

        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;

            res.json({message: "Image supprimé!"});
        })
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});

const removeTemp = (path) => {
    fs.unlink(path, err=>{
        if(err) throw err;
    })
};

module.exports = router;