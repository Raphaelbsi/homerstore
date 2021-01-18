var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    //product: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Order',
    //},
    payment_preference: {type: String},
    payment_id: {type: String},
    payment_method: {type: String},
    payment_link: {type: String},
    payment_status: {type: String},
    
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('payment', paymentSchema);