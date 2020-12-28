const Product = require('../app/models/product');

function totalizator(product, quantity, discount) {
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
                const percentage = discount/100
                const total = value * multiplier
                const end = total - (total * percentage) 
                return end;
            }
        })

}


module.exports = totalizator;