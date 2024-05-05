// connect.js
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_DATA_PORT,// Default MySQL port is 3306,
    insecureAuth: true // Use older authentication protocol
});

const connectToDB = (callback) => {
    db.connect((err) => {
        if (err) {
            console.log(err);
        }
        console.log('Connected to the database');
        callback();
    });
};

module.exports = {
    db,
    connectToDB
};
