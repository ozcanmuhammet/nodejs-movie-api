const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://tesla:tesla@movie-api-rwjxe.mongodb.net/test?retryWrites=true', {});
    mongoose.connection.on('open', () => {
        console.log('MongoDB connected..');
    })
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB error.. ', err);
    })

    mongoose.Promise = global.Promise;
}