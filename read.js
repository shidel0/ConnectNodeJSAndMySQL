const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "my_database",
    password: "root"
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting: " + err.message);
        return;
    }
    console.log("Connected as id " + connection.threadId);
});

connection.query('SELECT * FROM products', (error, results, fields) => {
    if (error) {
        console.error("Query error: " + error.message);
        return;
    }
    results.forEach(result => {
        console.log(result);
    });
});

connection.end();
