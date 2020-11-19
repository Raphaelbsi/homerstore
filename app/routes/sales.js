var express = require('express');
var router = express.Router();
const Sale = require('../models/sale');
const withAuth = require('../../middlewares/auth');

router.post('/', withAuth, async function(req, res) {
    try {
        const { client, supply } = req.body;
        var sale = new Sale({ client: client, supply: supply});
        await sale.save();
        res.json(sale);
    } catch (error) {
        res.status(401).send(error);
    }

});

router.get('/search', withAuth, async function(req, res) { 
    try {
        const { query } = req.query;
        const { id } = req.params;       
        let sales = await Sale.find({id}).find({ $text: {$search: query }})
        res.json(sales);

    } catch (error) {
        res.json({error: error}).status(500)
    }
});

router.get('/', withAuth, async function(req, res) {
    try {
        const { id } = req.params;
        let sales = await Sale.find({ id })
        res.send(sales)
    } catch (error) {
        res.json({error: error}).status(500)
    }
});

router.put('/:id', withAuth, async function(req, res) {
    try {
        const { client, supply} = req.body;
        const { id } = req.params;
        var sale = await Sale.findOneAndUpdate(
            {_id: id},
            {$set: {client: client, supply: supply}},
            {upsert: true, 'new': true }   
        )
        res.json(sale);
    } catch (error) {
        res.json({error: error}).status(500)
    }
});

router.delete('/:id', withAuth, async function(req, res) {
    
    try {
        const { id } = req.params;
        var sale = await Sale.findById({_id: id})
            await sale.delete();
            res.json({message: 'OK'}).status(204);   
    } catch (error) {
        res.json({error: error}).status(500)
        
    }
});

module.exports = router;