const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect( uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } );

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

const systemsRouter = require('./routes/systems');
const authRoute = require('./routes/auth');

app.use('/systems', systemsRouter);
app.use('/user', authRoute);



app.listen(port, () => {
    console.log('Server is running on port 5000');
});