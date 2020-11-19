var mongoose = require('mongoose');

var saleSchema = new mongoose.Schema({

    client: String,
    supply: String,
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});
saleSchema.index({'supply': 'text', 'client': 'text'});
module.exports = mongoose.model('Sale', saleSchema);