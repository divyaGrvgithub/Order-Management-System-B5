const db = require('../database/mysqlConn')
const Customer = db.customers


const addCustomer = async (req,res) => {
      let data = req.body
      let cusData = await Customer.create(data)
      return res.status(201).send({status:true, data:cusData})
}

const fetchCustomer = async (req,res) => {
      let customers = await Customer.findAll({})
      return res.status(200).send({status:true, data:customers})
}

const fetchOneCustomer = async (req,res) => {
      let id = req.params.id
      let data = await Customer.findOne({where:{id:id}})
      return res.status(200).send({status:true, data:data})
}

const updateCustomer = async (req,res) => {
      let id = req.params.id
      let data = req.body
      let updateData = await Customer.update(data,{where:{id:id}})
      return res.status(200).send({status:true, data:updateData})
}
const deleteCustomer = async (req,res) => {
      let id = req.params.id
      let deleteData = await Customer.update({isDeleted:true, deletedAt:Date.now()},{where:{id:id}})
      return res.status(200).send({status:true,data:deleteData})
}


module.exports = {addCustomer, fetchCustomer, fetchOneCustomer, updateCustomer, deleteCustomer}