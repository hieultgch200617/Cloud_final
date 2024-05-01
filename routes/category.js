const express = require('express');
const multer = require('multer');
const CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');
const router = express.Router();

router.get('/', async (req, res) => {
    let categoryList = await CategoryModel.find({});
    
    res.render('category', {categoryList});
})

router.get('/add', async (req, res) => {
    var categories = await CategoryModel.find({});
    res.render('category/add', { categories });
})

router.post('/add', async (req, res) => {
    var category = req.body;
    await CategoryModel.create(category);
    res.redirect('/category');
})

router.get('/delete/:id', async (req, res) => {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.redirect('/category');
})

module.exports = router;