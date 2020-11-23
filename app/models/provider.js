var mongoose = require('mongoose');

var providerSchema = new mongoose.Schema({

    description: {type: String, index:true},
    name: String,
    cnpj: Number,
    shopping: String,
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

providerSchema.index({'description': 'text', 'name': 'text'});
module.exports = mongoose.model('Provider', providerSchema);