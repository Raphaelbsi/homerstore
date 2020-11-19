var mongoose = require('mongoose');

var providerSchema = new mongoose.Schema({

    description: String,
    name: String,
    cnpj: Number,
    shopping: String,
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    supply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        
    }

});

providerSchema.index({'description': 'text', 'name': 'text'});
module.exports = mongoose.model('Provider', providerSchema);