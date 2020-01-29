const Sequelize = require("sequelize");

const sqlize = require("../util/db");

const Cart = sqlize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = Cart;