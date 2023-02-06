module.exports = (sequelize, DataTypes) => {

    const Customers = sequelize.define('customers', {
          name: {
                type: DataTypes.STRING,
                allowNull: false
          },
          
          email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
          },
          password: {
                type: DataTypes.STRING,
                allowNull: false
          },
          productOrder:{
                type:DataTypes.INTEGER,
                defaultValue:0
          },
          category: {
                type: DataTypes.ENUM("Regular", "Gold", "Platinum"),
                defaultValue: "Regular"
          },
          balance: {
                type: DataTypes.INTEGER,
                defaultValue: 100
          },
          isDeleted:{
                type: DataTypes.BOOLEAN,
                defaultValue:false
          },
          deletedAt:{
                type:DataTypes.DATE,
                defaultValue:null
          },
    }, {
          tableName: 'customers',
          timestamps: true
    })
    return Customers;
}