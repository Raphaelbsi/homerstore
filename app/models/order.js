var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
    },
    quantity: { type: Number, default: 1 },
    cost: { type: Number },

    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);