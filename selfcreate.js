
const mysql = require('mysql');
const readline = require('readline');

// Создаем подключение к базе данных
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "my_database",
    password: "root"
});

connection.connect((err) => {
    if (err) {
        console.error("Ошибка подключения: " + err.message);
        return;
    }
    console.log("Подключено к MySQL (ID: " + connection.threadId + ")");
});

// Настраиваем ввод через терминал
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для ввода данных о товаре
function addProduct() {
    rl.question("Введите название товара: ", (name) => {
    rl.question("Введите цену товара: ", (price) => {
    rl.question("Введите количество товара: ", (quantity) => {
        const query = "INSERT INTO Products (Name, Price, Quantity) VALUES (?, ?, ?)";
        connection.query(query, [name, parseFloat(price), parseInt(quantity)], (error, results) => {
        if (error) {
                        console.error("Ошибка при добавлении: " + error.message);
                        return;
                    }
                    console.log(`✅ Товар добавлен (ID: ${results.insertId})`);
                    // Спросить, хочет ли пользователь добавить ещё товар

                    rl.question("Добавить ещё один товар? (да/нет): ", (answer) => {
                        if (answer.toLowerCase() === 'да') {
                            addProduct(); // Повторяем ввод
                        } else {
                            console.log("Все товары добавлены!");
                            rl.close();
                            connection.end();
                        }
                    });
                });
            });
        });
    });
}
// Запускаем ввод первого товара
addProduct();
