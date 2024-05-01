const express = require('express');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const router = express.Router();
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
    let productList = await ProductModel.find({}).populate('category');
    res.render('product', {productList});
})

router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.redirect('/product');
})

router.get('/add', async (req, res) => {
    var categories = await CategoryModel.find({});
    var products = await ProductModel.find({});
    res.render('product/add', { categories, products });
})

router.post('/add', upload.single('avatar'), async (req, res) => {
    var productName = req.body.productName;
    var price = req.body.price;
    var description = req.body.description;
    var avatar = req.file.filename;
    var category = req.body.category;

    var product = {
        productName: productName,
        price: price,
        description: description,
        avatar: avatar,
        category: category
    }
    //console.log(product);

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


module.exports = router;