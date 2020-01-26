const mySql = require("mysql2");

const pool = mySql.createPool({
    host: "localhost",
    user: "root",
    database: "node-complete",
    password: "mg|Sql|88"
});

module.exports = pool.promise();