const express = require('express');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const router = express.Router();
const upload = require('../middleware/upload');
const SupplierModel = require('../models/SupplierModel');
const fs = require('fs');
const { dirname } = require('path');

router.get('/', async (req, res) => {
    let productList = await ProductModel.find({}).populate('category').populate('supplier');
    res.render('product', {productList});
})

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    res.render('product/delete', { product });
})

router.post('/delete/:id', async (req, res) => {
    var id = req.params.id;
    var product = req.body;
    var avatar = req.body.avatar;
    fs.unlinkSync(__dirname + '/public/images/' + avatar);
    await ProductModel.findByIdAndDelete(id,product);
    res.redirect('/product');
})

router.get('/add', async (req, res) => {
    var categories = await CategoryModel.find({});
    var suppliers = await SupplierModel.find({})
    var products = await ProductModel.find({});
    res.render('product/add', { categories, suppliers, products });
})

router.post('/add', upload.single('avatar'), async (req, res) => {
    var productName = req.body.productName;
    var price = req.body.price;
    var description = req.body.description;
    var avatar = req.file.filename;
    var category = req.body.category;
    var supplier = req.body.supplier;

    var product = {
        productName: productName,
        price: price,
        description: description,
        avatar: avatar,
        category: category,
        supplier: supplier
    }
    console.log(product);

    await ProductModel.create(product);
    res.redirect('/product');
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    res.render('product/edit', { product });
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = req.body;
    await ProductModel.findByIdAndUpdate(id,product);
    res.redirect('/product');
})

router.get('/detail/:id', async (req, res) => {
    let id = req.params.id;
    var product = await ProductModel.findById(id);
    res.render('product/detail', { product });
})


module.exports = router;