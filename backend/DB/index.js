const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        const instantanceConnect = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`Connect Successessfully ${instantanceConnect.connection.host}`)
    } 
    catch (err) {
        console.log("Error While connecting with database ",err)
    }
}

module.exports = connectDB;