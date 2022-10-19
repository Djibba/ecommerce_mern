const { findOne } = require('../models/categoryModel');
const Category = require('../models/categoryModel');

const createCategory = async (req, res, next) => {
    try {
        const {name} = req.body;
        const category = await Category.findOne({name});
        if(category) return res.status(400).json({message: "Catégorie déja existant"});

        const newCategory = new Category({name});
        await newCategory.save();

        res.json({message: "Catégorie créé avec succés !"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories)
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getOneCategory = (req, res, next) => {

};

const updateCategory = async (req, res, next) => {
    try {
        const {name} = req.body;
        await Category.findByIdAndUpdate({_id: req.params.id}, {name});
        res.json({message: "Catégorie modifié avec succés !"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        await Category.findOneAndDelete(req.params.id);
        res.json({message: "Catégorie supprimé !"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports = {
    createCategory,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory
};