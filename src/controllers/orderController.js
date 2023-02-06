const customerModel = require('../model/customerModel')
const orderModel = require('../model/orderModel')
const productModel = require('../model/productModel')
const nodemailer = require('nodemailer')

const createUser = async (req, res) => {
      try {
            let data = req.body
            let { name, email, password, phone } = data

            let verify = await customerModel.findOne({ $or: [{ email: email }, { phone: phone }] })
            if (verify) {
                  return res.status(400).send({ status: false, message: "email is already exist! please enter another email address  and phone" })
            }

            let transport = nodemailer.createTransport(
                  {
                        service: 'gmail',
                        auth: { user: 'tiwaridivyamala99@gmail.com', pass: 'divyaGrv@12345678' }
                  }
            )

            let mailOptions = {
                  from: 'grvgoswami2007@gmail.com',
                  to: email,
                  subject: `"Hello"${name}`,
                  text: ` hii ${name} your account successfully created`
            }

            transport.sendMail(mailOptions, function (err, info) {
                  if (err) return console.log(err.message)
                  if (info) return consol.log('Email Sent' + info.response)

            })

            let createUser = await customerModel.create(data)
            return res.status(201).send({ status: true, message: "create user", data: createUser })
      } catch (err) {
            return res.status(500).send({ status: false, message: err.message })
      }
}

const createProduct = async (req, res) => {
      try {
            let data = req.body

            let createProduct = await productModel.create(data)
            res.status(201).send({ status: true, data: createProduct })

      } catch (err) {
            return res.status(500).send({ status: false, message: err.message })
      }
}

const createOrder = async (req, res) => {
      try {
            let data = req.body
            let { userId, demandQuantity, productId } = data

            let checkUser = await customerModel.findById({ _id: userId })
            if (!checkUser) return res.status(404).send({ status: false, message: " user id is not found" })
            let checkProduct = await productModel.findOne({ _id: productId, isDeleted: false })
            if (!checkProduct) return res.status(404).send({ status: false, message: "product id is not found" })

            let userObj = {}
            if (checkUser.order > 10) { userObj.category = "gold" }
            if (checkUser.order > 20) { userObj.category = "platinum" }

            if (demandQuantity > checkProduct.quantity) return res.status(400).send({ status: false, message: " quantity is greater then product quantity" })


            let amount = checkProduct.price * demandQuantity

            if (checkUser.category == "gold") { amount = amount * 0.1 }
            if (checkUser.category == "platinum") { amount = amount * 0.2 }


            if (checkUser.balance < amount) {
                  return res.status(400).send({ status: false, message: `insufficient balance you must have ${amount - checkUser.balance}₹ extra` })
            }



            let createOrder = await orderModel.create(data)
            await productModel.findByIdAndUpdate({ _id: productId },
                  { $inc: { quantity: -demandQuantity } })

            await customerModel.findByIdAndUpdate({ _id: userId },
                  { userObj, $inc: { balance: -amount }, $inc: { order: 1 } })

            return res.status(201).send({ status: true, message: "create order", data: createOrder })

      } catch (err) {
            return res.status(500).send({ status: false, message: err.message })
      }

}

module.exports= {createUser,createProduct,createOrder}
