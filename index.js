const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "my_database",
    password: "root"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting: " + err.message);
        return;
    }
    console.log("Connected as id " + connection.threadId);
});

const newProduct = {
    Name: "Gaming Nitro",
    Price: 150.99,
    Quantity: 5
    
};

const query = "INSERT INTO Products (Name, Price, Quantity) VALUES (?, ?, ?)";
connection.query(query, [newProduct.Name, newProduct.Price, newProduct.Quantity], (error, results) => {
    if (error) {
        console.error("Insert error: " + error.message);
        return;
    }
    console.log("Product added with ID:", results.insertId);
});

connection.end();
