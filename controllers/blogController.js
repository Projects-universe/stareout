const Blog = require("../models/blogModel");
const User = require('../models/userModel')
const createBlog = async (req, res) => {
    const {userId} = req;
    const {title, content} = req.body;

    if(!userId){
        return res.status(401).send("Not authorized")
    }

    if(!title || !content) {
        return res.status(400).send("Provide all the necessary data");
    }
    
    try{
        const blog = await Blog.create({
            title, content,
            user: userId
        });
        console.log(blog)
        
        // const user = await User.findByIdAndUpdate(id, {
        //     blogs:  
        // })
        console.log("here")
        return res.status(201).json({
            blog
        })
        
    } catch(err) {
        if(err.name === 'ValidationError'){
            return res.status(400).send('Received invalid data')
        }
        return res.status(400)
    }

    
};

const updateBlog = async (req, res) => {
    const {userId} = req;
    const {title, content} = req.body;
    const {blogId} = req.params;

    try{
        const blog = await Blog.find({_id : blogId, author: userId});
    if(!blog){
        return res.status(400).json({
            message: "blog does not exist OR you are not the author"
        })
    }
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
        content, title
    }, { new : true})

    return res.status(200).json({
        blog: updatedBlog
    })
    } catch(err) {
        console.log(err);
        return res.status(500).send("something went wrong on the server")
    }
};

const deleteBlog = async (req, res) => {
    const {userId} = req;
    const {blogId} = req.params;

    try{
        const blog = await Blog.find({_id : blogId, author: userId});
    if(!blog){
        return res.status(400).json({
            message: "blog does not exist OR you are not the author"
        })
    }
    const deleted = await Blog.findByIdAndDelete(blogId);
    return res.status(200)
} catch(err){
    console.log(err)
    return res.status(500).send("something went wrong on the server")
}
}

// NO auth required, anyone can read the blogs
const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        error: "No blog found",
      });
    }
    return res.status(200).json({
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      error: "something went wrong on server",
    });
  }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        if (!blogs) {
          return res.status(404).json({
            error: "No blogs was found",
          });
        }
        return res.status(200).json({
          blogs,
        });
      } catch (err) {
        return res.status(500).json({
          error: "something went wrong on server",
        });
    }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getAllBlogs,
}
