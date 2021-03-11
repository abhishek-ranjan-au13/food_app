const mongoose = require('mongoose');

// **** connect mongoDB atlas 
const mongoUri = 'mongodb+srv://gayanvjy27:!2104199Tw0@cluster0.tibmn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const mongoUri = 'mongodb://localhost:27017/restro_app';

async function initMongo() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('****** MongoDB connected ******')
    } catch (error) {
        console.log(error.message)
        throw error
    }

}

module.exports = initMongo;
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('>>> DataBase Connected <<<')
// }).catch((err) => {
//     console.log(err.message)
// });