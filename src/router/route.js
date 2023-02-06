const express = require("express")
const router = express.Router()
const { createUser, createProduct, createOrder } = require('../controllers/orderController')
const {  addCustomer, fetchCustomer, fetchOneCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController')
const { createOrder } = require('../controllers/orderControllers')

router.post('/createCustomer',createUser)
router.post('/createProduct',createProduct)
router.post('/createOrder',createOrder)

// customers

router.post('/customers', addCustomer)
router.get('/customers', fetchCustomer)
router.get('/customers/:id',fetchOneCustomer)
router.put('/customers/:id', updateCustomer)
router.delete('/customers/:id', deleteCustomer)

router.post('/orders', createOrder)

module.exports = router