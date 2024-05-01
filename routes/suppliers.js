const express = require('express');
const SupplierModel = require('../models/SupplierModel');
const router = express.Router();

router.get('/', async (req, res) => {
    let supplierList = await SupplierModel.find({});
    res.render('supplier', {supplierList});
})

router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    await SupplierModel.findByIdAndDelete(id);
    res.redirect('/supplier');
})

router.get('/add', async(req, res) => {
    var suppliers = await SupplierModel.find({});
    res.render('supplier/add', { suppliers });
})

router.post('/add', async (req, res) => {
    var supplier = req.body;
    console.log(supplier)
    await SupplierModel.create(supplier);
    res.redirect('/supplier');
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var supplier = await SupplierModel.findById(id);
    res.render('supplier/edit', { supplier });
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var supplier = req.body;
    await SupplierModel.findByIdAndUpdate(id,supplier);
    res.redirect('/supplier');
})


module.exports = router;