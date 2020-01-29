const Sequelize = require("sequelize");

const sqlize = require("../util/db");

const CartItem = sqlize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
