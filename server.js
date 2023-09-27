
const express = require('express')
const cors = require('cors')
const config = require('./config/config.js');
const connectToDatabase = require('./db/connection')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
connectToDatabase();


app.use('/api/v1/stores', require('./routes/stores'))


app.listen(config.server.port, () => {
    console.log(`server is listening on ${config.server.hostname}:${config.server.port}`);
});
