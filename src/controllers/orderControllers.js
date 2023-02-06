const db = require('../database/mysqlConn')

const Order = db.orders
const Customer = db.customers

const createOrder = async (req, res) => {
      try{
      let data = req.body
      const { customer_id,quantity,productPrice } = data

      let user = await Customer.findOne({where:{id:customer_id}})
      if(!user){
            return res.status(400).send({status:false,message:"please enter valid id!"})
      }
      data.customerName = user.name

      let obj = {}
      
      if(user.productOrder>=10){
            obj.category = "Gold"
      }
      if(user.productOrder>=20){
            obj.category = "Platinum"
      }
      let amount = productPrice * quantity
      
      if(user.category == "Gold"){
            amount*0.1
      }
      if(user.category == "Platinum"){
            amount*0.2
      }
      if(user.balance < amount){
            return res.status(400).send({status:false, message:"please add money on your account"})
      }

      obj.balance = user.balance - amount 
      obj.productOrder = user.productOrder + 1
      
      let createOrder = await Order.create(data)
      await Customer.update(obj,{where:{id:customer_id}})
      return res.status(201).send({status:false,message:"Order is created successfully",data:createOrder})
}
catch(error){
      return res.status(500).send({status:false, message:error.message})
}

}
module.exports= {createOrder}
