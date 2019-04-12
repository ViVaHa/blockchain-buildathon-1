const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const products = require("./routes/api/products");
var cors = require('cors');
app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/products", products);
mongoose.connect(db, {useNewUrlParser:true}).then(
  () => {console.log("Connected to MongoDB")},
  err => {console.error("Cannot connect to MongoDB")}
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
