const Sequelize = require("sequelize");

const sqlize = require("../util/db");

const OrderItem = sqlize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;
