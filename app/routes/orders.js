const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const totalizator = require("../../middlewares/totalizator");

const Order = require('../models/order');
const Product = require('../models/product');

// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  Order.find()
    .select("_id product quantity")
    .then(docs => {
      const response = {
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc.id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .select("_id")
    .exec()
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      } else {
        return totalizator(req.body.productId, req.body.quantity).then(total => {
          console.log("eta Rapaz Cheguei foi aqui no total");
          console.log(total);
          const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId,
            cost: total,
          });
          order
            .save()
            .then(result => {
              console.log(result);
              console.log(total);
              res.status(201).json({
                message: "Order stored",
                createdOrder: {
                  _id: result._id,
                  product: result.product,
                  quantity: result.quantity,
                  cost: result.cost,
                  request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                  }
                }
              });
            });
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  const { product, quantity } = req.body;
  console.log(id);
  console.log(product);
  console.log(quantity);

  Order.updateOne({ _id: id },
    { $set: { product: product, quantity: quantity } },
    { upsert: true, 'new': true })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Orders updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;