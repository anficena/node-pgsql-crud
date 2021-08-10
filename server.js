const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// import model
const db = require("./app/models");

const app = express();

// menentukan domain atau origin yang dapat melakukan request
let whiteList = [
    'http://localhost:8080'
];

let corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));

// parse request application/json x-www-form-urlencoded
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

// Membuat tabel ketika server ini dijalankan == migration dari object model yang kita buat
// db.sequelize.sync();

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to ExMysql"
    });
});

// register routes
require("./app/routes/post.route.js")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

