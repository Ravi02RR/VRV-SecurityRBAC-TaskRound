const mongoose = require('mongoose');


//db connection function
async function connectToDataBase(uri) {
    try {
        await mongoose.connect(uri);
        console.log('Connected to database');
    } catch (err) {
        console.log('Error connecting to database:', err);
    }
}

module.exports = connectToDataBase;
