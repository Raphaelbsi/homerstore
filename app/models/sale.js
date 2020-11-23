var mongoose = require('mongoose');

var saleSchema = new mongoose.Schema({

    client: String,
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

saleSchema.index({'products': 'text', 'client': 'text'});
module.exports = mongoose.model('Sale', saleSchema);