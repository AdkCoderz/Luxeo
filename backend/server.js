// server.js
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// OR Enable CORS for specific origins
const corsOptions = {
    origin: "http://127.0.0.1:5500", 
};
app.use(cors(corsOptions));

console.log("Server is On",port)

// Create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '6002',
  database: 'luxeo',
});

// db.query(
//     'INSERT INTO users (email, password) VALUES (?, ?)',
//     ['suyash@gmail.com', "abcd"],
//     function (err, results) {
//       console.log(results);
//     }
//   );  

// db.query(
//     'SELECT * FROM users',
//     function (err, results) {
//       console.log(results);
//     }
//   );

app.post('/api/login', (req, res) => {
  
    const { email, password } = req.body; 
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0){
            return res.status(404).json({ message: 'User not found' });
        }else{
            // console.log(bcrypt.compare(password, results[0].password))
            if(password === results[0].password){
                // return res.status(200).json({ message: 'Login successful'});
                const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ token });
            }else{
                return res.status(404).json({ message: 'Password not correct' });
            }
        }
       });
});


// User Registration Route
app.post('/api/register', (req, res) => {
    
    const {name, phone, email, password} = req.body; 
    
    db.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length === 1){
            return res.status(404).json({ message: 'Email already exist' });
        }else{
            db.query('INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)', [name, phone, email, password], (err, results) => {
                if (err) throw err;
                return res.status(201).json({ message: 'User registered successfully' });
              });
        }
       });

});

   
    

// // Cart Routes
// app.post('/api/cart', (req, res) => {
//     const { userId, productId, quantity } = req.body;

//     const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
//     db.query(query, [userId, productId, quantity], (err, result) => {
//         if (err) throw err;
//         res.status(201).json({ message: 'Product added to cart' });
//     });
// });

// // Get Cart Items
// app.get('/api/cart/:userId', (req, res) => {
//     const { userId } = req.params;

//     const query = `
//         SELECT products.*, cart.quantity
//         FROM cart
//         JOIN products ON cart.product_id = products.id
//         WHERE cart.user_id = ?
//     `;
//     db.query(query, [userId], (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// Start server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
