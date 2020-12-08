var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image_product : {type: Number }   
});

module.exports = mongoose.model('Product', productSchema);