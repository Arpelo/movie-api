const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://arpelo:Arpelo1@ds125482.mlab.com:25482/live-movie-api', {useMongoClient: true});
    mongoose.connection.on('open', () => {
        console.log('MongoDB Connected!');
    });

    mongoose.connection.on('err', (err) => {
        console.log(`MongoDB ERROR! ${err}`);
        
    });

};