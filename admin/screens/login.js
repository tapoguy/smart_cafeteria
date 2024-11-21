const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inno'
});

db.connect(err => {
    if (err) throw err;
    console.log("Database connected!");
});
``
app.use(express.json());

app.get('/api/data', (req, res) => {
    db.query("SELECT * FROM reg", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
