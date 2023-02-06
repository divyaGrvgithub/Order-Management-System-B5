const { INTEGER } = require("sequelize")

module.exports = (sequelize, DataTypes) => {

      const Orders = sequelize.define('orders', {
            productName: {
                  type: DataTypes.STRING,
                  allowNull: false
            },
            productPrice: {
                  type: DataTypes.INTEGER,
                  allowNull: false
            },
            customer_id: {
                  type: DataTypes.INTEGER,
                  allowNull: false
            },
            customerName: {
                  type: DataTypes.STRING,
                  allowNull: false
            },
            quantity: {
                  type: DataTypes.INTEGER,
                  allowNull: false
            },
            orderStatus: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: true
            },
            paymentStatus: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: true
            },
      }, {
            tableName: 'orders',
            timestamps: true
      })
      return Orders
}