const Products = require('../models/productModel');

class APIfeatures {
    constructor(query, querySting){
        this.query = query;
        this.querySting = querySting;
    }
    filtering(){
        const queryObj = {...this.querySting};

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete(queryObj[el]));

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        this.query.find(JSON.parse(queryStr));

        return this; 
    }

    sorting(){
        if (this.querySting.sort) {
            const sortBy = this.querySting.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
    }

    pagination(){
        const page = this.querySting.page * 1 || 1;
        const limit = this.querySting.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { product_id, title, price, description, content, images,category} = req.body;

        if(!images) return res.status(400).json({message: "Aucun image n'est uploadé!"})

        const product = await Products.findOne({product_id});
        if(product) return res.status(400).json({message: "Produit existant!"});

        const newProduct = new Products({
            product_id, title: title.toLowerCase(), price, description, content, images,category
        })
        await newProduct.save();
        res.json({message: "Produit créé avec succés !"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getProducts = async (req, res, next) => {
    try {

        const features = new APIfeatures(Products.find(), req.query).filtering().sorting().pagination();

        const products = await features.query;
        res.json({
            status: "success",
            result: products.length,
            products: products
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getOneProduct = (req, res, next) => {
    try {
        res.json({message: "ok"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const {title, price, description, content, images,category} = req.body;
        if(!images) return res.status(400).json({message: "Auncun image n'est uploadé!"});

        await Products.findByIdAndUpdate({_id: req.params.id}, {
            title: title.toLowerCase(), price, description, content, images,category
        });

        res.json({message: "Produit modifié."});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        await Products.findOneAndDelete(req.params.id);
        res.json({message: "Produit supprimé."})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports = {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
};