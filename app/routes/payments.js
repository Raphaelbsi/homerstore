const express = require("express");
// const { preferences } = require("mercadopago");
const router = express.Router();
const mongoose = require("mongoose");

const pay = require("../../middlewares/payments_method");

const Order = require('../models/order');
const Payment = require("../models/payment");


router.post("/", (req, res, next) => {
    Order.findById(req.body.orderId)
        .exec()
        .then(order => {
            console.log("Tentando visualizar meu order");
            console.log(order);
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            } else {
                return pay(order).then(preferences => {
                    const payment = new Payment({
                        _id: mongoose.Types.ObjectId(),
                        payment_preference: preferences.body.id,
                        payment_link: preferences.body.init_point,
                    });
                    return payment.save().then(() => {
                        return res.send(preferences.body.init_point)
                    });


                })


            }
        })


});

router.get("/success", (req, res, next) => {
    const id = req.query.collection_id;
    const status = req.query.collection_status;
    const preference_id = req.query.preference_id;
    const payments_method = req.query.payment_type;
    Payment.updateOne({ payment_preference: preference_id },
        {
            $set:
            {
                payment_id: id,
                payment_method: payments_method,
                payment_status: status,
            }

        },
        { upsert: true, 'new': true })
        .exec()
        .then(() => {
            res.status(200).json({ message: 'Payments Updated' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


});

router.get("/pending", (req, res, next) => {
    const id = req.query.collection_id;
    const status = req.query.collection_status;
    const preference_id = req.query.preference_id;
    const payments_method = req.query.payment_type;
    Payment.updateOne({ payment_preference: preference_id },
        {
            $set:
            {
                payment_id: id,
                payment_method: payments_method,
                payment_status: status,
            }

        },
        { upsert: true, 'new': true })
        .exec()
        .then(() => {
            res.status(200).json({ message: 'Payments Updated' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


});

router.get("/failure", (req, res, next) => {
    const id = req.query.collection_id;
    const status = req.query.collection_status;
    const preference_id = req.query.preference_id;
    const payments_method = req.query.payment_type;
    Payment.updateOne({ payment_preference: preference_id },
        {
            $set:
            {
                payment_id: id,
                payment_method: payments_method,
                payment_status: status,
            }

        },
        { upsert: true, 'new': true })
        .exec()
        .then(() => {
            res.status(200).json({ message: 'Payments Updated' });
            res.status(200).json({message: 'Payment Updated'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


});

module.exports = router;