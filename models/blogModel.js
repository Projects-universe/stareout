const mongoose = require('mongoose')

const schema  = new mongoose.Schema({
    title: {
        type : String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},
    { timestamps: true}
)


const Blog = mongoose.model('Blog', schema)

module.exports = Blog;