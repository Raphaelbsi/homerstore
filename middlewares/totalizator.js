const Product = require('../app/models/product');

function totalizator(product, quantity) {
    return Product.findById(product)
        .select("price")
        .exec()
        .then(price => {
            if (!price) {
                return res.status(404).json({
                    message: "Product price not found"
                });
            } else {
                const value = price.price
                const multiplier = quantity
                const total = value * multiplier
                return total;
            }
        })

}


module.exports = totalizator;