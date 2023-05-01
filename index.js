const express = require('express')
const app = express();
const server = require('http').Server(app)

const connect = require('./db')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

connect();
app.use(express.json());


app.use('/user', userRoutes)
app.use('/blogs', blogRoutes)


const PORT = process.env.PORT || 5000;

server.listen(PORT,() => {
    console.log(`server is listening on ${PORT}`)
})