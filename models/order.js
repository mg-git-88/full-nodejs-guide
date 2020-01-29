const Sequelize = require("sequelize");

const sqlize = require("../util/db");

const Order = sqlize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = Order;
