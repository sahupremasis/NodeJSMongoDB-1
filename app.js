const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

const uri = "mongodb+srv://premasis:premasis@cluster0.dxbyc.mongodb.net/<dbname>?retryWrites=true&w=majority";
const postRoute = require('./routes/posts');

app.use(cors());
app.use(bodyParser.json());

// Middlewares
app.use('/posts', postRoute);


app.get("/", (req, res) => {
    console.log("Inside app.get");
    res.send('We are on Home Page');
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to Mongoose DB");
});

app.listen(3000);