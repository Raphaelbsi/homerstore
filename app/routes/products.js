var express = require('express');
var router = express.Router();
const Product = require('../models/product');
const withAuth = require('../../middlewares/auth');
const product = require('../models/product');


router.post('/', withAuth, async function(req, res) {
    const { description, name, price, amount, min, max } = req.body;

    

    try {
        var product = new Product({description: description, name: name, price: price, amount: amount, min: min, max: max, author: req.user._id});
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(401).send(error);
    }
  
});

router.get('/search', withAuth, async function(req, res) {
    
    try {
        const { query } = req.query;
        let products = await Product.find({ author: req.user._id }).find({ $text: {$search: query }})
        res.json(products);

    } catch (error) {
        res.json({error: error}).status(500)
    }
    
});

router.get('/:id', withAuth, async function(req, res) {

    try {
        const { id } = req.params;
        let product = await Product.findById(id)
        const is_owner = (user, product) => {
            
            if(JSON.stringify(user._id) == JSON.stringify(product.author._id))
              return true;
            else
              return false;
            }
            if(is_owner(req.user, product))
                res.json(product);
            else
                res.json({error: error}).status(500);

    } catch (error) {
                    res.send(error).status(500)
    }

});

router.get('/', withAuth, async function(req, res) {
    try {
        let products = await Product.find({author: req.user._id })
        res.send(products)
    } catch (error) {
        res.json({error: error}).status(500)
    }
});

router.put('/:id', withAuth, async function(req, res) {
    try {
        const { description, name, price, amount, min, max } = req.body;
        const { id } = req.params;
        var product = await Product.findOneAndUpdate(
            {_id: id},
            {$set: {description: description, name: name, price: price, amount: amount, min: min, max: max}},
            {upsert: true, 'new': true }   
        )
        res.json(product);
    } catch (error) {
        res.json({error: error}).status(500)
    }
});

router.delete('/:id', withAuth, async function(req, res) {
    
    try {
        const { id } = req.params;
        var product = await Product.findById({_id: id})
        const is_owner = (user, product) => {
            if(JSON.stringify(user._id) == JSON.stringify(product.author._id))
              return true;
            else
              return false;
            }
        
        if(product && is_owner(req.user, product)) {
            await product.delete();
            res.json({message: 'OK'}).status(204);   
        }else{
            res.json({error: 'Forbidden'}).status(403);
        }
    } catch (error) {
        res.json({error: error}).status(500)
        
    }
});


module.exports = router;