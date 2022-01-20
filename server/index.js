const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'gilbert',
    host: 'localhost',
    password: 'P0tatoes',
    database: "inventorysystem",
});

app.post('/create', (req, res) => {
    const item = req.body.item;
    const amount = req.body.amount;
    const price = req.body.price;

    db.query(
        'INSERT INTO inventory(prod_name, amount, price) VALUES (?,?,?)',
        [item, amount, price],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted")
            }
        });
    });

app.get('/inventory', (req, res) => {
    db.query("SELECT * FROM inventory", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Yay the server is running on port 3001");
});