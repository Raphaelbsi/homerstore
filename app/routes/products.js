var express = require('express');
var router = express.Router();
const Product = require('../models/product');
//const withAuth = require('../../middlewares/auth');
const mongoose = require("mongoose");

const multer = require('multer');
const multerConfig = require('../../middlewares/multer');

router.get("/", (req, res, next) => {
    Product.find()
      .select("name price _id nameimg sizeimg keyimg urlimg")
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              _id: doc._id,
              nameimg: doc.nameimg,
              sizeimg: doc.sizeimg,
              keyimg: doc.keyimg,
              urlimg: doc.urlimg,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.post("/", multer(multerConfig).single('file'),(req, res, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      nameimg: req.file.originalname,
      sizeimg: req.file.size,
      keyimg: req.file.filename,
      urlimg: '', 
    });
    product
      .save()
      .then(result => {
        console.log(req.file);
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
              name: result.name,
              price: result.price,
              _id: result._id,
              nameimg: result.nameimg,
              sizeimg: result.sizeimg,
              keyimg: result.keyimg,
              urlimg: result.urlimg,
              createdAt: result.createdAt,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/products/" + result._id
              }
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
  
  router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .select("name price _id nameimg sizeimg keyimg urlimg")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/products'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  router.patch("/:productId", multer(multerConfig).single('file'),(req, res, next) => {
    const id = req.params.productId;
    const { name, price } = req.body;
    const nameimg = req.file.originalname; 
    const sizeimg = req.file.size;
    const keyimg = req.file.filename; 
    const urlimg = req.file.url;
    //const updateOps = {};
    //var map = new Map;
    //var map2 = new Map;

    //map.set(req.body);
    //console.log(map);
    //map2.set(req.file);
    //console.log(map2);
    //for (const ops of map) {
     // updateOps[ops.propName] = ops.value;
      //console.log(updateOps);
      //console.log(ops);
    //}
      

    Product.updateOne({ _id: id },
      { $set: {name: name, 
               price: price, 
               nameimg: nameimg, 
               sizeimg: sizeimg,
               keyimg: keyimg,
               urlimg: urlimg,
              }  
      }, 
      //{ $set: updateOps }, 
      {upsert: true, 'new': true })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product updated',
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
  
  router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: { name: 'String', price: 'Number' }
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
  
  module.exports = router;