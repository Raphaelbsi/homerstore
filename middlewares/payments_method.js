
const { response } = require('express');
const { card_token } = require('mercadopago');
const mercadopago = require('mercadopago');

const Order = require('../app/models/order');

const access_token = process.env.MP_ACCESS_TOKEN
console.log(access_token);

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

//*mercadopago.configure({
//  sandbox: process.env.SANDBOX == 'true' ? true : false,
//  access_token = process.env.MP_ACCESS_TOKE,
//});

// const getFullUrl = (req) =>{
//   const url = req.protocol + '://' + req.get('host');
//   console.log(url)
//   return url;
// }

function pay(order) {
  console.log(order);
  const purchaseOrder = {
    items: [
      item = {
        title: order._id.toString(),
        description: "description",
        quantity: 1,
        currency_id: 'BRL',
        unit_price: order.cost,
      },
    ],
    auto_return : "all",
    back_urls : {
      success : "http://localhost:3000/payments/success",
      pending : "http://localhost:3000/payments/pending",
      failure : "http://localhost:3000/payments/failure",
    }
    // notification_url: "http://localhost:3000/payments/status"
  }
  return mercadopago.preferences.create(purchaseOrder);
  // return Order.findById(orderID)
  //   .exec()
  //   .then(order => {
  //     if (!order) {
  //       return res.status(404).json({
  //         message: "Order price not found"
  //       });
  //     } else {
  //       const purchaseOrder = {
  //         items: [
  //           item = {
  //             title: order._id,
  //             description: "description",
  //             quantity: 1,
  //             currency_id: 'BRL',
  //             unit_price: order.cost,
  //           }
  //         ]
  //     }

  //     console.log("Estou aqui!!!");
  //     console.log(purchaseOrder);
  //CREATE PREFERENCE
  // try {
  // return mercadoPago.preferences.create(purchaseOrder);
  // console.log("Agora sair !!!");
  // console.log(preference);
  // return res.send(preference.body.init_point);
  // } catch (err) {
  //   return res.send(err.message);
  // }
// }
      
     

    // })
}


module.exports = pay;