const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId


const orderCreate = new mongoose.Schema({

      userId: {
            type: objectId,
            ref: 'user'
      },
      productId: {
            type: objectId,
            ref: 'product'
      },
      productName: String,
      demandQuantity: {
            type: Number,
            default: 1
      },
      orderStatus: {
            type: Boolean,
            default: true
      },
      paymentStatus: {
            type: Boolean,
            default: false
      }


})

module.exports = mongoose.model('Order', orderCreate)