var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({

    description: String,
    name: String,
    price: Number,
    amount: Number,
    min: Number,
    max: Number,
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
    
});

productSchema.index({'description': 'text', 'name': 'text'});

module.exports = mongoose.model('Product', productSchema);