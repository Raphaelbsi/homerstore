var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({

    description: String,
    price: Number,
    name: String,
    amount: Number,
    min: Number,
    max: Number,
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Product', productSchema);