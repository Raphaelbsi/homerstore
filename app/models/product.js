var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    nameimg: {type: String},
    sizeimg: {type: Number},
    keyimg: {type: String},
    urlimg: {type: String},
    createdAt: {type: Date, default: Date.now}   
});

module.exports = mongoose.model('Product', productSchema);