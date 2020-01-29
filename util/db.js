// const mySql = require("mysql2");

// const pool = mySql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "node-complete",
//     password: "mg|Sql|88"
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize").Sequelize;

const sqlize = new Sequelize("node-complete", "root", "mg|Sql|88", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sqlize;