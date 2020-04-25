const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    database: dbConfig.DB,
    port: dbConfig.PORT,
    password: dbConfig.PASSWORD
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;