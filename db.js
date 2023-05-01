require('dotenv').config();
const mongoose = require('mongoose')


const connect = () => mongoose.connect(process.env.MONGODB_URI).then(data=> {
    console.log("database connected")
}).catch(err => {
    console.log(err)
})

module.exports = connect;