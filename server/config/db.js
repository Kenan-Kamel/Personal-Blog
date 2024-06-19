const mongoose = require('mongoose');
const connectDB = async() =>{

try{

    mongoose.set('strictQuery',false);
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Database Connected:${conn.connection.host}`)

}catch (error)
{
    console.log('There was an error within the DB.js,Database')
    console.log(error)

}
}                 

module.exports = connectDB 