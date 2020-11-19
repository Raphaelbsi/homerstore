var express = require('express');
var router = express.Router();
const Provider = require('../models/provider');
const withAuth = require('../../middlewares/auth');



router.post('/', withAuth, async function(req, res) {
    try {
        const { description, name, cnpj, shopping} = req.body;
        var provider = new Provider({description: description, name: name, cnpj: cnpj, shopping: shopping});
        console.log(provider);
        await provider.save();
        res.json(provider);
    } catch (error) {
        res.status(401).send(error);
    }

});

router.get('/search', withAuth, async function(req, res) {
    try {
        const { query } = req.query;
        const { id } = req.params;       
        let providers = await Provider.find({ id }).find({ $text: {$search: query }})
        res.json(providers);

    } catch (error) {
        res.json({error: error}).status(500)
    }
    
});

router.get('/', withAuth, async function(req, res) {
    try {
        const { id } = req.params;
        let providers = await Provider.find({ id })
        res.send(providers)
    } catch (error) {
        res.json({error: error}).status(500)
    }
});

router.put('/:id', withAuth, async function(req, res) {
    try {
        const { description, name, cnpj, shopping} = req.body;
        const { id } = req.params;
        var provider = await Provider.findOneAndUpdate(
            {_id: id},
            {$set: {description: description, name: name, cnpj: cnpj, shopping: shopping}},
            {upsert: true, 'new': true }   
        )
        res.json(provider);
    } catch (error) {
        res.json({error: error}).status(500)
    }
});

router.delete('/:id', withAuth, async function(req, res) {
    
    try {
        const { id } = req.params;
        var provider = await Provider.findById({_id: id})
            await provider.delete();
            res.json({message: 'OK'}).status(204);   
    } catch (error) {
        res.json({error: error}).status(500)
        
    }
});
module.exports = router;