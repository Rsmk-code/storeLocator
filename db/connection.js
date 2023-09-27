const config = require('../config/config');
const mongoose = require('mongoose')



const connectToDatabase = async () => {
        try {
            await mongoose.connect(config.mongo.url, config.mongo.options);
            console.log(
                'Connected to Distribution API Database - Initial Connection',
                config.mongo.url
            );
        } catch (err) {
            console.log(
                'Initial Distribution API Database connection error occured -',
                err
            );
        }
    }

module.exports = connectToDatabase;