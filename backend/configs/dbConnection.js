const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected Successfully to : ${conn.connection.host}`.cyan.italic);
    } catch (error) {
        console.log (`Error : ${error.message}`.red.bold);
        process.exit()
    }
}

module.exports = connectDb;